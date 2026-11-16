const assert = require('node:assert/strict');
const { test } = require('node:test');
const { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');

async function checkSprite(source) {
  const { JSDOM } = await import('jsdom');
  const root = mkdtempSync(join(tmpdir(), 'sui-sprite-'));
  let before, after;
  try {
    mkdirSync(join(root, 'scripts'));
    copyFileSync(join(__dirname, '../scripts/minify-sprite.mjs'), join(root, 'scripts/minify-sprite.mjs'));
    writeFileSync(join(root, 'sui-icons.svg'), source);
    execFileSync(process.execPath, [join(root, 'scripts/minify-sprite.mjs')]);
    before = new JSDOM(source, { contentType: 'image/svg+xml' });
    after = new JSDOM(readFileSync(join(root, 'dist/sui-icons.min.svg'), 'utf8'), { contentType: 'image/svg+xml' });
    const snapshot = document => [...document.querySelectorAll('*')].map(el => ({
      name: el.tagName,
      attributes: [...el.attributes].map(a => [a.name, a.value.replace(/\s+/g, ' ').trim()]),
      text: [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean).join(' '),
    }));
    assert.deepEqual(snapshot(after.window.document), snapshot(before.window.document));
  } finally {
    before?.window.close();
    after?.window.close();
    rmSync(root, { recursive: true, force: true });
  }
}

test('sprite minification preserves attributes and path data split across lines', async () => {
  await checkSprite(`<svg xmlns="http://www.w3.org/2000/svg"><symbol id="heading" viewBox="0 0 24 24">
    <title>Heading icon</title><!-- removable comment -->
    <path stroke-width="2"
      d="M4 4H8
      M6 4V20"/>
  </symbol></svg>`);
});

test('the complete production sprite remains valid XML with identical elements and attributes', async () => {
  await checkSprite(readFileSync(join(__dirname, '../sui-icons.svg'), 'utf8'));
});
