import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../../resources/js/content/websiteDesigns.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function restore(service, draft, storageError = false, search = '') {
  const exports = {};
  const context = { exports, URLSearchParams, window: { location: { search }, localStorage: { getItem() {
    if (storageError) throw new Error('Storage unavailable');
    return draft;
  } } } };
  vm.runInNewContext(compiled, context);
  return exports.restoreDesignReference(service);
}

test('restores a saved design only for its matching website service', () => {
  const draft = JSON.stringify({ service_type: 'corporate', design_reference: 'meridian' });
  assert.equal(restore('corporate', draft), 'meridian');
  assert.equal(restore('landing', draft), '');
  assert.equal(restore('consultation', draft), '');
});

test('explicit demo selection wins over a draft and works without storage', () => {
  const draft = JSON.stringify({ service_type: 'landing', design_reference: 'mono' });
  assert.equal(restore('landing', draft, false, '?service=landing&design=pulse'), 'pulse');
  assert.equal(restore('landing', null, true, '?design=atelier'), 'atelier');
  assert.equal(restore('landing', draft, false, '?design=meridian'), 'mono');
  assert.equal(restore('landing', null, false, '?design=unknown'), '');
});

test('rejects unknown and cross-service design ids from saved drafts', () => {
  for (const id of ['unknown', 'meridian', '<script>', { id: 'mono' }]) {
    assert.equal(restore('landing', JSON.stringify({ service_type: 'landing', design_reference: id })), '');
  }
});

test('new animated designs restore and transfer from their matching demo only', () => {
  for (const [service, ids] of [['landing', ['rally', 'serein']], ['corporate', ['foundry', 'ledger']]]) {
    const other = service === 'landing' ? 'corporate' : 'landing';
    for (const id of ids) {
      const draft = JSON.stringify({ service_type: service, design_reference: id });
      assert.equal(restore(service, draft), id);
      assert.equal(restore(service, null, true, `?design=${id}`), id);
      assert.equal(restore(other, null, false, `?design=${id}`), '');
    }
  }
});

test('missing, malformed and blocked draft storage do not prevent rendering', () => {
  for (const draft of [null, '{broken', 'null', '[]', '42']) assert.equal(restore('landing', draft), '');
  assert.equal(restore('landing', '{}', true), '');
  const exports = {};
  vm.runInNewContext(compiled, { exports });
  assert.equal(exports.restoreDesignReference('landing'), '');
});
