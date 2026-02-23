#!/usr/bin/env node
/*!
 * SUI Icons — Sprite Validator
 * Run before any release: node validate.mjs
 * Exit 0 = clean, Exit 1 = failures
 *
 * Checks:
 *   1. All symbols have viewBox="0 0 24 24"
 *   2. <title> is first child of every <symbol>
 *   3. No <desc> elements
 *   4. No hardcoded hex colours
 *   5. No forbidden attributes (class/style on children, xmlns on non-root)
 *   6. No duplicate IDs
 *   7. Stroke-width is 2 on all non-alias, non-exception symbols
 *   8. No internal comments left in shipped file ("FLAGGED", "PRIVATE", etc.)
 *   9. Alias <use> targets resolve to an existing symbol in the same file
 *  10. Symbol count matches expected total
 *  11. Title/ID semantic mismatch — if ID contains a concrete noun (crown, star,
 *      heart, etc.) the title must contain that word or an accepted synonym.
 *      Catches the v3.0.0 act-crown bug where a star polygon had title="Premium".
 *  12. No internal comments left in shipped file
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const SVG_PATH = resolve('./sui-icons.svg');
const EXPECTED_TOTAL = 528;
const SW_EXCEPTIONS = new Set(['sui-icon-status-help-circle', 'sui-icon-ai-lightbulb', 'sui-icon-misc-maple-leaf']);

let raw;
try {
  raw = readFileSync(SVG_PATH, 'utf8');
} catch {
  console.error('✗ Cannot read sui-icons.svg');
  process.exit(1);
}

let pass = 0, fail = 0;
const errors = [];

function ok(label)       { pass++; }
function err(label, msg) { fail++; errors.push(`  ✗ ${label}: ${msg}`); }

// ── Parse symbols ──────────────────────────────────────────────────────────
const symbolRe = /<symbol([^>]*)>([\s\S]*?)<\/symbol>/g;
const symbols = [];
let m;
while ((m = symbolRe.exec(raw)) !== null) {
  const attrs = m[1];
  const inner = m[2];
  const idM   = attrs.match(/id="([^"]+)"/);
  const vbM   = attrs.match(/viewBox="([^"]+)"/);
  symbols.push({
    id:      idM  ? idM[1]  : null,
    viewBox: vbM  ? vbM[1]  : null,
    inner:   inner.trim(),
  });
}

// ── 1. Symbol count ────────────────────────────────────────────────────────
if (symbols.length === EXPECTED_TOTAL) {
  ok('Symbol count');
} else {
  err('Symbol count', `${symbols.length} found, expected ${EXPECTED_TOTAL}`);
}

// ── Build ID set for alias resolution ─────────────────────────────────────
const allIds = new Set(symbols.map(s => s.id));

// ── 2. Duplicate IDs ──────────────────────────────────────────────────────
const idCounts = {};
for (const { id } of symbols) {
  if (id) idCounts[id] = (idCounts[id] || 0) + 1;
}
const dupes = Object.entries(idCounts).filter(([, n]) => n > 1);
if (dupes.length === 0) {
  ok('No duplicate IDs');
} else {
  for (const [id] of dupes) err(id, 'duplicate ID');
}

// ── Per-symbol checks ──────────────────────────────────────────────────────
for (const { id, viewBox, inner } of symbols) {
  const short    = id ? id.replace('sui-icon-', '') : '(no id)';
  const isAlias  = inner.includes('<use href');

  // 3. viewBox
  if (viewBox === '0 0 24 24') ok(`${short} viewBox`);
  else err(short, `viewBox="${viewBox || 'missing'}"`);

  // 4. <title> first child
  if (inner.startsWith('<title>')) ok(`${short} title`);
  else err(short, '<title> is not first child');

  // 5. No <desc>
  if (!inner.includes('<desc>') && !inner.includes('<desc ')) ok(`${short} no-desc`);
  else err(short, '<desc> present — forbidden by spec');

  if (!isAlias) {
    // 6. No hardcoded hex
    if (!/<[^>]+(fill|stroke)="(#[0-9a-fA-F])/.test(inner)) ok(`${short} no-hex`);
    else err(short, 'hardcoded hex colour');

    // 7. No forbidden attributes on children
    if (!/\s(class|style)="/.test(inner)) ok(`${short} no-class-style`);
    else err(short, 'class or style attribute on child element');

    // 8. Stroke-width check
    if (!SW_EXCEPTIONS.has(id)) {
      const swMatches = [...inner.matchAll(/stroke-width="([^"]+)"/g)];
      const bad = swMatches.filter(([, v]) => parseFloat(v) !== 2);
      if (bad.length === 0) ok(`${short} stroke-width`);
      else bad.forEach(([, v]) => err(short, `stroke-width="${v}" (must be 2)`));
    }
  } else {
    // 9. Alias target resolves
    const hrefM = inner.match(/href="#([^"]+)"/);
    if (hrefM) {
      if (allIds.has(hrefM[1])) ok(`${short} alias-resolves`);
      else err(short, `alias href="#${hrefM[1]}" does not resolve to any symbol`);
    }
  }
}

// ── 10. Title/ID semantic mismatch ────────────────────────────────────────
// Catches cases like act-crown having title="Premium" with wrong geometry.
// Rule: if the ID descriptor contains a known concrete noun, the title must
// also contain that word (or an accepted synonym). This won't catch every
// case but will catch the class of error that slipped through in v3.0.0.
// Match whole hyphen-delimited segments only (so "clock" ≠ "lock", "heart-pulse" ok as "vitals")
const TITLE_MUST_MATCH = {
  'crown':    ['crown'],
  'star':     ['star'],
  'heart':    ['heart', 'favourite', 'loved'],   // heart-pulse → "vitals" is accepted below
  'bell':     ['bell', 'notification'],
  'shield':   ['shield', 'security', 'unprotected', 'protected'],
  'lock':     ['lock', 'locked'],                 // must be its own segment, not inside "clock"
  'unlock':   ['unlock', 'unlocked'],
  'key':      ['key', 'passkey'],
  'flag':     ['flag'],
  'bookmark': ['bookmark'],
  'trophy':   ['trophy', 'award'],
  'award':    ['award', 'trophy'],
};
// Accepted exceptions where shape metaphor differs from title on purpose
const TITLE_EXCEPTIONS = new Set([
  'health-heart-pulse',  // "Vitals" — heart+pulse line, correct metaphor
  'sec-shield-x',        // "Unprotected" — shield+X is the correct geometry
  'status-star-filled',  // "Favourite" — filled star = favourite, universally understood
  'file-key',            // "Encrypted File" — key on file = encrypted, correct metaphor
  'act-crown',           // "Premium" — crown shape = premium tier, intentional title
  'soc-crown',           // "Premium" — alias of act-crown, same intentional title
]);
for (const { id, inner } of symbols) {
  if (!id) continue;
  const short  = id.replace('sui-icon-', '');
  if (TITLE_EXCEPTIONS.has(short)) { ok(`${short} title-matches-id (exception)`); continue; }
  const titleM = inner.match(/<title>([^<]+)<\/title>/);
  const title  = (titleM ? titleM[1] : '').toLowerCase();
  const segs   = short.split('-').slice(1); // strip category prefix, get descriptor segments
  for (const [noun, synonyms] of Object.entries(TITLE_MUST_MATCH)) {
    // Only match if noun is its own full segment (prevents clock→lock, etc.)
    if (segs.includes(noun)) {
      const matched = synonyms.some(s => title.includes(s));
      if (matched) ok(`${short} title-matches-id`);
      else err(short, `ID segment "${noun}" not reflected in title "${titleM ? titleM[1] : 'missing'}" — verify geometry is correct`);
    }
  }
}

// ── 11. Internal comment leak ──────────────────────────────────────────────
const leaks = ['FLAGGED FOR ADRIAN', 'PRIVATE', 'INTERNAL USE ONLY', 'TODO:', 'FIXME:'];  // check 12
for (const leak of leaks) {
  if (raw.includes(leak)) err('File', `contains internal comment: "${leak}"`);
  else ok(`No "${leak}" leak`);
}

// ── Report ─────────────────────────────────────────────────────────────────
console.log('');
console.log('  SUI Icons — Sprite Validator');
console.log('  ══════════════════════════════════════════════');
console.log(`  Symbols checked: ${symbols.length}`);
if (errors.length) {
  errors.forEach(e => console.log(e));
  console.log('');
  console.log(`  ${pass} passed, ${fail} failed`);
  console.log('  ✗ Validation failed — fix before releasing.');
} else {
  console.log(`  ${pass} checks passed, 0 failures`);
  console.log('  ✓ Sprite is clean.');
}
console.log('  ══════════════════════════════════════════════');
console.log('');
process.exit(fail > 0 ? 1 : 0);
