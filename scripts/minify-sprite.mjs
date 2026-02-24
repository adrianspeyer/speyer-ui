/**
 * minify-sprite.mjs — SUI Icons
 *
 * Minifies sui-icons.svg → dist/sui-icons.min.svg
 * Strips comments, collapses whitespace, removes blank lines.
 * Does NOT alter geometry, paths, or attributes.
 *
 * Replaces the old `cp sui-icons.min.svg dist/sui-icons.min.svg`
 * build step so that the minified sprite only exists in dist/.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'sui-icons.svg');
const dest = join(root, 'dist', 'sui-icons.min.svg');

// Ensure dist/ exists
mkdirSync(join(root, 'dist'), { recursive: true });

let content = readFileSync(src, 'utf8');

// Remove XML/HTML comments
content = content.replace(/<!--[\s\S]*?-->/g, '');

// Strip leading/trailing whitespace from each line, drop empty lines
const lines = content.split('\n')
  .map(l => l.trim())
  .filter(l => l.length > 0);

// Join and collapse inter-tag whitespace
let minified = lines.join('');
minified = minified.replace(/>\s+</g, '><');
minified = minified.replace(/\s{2,}/g, ' ');

writeFileSync(dest, minified, 'utf8');

const srcSize = readFileSync(src).length;
const destSize = Buffer.byteLength(minified, 'utf8');
const pct = ((1 - destSize / srcSize) * 100).toFixed(1);
console.log(`  sui-icons.svg → dist/sui-icons.min.svg  (${srcSize.toLocaleString()}B → ${destSize.toLocaleString()}B, −${pct}%)`);
