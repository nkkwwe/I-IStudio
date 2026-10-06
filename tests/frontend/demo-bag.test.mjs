import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
const compiled = ts.transpileModule(readFileSync(new URL('../../resources/js/content/demoBag.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function fixture(initial = null, blocked = false) {
  let stored = initial, writes = 0;
  const exports = {};
  vm.runInNewContext(compiled, { exports, window: { localStorage: {
    getItem() { if (blocked) throw new Error('Unavailable'); return stored; },
    setItem(_key, value) { if (blocked) throw new Error('Unavailable'); stored = value; writes++; },
  } } });
  return { api: exports, stored: () => stored, writes: () => writes };
}
test('restores only known products with bounded integer quantities', () => {
  const f = fixture(JSON.stringify({ ficus: 2, succulent: 10, 'garden-kit': 1.5, 'quiet-corner': -1, other: 3 }));
  assert.equal(JSON.stringify(f.api.readDemoBag()), JSON.stringify({ ficus: 2, succulent: 10 }));
  for (const value of ['null', '[]', '"text"', '{invalid', '{"ficus":"2"}', '{"ficus":11}']) {
    assert.equal(JSON.stringify(fixture(value).api.readDemoBag()), '{}');
  }
});
test('persists sanitized data without echoing identical cross-tab updates', () => {
  const f = fixture();
  f.api.saveDemoBag({ ficus: 3, other: 4 });
  assert.equal(f.stored(), '{"ficus":3}');
  f.api.saveDemoBag(f.api.readDemoBag());
  assert.equal(f.writes(), 1);
  f.api.saveDemoBag({});
  assert.equal(f.stored(), '{}');
});
test('storage errors preserve usable in-memory interactions', () => {
  const f = fixture(null, true);
  assert.equal(JSON.stringify(f.api.readDemoBag()), '{}');
  assert.doesNotThrow(() => f.api.saveDemoBag({ ficus: 1 }));
});
