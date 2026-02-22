/**
 * SUI Axe A11y Scanner
 * ────────────────────
 * Runs axe-core against index.html in a jsdom headless environment.
 * Reports WCAG 2.1 AA violations and best-practice issues.
 *
 * Prerequisites:
 *   npm install --save-dev jsdom axe-core
 *
 * Usage:
 *   node scripts/run-axe.mjs
 *
 * Exit codes:
 *   0 = zero violations
 *   1 = violations found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Check dependencies ──────────────────────────────────────────────
let JSDOM, axeSource;
try {
  ({ JSDOM } = await import('jsdom'));
} catch {
  console.error('Missing dependency: jsdom\nRun: npm install --save-dev jsdom');
  process.exit(1);
}
try {
  const axePath = path.join(ROOT, 'node_modules', 'axe-core', 'axe.min.js');
  axeSource = fs.readFileSync(axePath, 'utf8');
} catch {
  console.error('Missing dependency: axe-core\nRun: npm install --save-dev axe-core');
  process.exit(1);
}

// ── Load index.html ─────────────────────────────────────────────────
const indexPath = path.join(ROOT, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('index.html not found at repo root');
  process.exit(1);
}
const indexHTML = fs.readFileSync(indexPath, 'utf8');
const suiJS = fs.readFileSync(path.join(ROOT, 'sui.js'), 'utf8');

// Strip external CDN scripts (not our code to audit)
let cleanHTML = indexHTML
  .replace(/<script src="https:\/\/unpkg\.com\/[^"]*"[^>]*><\/script>/g, '')
  .replace(/<script src="https:\/\/cdn\.jsdelivr[^"]*"[^>]*><\/script>/g, '')
  .replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr[^"]*"[^>]*\/>/g, '')
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^"]*"[^>]*>/g, '');

// ── Create jsdom environment ────────────────────────────────────────
const dom = new JSDOM(cleanHTML, {
  url: 'http://localhost/index.html',
  pretendToBeVisual: true,
  runScripts: 'dangerously',
  beforeParse(w) {
    w.matchMedia = q => ({
      matches: false, media: q,
      addEventListener: () => {}, removeEventListener: () => {},
      addListener: () => {}, removeListener: () => {},
    });
    w.scrollTo = () => {};
    w.requestAnimationFrame = cb => setTimeout(cb, 0);
    w.cancelAnimationFrame = id => clearTimeout(id);
    w.getComputedStyle = () => ({
      getPropertyValue: () => '', display: 'block',
      visibility: 'visible', overflow: 'visible',
    });
  },
});

const { window } = dom;
const { document } = window;

// Polyfill <dialog>
document.querySelectorAll('dialog').forEach(dl => {
  if (!dl.showModal) dl.showModal = function () { this.setAttribute('open', ''); };
  if (!dl.close) dl.close = function () { this.removeAttribute('open'); };
});

// Inject SUI JS
try { window.eval(suiJS); } catch { /* non-critical in headless */ }
await new Promise(r => setTimeout(r, 300));

// ── Run axe ─────────────────────────────────────────────────────────
console.log('');
console.log('SUI Axe A11y Scanner');
console.log('═'.repeat(60));
console.log('');

window.eval(axeSource);

const results = await window.axe.run(document, {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  },
  resultTypes: ['violations', 'incomplete'],
});

// ── Report ──────────────────────────────────────────────────────────
if (results.violations.length === 0) {
  console.log('✓ ZERO VIOLATIONS — WCAG 2.1 AA + best practices');
} else {
  console.log(`✗ ${results.violations.length} VIOLATION(S) FOUND`);
  console.log('');

  for (const v of results.violations) {
    console.log(`  ─── ${v.id} (${v.impact}) ───`);
    console.log(`  Rule: ${v.help}`);
    console.log(`  Tags: ${v.tags.join(', ')}`);
    console.log(`  More: ${v.helpUrl}`);
    console.log(`  Nodes affected: ${v.nodes.length}`);

    for (const node of v.nodes.slice(0, 5)) {
      console.log(`    → ${node.target.join(' > ')}`);
      if (node.html && node.html.length < 200) {
        console.log(`      ${node.html}`);
      }
      if (node.failureSummary) {
        for (const line of node.failureSummary.split('\n').slice(0, 3)) {
          console.log(`      ${line}`);
        }
      }
    }
    if (v.nodes.length > 5) console.log(`    ... and ${v.nodes.length - 5} more`);
    console.log('');
  }
}

if (results.incomplete.length > 0) {
  console.log('');
  console.log(`⚠ ${results.incomplete.length} INCOMPLETE (needs manual review)`);
  for (const inc of results.incomplete) {
    console.log(`  • ${inc.id} (${inc.impact || 'unknown'}) — ${inc.help} [${inc.nodes.length} node(s)]`);
  }
}

console.log('');
console.log('─'.repeat(60));
console.log(`Violations: ${results.violations.length}`);
console.log(`Incomplete: ${results.incomplete.length}`);
console.log(`Passes: ${results.passes.length}`);
console.log(`Inapplicable: ${results.inapplicable.length}`);
console.log('');

process.exit(results.violations.length > 0 ? 1 : 0);
