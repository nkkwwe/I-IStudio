import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../../resources/js/content/websiteDesigns.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function restore(service, draft, storageError = false) {
  const exports = {};
  const context = { exports, window: { localStorage: { getItem() {
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

test('rejects unknown and cross-service design ids from saved drafts', () => {
  for (const id of ['unknown', 'meridian', '<script>', { id: 'mono' }]) {
    assert.equal(restore('landing', JSON.stringify({ service_type: 'landing', design_reference: id })), '');
  }
});

test('missing, malformed and blocked draft storage do not prevent rendering', () => {
  for (const draft of [null, '{broken', 'null', '[]', '42']) assert.equal(restore('landing', draft), '');
  assert.equal(restore('landing', '{}', true), '');
  const exports = {};
  vm.runInNewContext(compiled, { exports });
  assert.equal(exports.restoreDesignReference('landing'), '');
});
