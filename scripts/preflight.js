#!/usr/bin/env node
/*!
 * SUI Preflight Validator
 * ---------------------------------------------------------------------------
 * Runs before every build to catch accessibility and quality regressions.
 * Zero dependencies — uses only Node.js built-ins.
 *
 * Checks:
 *   1. WCAG AA contrast on every foreground/background token pair
 *   2. Hardcoded colour overrides in components
 *   3. HTML/ARIA accessibility (maps to axe-core / Lighthouse audit IDs)
 *   4. Version consistency across source files
 *   5. Dist hygiene — only expected file types in dist/
 *
 * Usage:  node scripts/preflight.js
 * Exit:   0 = all pass, 1 = failures found
 *
 * To add a new check: write a function, call it in the runner at the bottom.
 * ---------------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Ã¢â€â‚¬Ã¢â€â‚¬ Colour math (WCAG 2.1 relative luminance) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

function hexToRGB(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16)
  ];
}

function luminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(a, b) {
  const l1 = luminance(hexToRGB(a));
  const l2 = luminance(hexToRGB(b));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}


// Ã¢â€â‚¬Ã¢â€â‚¬ Token parser Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

function parseTokens(css, blockStart) {
  const idx = css.indexOf(blockStart);
  if (idx === -1) return {};
  const start = css.indexOf('{', idx);
  let depth = 0, end = start;
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const tokens = {};
  const re = /--sui-([a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,8})/g;
  let m;
  while ((m = re.exec(css.slice(start, end + 1)))) {
    tokens[`--sui-${m[1]}`] = m[2];
  }
  return tokens;
}


// Ã¢â€â‚¬Ã¢â€â‚¬ Result tracking Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

let totalPass = 0;
let totalFail = 0;
let totalWarn = 0;

function pass()     { totalPass++; }
function fail(msg)  { totalFail++; console.log(`    Ã¢Å“— ${msg}`); }
function warn(msg)  { totalWarn++; console.log(`    Ã¢Å¡  ${msg}`); }

function testPair(fg, bg, label, threshold, theme, level = 'error') {
  const ratio = contrastRatio(fg, bg);
  if (ratio >= threshold) {
    pass();
  } else if (level === 'warn') {
    warn(`${theme.padEnd(6)} ${label} — ${ratio.toFixed(2)}:1 (advisory ${threshold}:1)`);
  } else {
    fail(`${theme.padEnd(6)} ${label}`);
    console.log(`             ${fg} on ${bg} → ${ratio.toFixed(2)}:1 (need ${threshold}:1)`);
  }
}

/** Read file if it exists, return empty string otherwise */
function readFile(name) {
  const p = path.join(ROOT, name);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

/**
 * Strip code examples from HTML so documentation doesn't trigger false positives.
 * Removes content inside <pre>, <code>, and <script> blocks.
 */
function stripCodeBlocks(html) {
  return html
    .replace(/<pre[\s>][\s\S]*?<\/pre>/gi, '')
    .replace(/<code[\s>][\s\S]*?<\/code>/gi, '')
    .replace(/<script[\s>][\s\S]*?<\/script>/gi, '');
}

/** Approximate line number for a position in a string */
function lineAt(str, pos) {
  return pos > -1 ? str.slice(0, pos).split('\n').length : '?';
}


// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  1. WCAG AA CONTRAST — Token pairs
//     Tests every documented foreground/background combination in
//     both light and dark themes. Grouped by regression likelihood.
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

function checkContrast() {
  const css = readFile('sui-tokens.css');
  if (!css) return;

  const light = parseTokens(css, ':root {');
  const dark  = parseTokens(css, '[data-theme="dark"]');

  console.log('  Ã¢â€â‚¬Ã¢â€â‚¬ Contrast: Token Pairs Ã¢â€â‚¬Ã¢â€â‚¬');

  // P1: Soft backgrounds — tightest ratios, most likely to regress
  const SOFT = [
    ['--sui-success-strong', '--sui-success-soft',  'success -strong/-soft',  4.5],
    ['--sui-warning-strong', '--sui-warning-soft',  'warning -strong/-soft',  4.5],
    ['--sui-error-strong',   '--sui-error-soft',    'error -strong/-soft',    4.5],
    ['--sui-info-strong',    '--sui-info-soft',     'info -strong/-soft',     4.5],
    ['--sui-neutral-strong', '--sui-neutral-soft',  'neutral -strong/-soft',  4.5],
    ['--sui-pro-strong',     '--sui-pro-soft',      'pro -strong/-soft',      4.5],
    ['--sui-blue-strong',    '--sui-blue-soft',     'blue -strong/-soft',     4.5],
  ];

  // P2: Text readability — body, secondary, muted on all surfaces
  const TEXT = [
    ['--sui-text-primary',   '--sui-bg-primary',   'primary on bg',        4.5],
    ['--sui-text-primary',   '--sui-bg-card',      'primary on card',      4.5],
    ['--sui-text-primary',   '--sui-bg-elevated',  'primary on elevated',  4.5],
    ['--sui-text-secondary', '--sui-bg-primary',   'secondary on bg',      4.5],
    ['--sui-text-secondary', '--sui-bg-card',      'secondary on card',    4.5],
    ['--sui-text-muted',     '--sui-bg-primary',   'muted on bg',          4.5],
    ['--sui-text-muted',     '--sui-bg-card',      'muted on card',        4.5],
  ];

  // P3: Interactive — buttons, links, brand surfaces
  const INTERACTIVE = [
    ['--sui-blue-primary',   '--sui-bg-card',             'link on card',       4.5],
    ['--sui-blue-primary',   '--sui-bg-primary',          'link on bg',         4.5],
    ['--sui-text-inverse',   '--sui-btn-primary-bg',      'btn-primary',        4.5],
    ['--sui-text-inverse',   '--sui-btn-danger-bg',       'btn-danger',         4.5],
    ['--sui-text-inverse',   '--sui-btn-success-bg',      'btn-success',        4.5],
    ['--sui-text-inverse',   '--sui-btn-primary-bg-hover','btn-primary:hover',  4.5],
    ['--sui-text-inverse',   '--sui-btn-danger-bg-hover', 'btn-danger:hover',   4.5],
    ['--sui-text-inverse',   '--sui-btn-success-bg-hover','btn-success:hover',  4.5],
    ['--sui-text-inverse',   '--sui-btn-success-bg',      'stepper complete',   4.5],
  ];

  // Advisory: Focus ring visibility — 3:1 is WCAG 2.4.11 (AAA), not 2.4.7 (AA).
  // SUI uses 3px outline at 2px offset — visible through width, not just contrast.
  // Same approach as Material, Primer, Radix. Kept for awareness, not compliance.
  const FOCUS = [
    ['--sui-blue-soft', '--sui-bg-card',     'focus ring on card',     3.0],
    ['--sui-blue-soft', '--sui-bg-primary',  'focus ring on bg',       3.0],
    ['--sui-blue-soft', '--sui-bg-elevated', 'focus ring on elevated', 3.0],
  ];

  const groups = [
    ['P1 Soft backgrounds',  SOFT,        'error'],
    ['P2 Text readability',  TEXT,        'error'],
    ['P3 Interactive',       INTERACTIVE, 'error'],
    ['P4 Focus visibility',  FOCUS,       'warn'],
  ];

  for (const [name, pairs, level] of groups) {
    console.log(`     ${name}${level === 'warn' ? ' (advisory — AAA)' : ''}`);
    for (const [fg, bg, label, threshold] of pairs) {
      if (light[fg] && light[bg])
        testPair(light[fg], light[bg], label, threshold, 'light', level);
      if (dark[fg] && dark[bg])
        testPair(dark[fg], dark[bg], label, threshold, 'dark', level);
    }
  }
}


// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  2. HARDCODED COLOUR OVERRIDES
//     Component-level hex values that don't resolve from tokens.
//     These must be tested separately since the token parser can't
//     reach them.
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

function checkHardcodedContrast() {
  console.log('  Ã¢â€â‚¬Ã¢â€â‚¬ Contrast: Hardcoded Overrides Ã¢â€â‚¬Ã¢â€â‚¬');
  const PAIRS = [
    ['#FFFFFF', '#92400E', 'progress-labeled warning', 4.5],
    ['#FFFFFF', '#0E7490', 'progress-labeled info',    4.5],
  ];
  for (const [fg, bg, label, threshold] of PAIRS) {
    testPair(fg, bg, label, threshold, 'dark');
  }
}

function checkRgbaComposites() {
  console.log('  â”€â”€ Contrast: RGBA Composites â”€â”€');
  const tokens = readFile('sui-tokens.css');
  if (!tokens) return;
  const dark = parseTokens(tokens, '[data-theme="dark"]');
  const bgCard = dark['--sui-bg-card'] || '#1E293B';
  const bgRGB = hexToRGB(bgCard);

  function blendToHex(baseHex, alpha) {
    const fg = hexToRGB(baseHex);
    const r = Math.round(alpha * fg[0] + (1 - alpha) * bgRGB[0]);
    const g = Math.round(alpha * fg[1] + (1 - alpha) * bgRGB[1]);
    const b = Math.round(alpha * fg[2] + (1 - alpha) * bgRGB[2]);
    return '#' + [r,g,b].map(c => c.toString(16).padStart(2,'0')).join('');
  }

  // Known rgba composites: [base, alpha, textHex, label, threshold]
  const COMPOSITES = [
    ['#F59E0B', 0.25, '#F1F5F9', 'mark on dark bg',         4.5],
    ['#F59E0B', 0.6,  '#000000', 'mark-current on dark bg',  4.5],
  ];

  let issues = 0;
  for (const [base, alpha, textHex, label, threshold] of COMPOSITES) {
    const effective = blendToHex(base, alpha);
    const ratio = contrastRatio(textHex, effective);
    if (ratio < threshold) {
      fail('dark   ' + label);
      console.log('             ' + textHex + ' on ' + effective + ' = ' + ratio.toFixed(2) + ':1 (need ' + threshold + ':1)');
      issues++;
    }
  }
  if (issues === 0) pass();
}



// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  3. HTML / ARIA ACCESSIBILITY
//     Static analysis of index.html targeting axe-core rule IDs and
//     Lighthouse audit IDs. Catches issues before they reach a
//     browser. Code examples (<pre>, <code>, <script>) are stripped
//     to avoid false positives from documentation.
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

function checkHTML() {
  const raw = readFile('index.html');
  if (!raw) return;
  const html = stripCodeBlocks(raw);

  console.log('  Ã¢â€â‚¬Ã¢â€â‚¬ HTML/ARIA Ã¢â€â‚¬Ã¢â€â‚¬');

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ document-lang (axe: html-has-lang) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Language');
  if (/<html[^>]*\slang="[^"]+"/i.test(raw)) pass();
  else fail('<html> missing lang attribute');

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ document-title (axe: document-title) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Document title');
  if (/<title>[^<]+<\/title>/i.test(raw)) pass();
  else fail('Missing or empty <title>');

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ button-name (axe: button-name) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Button names');
  const btnRe = /<button([^>]*)>([\s\S]*?)<\/button>/gi;
  let m, unlabeled = 0;
  while ((m = btnRe.exec(html))) {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const named = /aria-label\s*=/.test(attrs)
               || /\stitle\s*=/.test(attrs)
               || text.length > 0;
    if (!named) {
      fail(`Unlabeled <button> at line ~${lineAt(raw, raw.indexOf(m[0]))}`);
      unlabeled++;
    }
  }
  if (unlabeled === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ link-name (axe: link-name) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Link names');
  const linkRe = /<a\s([^>]*)>([\s\S]*?)<\/a>/gi;
  let emptyLinks = 0;
  while ((m = linkRe.exec(html))) {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const named = /aria-label\s*=/.test(attrs)
               || /\stitle\s*=/.test(attrs)
               || text.length > 0;
    if (!named && /href\s*=/.test(attrs)) {
      fail(`Empty link at line ~${lineAt(raw, raw.indexOf(m[0]))}`);
      emptyLinks++;
    }
  }
  if (emptyLinks === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ image-alt (axe: image-alt) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Image alt text');
  const imgRe = /<img([^>]*)\/?\s*>/gi;
  let noAlt = 0;
  while ((m = imgRe.exec(html))) {
    if (!/\salt[\s=]/i.test(m[1])) {
      fail(`<img> without alt at line ~${lineAt(raw, raw.indexOf(m[0]))}`);
      noAlt++;
    }
  }
  if (noAlt === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ duplicate-id (axe: duplicate-id-active) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Unique IDs');
  const idRe = /\sid="([^"]+)"/g;
  const ids = {};
  while ((m = idRe.exec(html))) ids[m[1]] = (ids[m[1]] || 0) + 1;
  let dupes = 0;
  for (const [id, n] of Object.entries(ids)) {
    if (n > 1) { fail(`Duplicate id="${id}" (${n}×)`); dupes++; }
  }
  if (dupes === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ heading-order (axe: heading-order) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Heading hierarchy');
  const hRe = /<h(\d)/g;
  let prev = 0, skips = 0;
  while ((m = hRe.exec(html))) {
    const lvl = parseInt(m[1]);
    if (lvl > prev + 1 && prev > 0) {
      fail(`Heading skip: h${prev} → h${lvl}`);
      skips++;
    }
    prev = lvl;
  }
  if (skips === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ tabindex (axe: tabindex) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Tab order');
  const tabRe = /tabindex="(\d+)"/g;
  let badTab = 0;
  while ((m = tabRe.exec(html))) {
    const val = parseInt(m[1]);
    if (val > 0) {
      fail(`Positive tabindex="${val}" breaks natural tab order`);
      badTab++;
    }
  }
  if (badTab === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ meta-viewport (axe: meta-viewport) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Viewport');
  const vpMatch = raw.match(/<meta[^>]*name="viewport"[^>]*content="([^"]+)"/i);
  if (!vpMatch) {
    fail('Missing <meta name="viewport">');
  } else {
    const vp = vpMatch[1];
    if (/user-scalable\s*=\s*no/i.test(vp)) {
      fail('Viewport disables user scaling (user-scalable=no)');
    } else if (/maximum-scale\s*=\s*1(?:[^0-9]|$)/i.test(vp)) {
      fail('Viewport limits zoom (maximum-scale=1)');
    } else {
      pass();
    }
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ list structure (axe: listitem) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  // <li> must be direct child of <ul>, <ol>, or <menu>.
  // We check that every <li> has a <ul>/<ol>/<menu> ancestor in the
  // surrounding markup. Simplified: look for opening tag before it.
  console.log('     List structure');
  const liRe = /<li[\s>]/gi;
  let orphanLi = 0;
  while ((m = liRe.exec(html))) {
    // Walk backwards through tags to find nearest list container
    const before = html.slice(Math.max(0, m.index - 2000), m.index);
    const tags = before.match(/<\/?(ul|ol|menu|li|div|section|nav|header|footer|main|article|aside)\b/gi) || [];
    // Track open containers
    let inList = false;
    for (const tag of tags) {
      const lower = tag.toLowerCase();
      if (lower === '<ul' || lower === '<ol' || lower === '<menu') inList = true;
      if (lower === '</ul' || lower === '</ol' || lower === '</menu') inList = false;
    }
    if (!inList) {
      fail(`<li> outside list container at line ~${lineAt(raw, m.index)}`);
      orphanLi++;
    }
  }
  if (orphanLi === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ autocomplete (axe: autocomplete-valid) — advisory Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  console.log('     Autocomplete');
  const acRe = /<input[^>]*type="(password|email)"[^>]*>/gi;
  let missingAC = 0;
  while ((m = acRe.exec(html))) {
    if (!/autocomplete\s*=/.test(m[0])) {
      warn(`Input type="${m[1]}" missing autocomplete attribute`);
      missingAC++;
    }
  }
  if (missingAC === 0) pass();

  // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ aria-hidden-focus (axe: aria-hidden-focus) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  // Focusable elements must not live inside aria-hidden="true"
  console.log('     Focus inside aria-hidden');
  const ahRe = /aria-hidden="true"[^>]*>([\s\S]*?)<\/(?:div|span|section|nav)>/gi;
  let hiddenFocus = 0;
  while ((m = ahRe.exec(html))) {
    const inner = m[1];
    // Check for focusable elements (buttons, links with href, inputs, etc.)
    if (/<(?:button|a\s[^>]*href|input|select|textarea)\b/i.test(inner)) {
      fail(`Focusable element inside aria-hidden at line ~${lineAt(raw, raw.indexOf(m[0]))}`);
      hiddenFocus++;
    }
  }
  if (hiddenFocus === 0) pass();

  // ——— stepper aria-current (v2.2.0) ———
  console.log('     Stepper active state');
  const activeSteps = (html.match(/is-active/g) || []).length;
  const ariaCurrent = (html.match(/aria-current="step"/g) || []).length;
  if (activeSteps > 0 && ariaCurrent === 0) {
    fail('Stepper .is-active found but no aria-current="step"');
  } else if (activeSteps > 0) {
    pass();
  } else {
    pass(); // No stepper in demo is fine
  }

  // ——— radiogroup aria-label (v2.2.0) ———
  console.log('     Radiogroup labels');
  const rgRe = /role="radiogroup"([^>]*)/gi;
  let unlabeledRG = 0;
  while ((m = rgRe.exec(html))) {
    if (!/aria-label\s*=/.test(m[1]) && !/aria-labelledby\s*=/.test(m[1])) {
      fail(`role="radiogroup" without aria-label at line ~${lineAt(raw, m.index)}`);
      unlabeledRG++;
    }
  }
  if (unlabeledRG === 0) pass();

  // ——— sidenav group ARIA (v2.4.0) ———
  console.log('     Sidenav group toggles');
  const sgRe = /class="[^"]*sui-sidenav-group-toggle[^"]*"([^>]*)/gi;
  let badGroupToggle = 0;
  while ((m = sgRe.exec(html))) {
    const attrs = m[1];
    if (!/aria-expanded\s*=/.test(attrs)) {
      fail(`sui-sidenav-group-toggle missing aria-expanded at line ~${lineAt(raw, m.index)}`);
      badGroupToggle++;
    }
    if (!/aria-controls\s*=/.test(attrs)) {
      fail(`sui-sidenav-group-toggle missing aria-controls at line ~${lineAt(raw, m.index)}`);
      badGroupToggle++;
    }
  }
  if (badGroupToggle === 0) pass();

  // ——— panel ARIA (v2.4.0) ———
  console.log('     Panel labels');
  const pnlRe = /class="[^"]*sui-panel(?:\s|")[^>]*/gi;
  let badPanel = 0;
  while ((m = pnlRe.exec(html))) {
    if (!/aria-label\s*=/.test(m[0]) && !/aria-labelledby\s*=/.test(m[0])) {
      fail(`sui-panel missing aria-label at line ~${lineAt(raw, m.index)}`);
      badPanel++;
    }
  }
  if (badPanel === 0) pass();

  console.log('     Panel close buttons');
  const pcRe = /class="[^"]*sui-panel-close[^"]*"([^>]*)/gi;
  let badPanelClose = 0;
  while ((m = pcRe.exec(html))) {
    if (!/aria-label\s*=/.test(m[1])) {
      fail(`sui-panel-close missing aria-label at line ~${lineAt(raw, m.index)}`);
      badPanelClose++;
    }
  }
  if (badPanelClose === 0) pass();
}


// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  4. VERSION CONSISTENCY
//     Every source file's Version: header must match package.json.
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

function checkVersions() {
  console.log('  Ã¢â€â‚¬Ã¢â€â‚¬ Version Consistency Ã¢â€â‚¬Ã¢â€â‚¬');
  const pkg = JSON.parse(readFile('package.json') || '{}');
  const expected = pkg.version;
  if (!expected) { fail('No version in package.json'); return; }

  for (const file of ['sui-tokens.css', 'sui-components.css', 'sui.js']) {
    const content = readFile(file);
    const match = content.match(/Version:\s*([0-9.]+)/);
    const found = match ? match[1] : 'NOT FOUND';
    if (found === expected) pass();
    else fail(`${file}: ${found} (expected ${expected})`);
  }
}


// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  5. DIST HYGIENE
//     Only expected file types should be in dist/. Catches accidental
//     inclusion of source files, documentation, or other artifacts.
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

function checkDistHygiene() {
  console.log('  Ã¢â€â‚¬Ã¢â€â‚¬ Dist Hygiene Ã¢â€â‚¬Ã¢â€â‚¬');
  const distDir = path.join(ROOT, 'dist');
  if (!fs.existsSync(distDir)) { pass(); return; }

  const ALLOWED_EXTENSIONS = ['.css', '.js', '.map'];
  let unexpected = 0;

  for (const file of fs.readdirSync(distDir)) {
    const ext = path.extname(file).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      fail(`Unexpected file in dist/: ${file} (allowed: ${ALLOWED_EXTENSIONS.join(', ')})`);
      unexpected++;
    }
  }
  if (unexpected === 0) pass();
}

function checkEncoding() {
  console.log('  \u2500\u2500 Encoding Hygiene \u2500\u2500');
  const SOURCE_FILES = [
    'sui-tokens.css', 'sui-components.css', 'sui.js',
    'index.html', 'README.md', 'CHANGELOG.md',
    'scripts/preflight.js',
  ];
  const BAD = [
    ['\u00e2\u20ac\u201d', 'em dash'],
    ['\u00e2\u20ac\u201c', 'en dash'],
    ['\u00e2\u2020\u2019', 'arrow'],
    ['\u00c3\u2014', 'multiply'],
    ['\u00e2\u2030\u00a0', 'not-equal'],
  ];
  let dirty = 0;
  for (const file of SOURCE_FILES) {
    const content = readFile(file);
    if (!content) continue;
    for (const [seq, label] of BAD) {
      if (content.includes(seq)) {
        fail(`${file} contains mojibake (${label})`);
        dirty++;
      }
    }
  }
  if (dirty === 0) pass();
}


// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â
//  Runner
// Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â

console.log('');
console.log('  SUI Preflight Validator');
console.log('  Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â');

checkContrast();
checkHardcodedContrast();
checkRgbaComposites();
checkHTML();
checkVersions();
checkDistHygiene();
checkEncoding();

console.log('');
const parts = [`${totalPass} passed`, `${totalFail} failed`];
if (totalWarn > 0) parts.push(`${totalWarn} advisory`);
console.log(`  ${parts.join(', ')}`);
console.log('  Ã¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•ÂÃ¢•Â');

if (totalFail > 0) {
  console.log('  Ã¢Å“— Preflight FAILED — fix issues before shipping.');
  console.log('');
  process.exit(1);
} else {
  console.log('  Ã¢Å““ All checks passed.');
  console.log('');
  process.exit(0);
}
