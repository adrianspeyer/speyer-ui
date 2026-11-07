const assert = require('node:assert/strict');
const { before, test } = require('node:test');

let optimize, config, JSDOM;

before(async () => {
  ({ optimize } = await import('svgo'));
  ({ default: config } = await import('../svgo.config.mjs'));
  ({ JSDOM } = await import('jsdom'));
});

function checkOptimized(input, check) {
  const result = optimize(input, { ...config, path: 'contributor-icon.svg' });
  const dom = new JSDOM(result.data, { contentType: 'image/svg+xml' });
  try {
    check(dom.window.document, result.data);
  } finally {
    dom.window.close();
  }
}

test('icon optimization preserves the title, dimensions, geometry, and IDs', () => {
  const geometry = [
    ['rect', { id: 'box', x: '2', y: '2', width: '20', height: '20' }],
    ['circle', { id: 'circle', cx: '12', cy: '12', r: '4' }],
    ['ellipse', { id: 'ellipse', cx: '12', cy: '12', rx: '3', ry: '3' }],
    ['path', { id: 'curve', d: 'M2.123456 3.654321 L20.987654 21.123456', transform: 'translate(0.123456 0.654321)' }],
    ['path', { id: 'line', d: 'M4 6 L8 10' }],
  ];
  const children = geometry.map(([name, attrs]) =>
    `<${name} ${Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ')} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  ).join('');
  checkOptimized(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="icon-title"><title id="icon-title">Example icon</title>${children}</svg>`, document => {
    const svg = document.documentElement;
    assert.equal(svg.firstElementChild.localName, 'title');
    assert.equal(svg.firstElementChild.textContent, 'Example icon');
    assert.equal(svg.firstElementChild.id, 'icon-title');
    assert.equal(svg.getAttribute('aria-labelledby'), 'icon-title');
    assert.equal(svg.getAttribute('role'), 'img');
    assert.equal(svg.getAttribute('viewBox'), '0 0 24 24');
    assert.equal(svg.getAttribute('width'), '24');
    assert.equal(svg.getAttribute('height'), '24');
    assert.equal(svg.children.length, geometry.length + 1);
    for (const [name, attrs] of geometry) {
      const element = document.getElementById(attrs.id);
      assert.ok(element, `preserve #${attrs.id}`);
      assert.equal(element.localName, name);
      for (const [key, value] of Object.entries(attrs)) assert.equal(element.getAttribute(key), value);
      for (const [key, value] of Object.entries({ fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })) {
        assert.equal(element.getAttribute(key), value);
      }
    }
  });
});

test('icon optimization removes editor metadata and descriptions without removing the title', () => {
  checkOptimized(`<?xml version="1.0"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 24 24" inkscape:version="1.0" data-editor="draft">
      <!-- Contributor note -->
      <metadata>Editor metadata</metadata>
      <title>Named icon</title>
      <desc>An authored description, not an editor-generated placeholder.</desc>
      <path d="M2 2 L22 22" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`, (document, output) => {
    assert.equal(document.documentElement.firstElementChild.localName, 'title');
    assert.equal(document.querySelector('title').textContent, 'Named icon');
    assert.equal(document.querySelector('metadata, desc'), null);
    assert.equal(document.documentElement.hasAttribute('data-editor'), false);
    assert.doesNotMatch(output, /<!--|<\?xml|inkscape/);
  });
});

test('icon optimization preserves explicit default-valued paint attributes', () => {
  checkOptimized('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Explicit styling</title><path d="M2 2 L22 22" fill="currentColor" stroke="none" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter"/></svg>', document => {
    const element = document.querySelector('path');
    for (const [key, value] of Object.entries({ fill: 'currentColor', stroke: 'none', 'stroke-width': '2', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter' })) {
      assert.equal(element.getAttribute(key), value);
    }
  });
});
