const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { after, before, test } = require('node:test');

const root = path.resolve(__dirname, '..');
const mirrors = ['.claude/instructions.md', '.cursor/rules', 'llms.txt'];
const mapping = '| Sidebar / Side menu | `sui-sidenav` | Component |';
let fixture;

before(() => {
  fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sui-preflight-test-'));
  fs.cpSync(root, fixture, {
    recursive: true,
    filter: source => !['.git', 'node_modules'].includes(
      path.relative(root, source).split(path.sep)[0]
    )
  });
  assert.ok(fs.readFileSync(path.join(fixture, 'docs/javascript-api.md'), 'utf8').includes(mapping));
});

after(() => {
  if (fixture) fs.rmSync(fixture, { recursive: true, force: true });
});

function runPreflight() {
  const result = spawnSync(process.execPath, [path.join(fixture, 'scripts/preflight.js')], {
    cwd: fixture,
    encoding: 'utf8'
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, result.stderr);
  return result;
}

function withMirror(mirror, replacement, check) {
  const file = path.join(fixture, mirror);
  const original = fs.readFileSync(file, 'utf8');
  assert.ok(original.includes(mapping), `${mirror} must contain the canonical mapping`);
  try {
    const changed = replacement(original);
    if (changed === null) fs.unlinkSync(file);
    else fs.writeFileSync(file, changed);
    check(runPreflight());
  } finally {
    fs.writeFileSync(file, original);
  }
}

test('preflight accepts the unchanged canonical mappings in every mirror', () => {
  const result = runPreflight();
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

for (const mirror of mirrors) {
  test(`preflight rejects a changed prose-first mapping in ${mirror}`, () => {
    withMirror(mirror, content => content.replace(mapping, mapping.replace('sui-sidenav', 'sui-navbar')), result => {
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.ok(result.stdout.includes(`${mirror}: missing canonical row "| Sidebar / Side menu |`), result.stdout);
    });
  });

  test(`preflight rejects a removed prose-first mapping in ${mirror}`, () => {
    withMirror(mirror, content => content.replace(mapping, ''), result => {
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.ok(result.stdout.includes(`${mirror}: missing canonical row "| Sidebar / Side menu |`), result.stdout);
    });
  });

  test(`preflight rejects a missing mirror: ${mirror}`, () => {
    withMirror(mirror, () => null, result => {
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.ok(result.stdout.includes(`${mirror}: missing or empty canonical AI-context mirror`), result.stdout);
    });
  });

  test(`preflight rejects an empty mirror: ${mirror}`, () => {
    withMirror(mirror, () => ' \n', result => {
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.ok(result.stdout.includes(`${mirror}: missing or empty canonical AI-context mirror`), result.stdout);
    });
  });
}
