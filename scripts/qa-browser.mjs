/**
 * Browser QA: source/distribution smoke tests and rendered axe audits.
 *
 *   node scripts/qa-browser.mjs [--smoke-only | --axe-only]
 *   SUI_BROWSER=webkit node scripts/qa-browser.mjs
 *   SUI_BROWSER_EXECUTABLE_PATH=/path/to/browser node scripts/qa-browser.mjs
 *
 * Install the selected browser with `npx playwright install chromium` (or webkit).
 * All pages and axe run locally; external network requests are blocked.
 * Axe incomplete results require manual review and do not fail this command.
 */

import http from 'node:http';
import path from 'node:path';
import { readFile, realpath, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const require = createRequire(import.meta.url);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
const SOURCE_ASSETS = new Map([
  ['/dist/sui.min.js', 'sui.js'],
  ['/dist/sui-tokens.min.css', 'sui-tokens.css'],
  ['/dist/sui-components.min.css', 'sui-components.css'],
  ['/dist/sui-icons.min.css', 'sui-icons.css'],
]);

function insideRoot(file) {
  const relative = path.relative(ROOT, file);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

async function serve(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }
  const candidate = path.resolve(ROOT, `.${pathname === '/' ? '/index.html' : pathname}`);
  // Reject hidden paths and escapes, including symlinks that leave the repository.
  if (!insideRoot(candidate) || pathname.split('/').some(part => part.startsWith('.'))) {
    res.writeHead(403).end();
    return;
  }
  try {
    const file = await realpath(candidate);
    const contentType = MIME[path.extname(file)];
    if (!insideRoot(file) || !contentType || !(await stat(file)).isFile()) {
      res.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
  }
}

let checks = 0;
let failures = 0;
let incompleteRules = 0;

function report(label, passed, detail) {
  checks++;
  if (!passed) failures++;
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
}

function describeRules(rules, incomplete = false) {
  for (const rule of rules) {
    console.log(`  ${incomplete ? 'MANUAL' : 'VIOLATION'} ${rule.id} (${rule.impact || 'unknown'}): ${rule.help} [${rule.nodes.length} nodes]`);
    if (incomplete) {
      console.log(`    Examples: ${rule.nodes.slice(0, 3).map(node => JSON.stringify(node.target)).join(', ')}`);
      continue;
    }
    for (const node of rule.nodes.slice(0, 5)) {
      console.log(`    ${JSON.stringify(node.target)}`);
      if (node.failureSummary) console.log(`      ${node.failureSummary.replace(/\s+/g, ' ').slice(0, 350)}`);
    }
    if (rule.nodes.length > 5) console.log(`    ... ${rule.nodes.length - 5} more nodes`);
  }
}

async function withPage(browser, base, label, { width, theme = 'light', source = false }, run) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    colorScheme: theme,
    serviceWorkers: 'block',
  });
  const errors = [];
  try {
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== base) return route.abort('blockedbyclient');
      const asset = source && SOURCE_ASSETS.get(url.pathname);
      if (asset) return route.fulfill({ path: path.join(ROOT, asset), contentType: MIME[path.extname(asset)] });
      return route.continue();
    });
    await context.addInitScript(mode => localStorage.setItem('sui-theme', mode), theme);
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await run(page);
  } catch (error) {
    report(label, false, error.message);
  } finally {
    if (errors.length) {
      report(`${label} runtime`, false, `${errors.length} uncaught error(s)`);
      for (const error of errors) console.log(`  ${error}`);
    }
    await context.close();
  }
}

async function smoke(browser, base, browserName) {
  for (const width of [1280, 375]) {
    for (const source of [true, false]) {
      const label = `smoke ${browserName} ${source ? 'source' : 'dist'} ${width}px`;
      await withPage(browser, base, label, { width, source }, async page => {
        await page.goto(`${base}/tests/smoke.html?autorun=1`, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => window.__SUI_SMOKE_RESULTS__, null, { timeout: 30_000 });
        const result = await page.evaluate(() => window.__SUI_SMOKE_RESULTS__);
        const passed = result.pass && result.total > 0 && result.failed === 0;
        report(label, passed, `${result.passed}/${result.total} passed`);
        for (const test of result.tests.filter(test => !test.pass)) {
          console.log(`  ${test.id}: ${test.name}${test.details ? ` — ${test.details}` : ''}`);
        }
      });
    }
  }
}

async function accessibility(browser, base, browserName, axePath) {
  for (const target of ['index.html', 'icons.html']) {
    for (const width of [1280, 375]) {
      for (const theme of ['light', 'dark']) {
        const label = `axe ${browserName} ${target} ${width}px ${theme}`;
        await withPage(browser, base, label, { width, theme }, async page => {
          await page.goto(`${base}/${target}`, { waitUntil: 'networkidle' });
          await page.evaluate(mode => document.documentElement.setAttribute('data-theme', mode), theme);
          await page.addScriptTag({ path: axePath });
          const views = target === 'index.html'
            ? await page.locator('.sui-topbar [role="tablist"] [data-tab]').evaluateAll(tabs =>
              tabs.filter(tab => !tab.closest('[data-sui-tabs]')).map(tab => tab.getAttribute('data-tab')))
            : [null];
          if (!views.length) throw new Error('No top-level demo tabs found; refusing to skip the audit.');
          for (const view of views) {
            if (view !== null) {
              await page.evaluate(key => {
                const tab = Array.from(document.querySelectorAll('.sui-topbar [role="tablist"] [data-tab]'))
                  .find(tab => tab.getAttribute('data-tab') === key);
                tab.click();
              }, view);
              await page.waitForFunction(key =>
                Array.from(document.querySelectorAll('[data-view].is-active')).some(panel =>
                  panel.getAttribute('data-view') === key && !panel.closest('[data-sui-tabs]')), view);
            }
            // Axe leaves single-character labels and SVG backgrounds incomplete.
            // Check the rendered step numerals and select arrow explicitly.
            if (view === 'components') {
              const contrast = await page.evaluate(() => {
                function luminance(color) {
                  const values = color.startsWith('#')
                    ? color.slice(1).match(/../g).map(value => parseInt(value, 16))
                    : color.match(/[\d.]+/g).slice(0, 3).map(Number);
                  const linear = values.map(value => {
                    const c = value / 255;
                    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
                  });
                  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
                }
                function ratio(foreground, background) {
                  const a = luminance(foreground), b = luminance(background);
                  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
                }
                const steps = [...document.querySelectorAll('.sui-step.is-active .sui-step-indicator')]
                  .filter(el => el.getClientRects().length).map(el => {
                    const style = getComputedStyle(el);
                    return ratio(style.color, style.backgroundColor);
                  });
                const select = document.querySelector('#demo-role');
                const style = getComputedStyle(select);
                const stroke = decodeURIComponent(style.backgroundImage).match(/stroke=['"](#[a-f0-9]{6})['"]/i);
                if (!stroke || !steps.length) throw new Error('Missing step or select contrast fixture.');
                return {
                  steps: Math.min(...steps),
                  selectText: ratio(style.color, style.backgroundColor),
                  selectArrow: ratio(stroke[1], style.backgroundColor),
                };
              });
              report(`${label} explicit contrast`,
                contrast.steps >= 4.5 && contrast.selectText >= 4.5 && contrast.selectArrow >= 3,
                `steps ${contrast.steps.toFixed(2)}:1; select text ${contrast.selectText.toFixed(2)}:1; arrow ${contrast.selectArrow.toFixed(2)}:1`);
            }
            const result = await page.evaluate(async () => {
              const result = await window.axe.run(document, {
                runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
                resultTypes: ['violations', 'incomplete'],
              });
              const summarize = rule => ({
                id: rule.id, impact: rule.impact, help: rule.help,
                nodes: rule.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })),
              });
              return { violations: result.violations.map(summarize), incomplete: result.incomplete.map(summarize) };
            });
            incompleteRules += result.incomplete.length;
            report(`${label}${view === null ? '' : ` #${view}`}`, result.violations.length === 0,
              `${result.violations.length} violations; ${result.incomplete.length} incomplete (manual review)`);
            describeRules(result.violations);
            describeRules(result.incomplete, true);
          }
        });
      }
    }
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--help')) {
    console.log('Usage: node scripts/qa-browser.mjs [--smoke-only | --axe-only]');
    console.log('Environment: SUI_BROWSER=chromium|webkit, SUI_BROWSER_EXECUTABLE_PATH=/path/to/browser');
    return;
  }
  if ([...args].some(arg => !['--smoke-only', '--axe-only'].includes(arg)) ||
      (args.has('--smoke-only') && args.has('--axe-only'))) {
    throw new Error('Use --smoke-only or --axe-only, or no arguments for both.');
  }
  const browserName = process.env.SUI_BROWSER || 'chromium';
  if (!['chromium', 'webkit'].includes(browserName)) throw new Error('SUI_BROWSER must be chromium or webkit.');
  const playwright = await import('playwright');
  const axePath = args.has('--smoke-only') ? null : require.resolve('axe-core/axe.min.js');
  const server = http.createServer((req, res) => {
    serve(req, res).catch(error => {
      console.error(`Static server error: ${error.message}`);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
  });
  let browser;
  try {
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    const base = `http://127.0.0.1:${server.address().port}`;
    const executablePath = process.env.SUI_BROWSER_EXECUTABLE_PATH;
    browser = await playwright[browserName].launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
    console.log(`SUI browser QA — ${browserName}; external network blocked`);
    if (!args.has('--axe-only')) await smoke(browser, base, browserName);
    if (!args.has('--smoke-only')) await accessibility(browser, base, browserName, axePath);
    console.log(`\n${checks} checks; ${failures} failed; ${incompleteRules} incomplete rule results require manual review.`);
    if (failures) process.exitCode = 1;
  } finally {
    try {
      if (browser) await browser.close();
    } finally {
      if (server.listening) {
        server.closeAllConnections?.();
        await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
      }
    }
  }
}

main().catch(error => {
  console.error(`Browser QA failed: ${error.message}`);
  process.exitCode = 1;
});
