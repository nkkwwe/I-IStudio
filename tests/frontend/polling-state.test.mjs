import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

function loadHook(file, extra = {}) {
  let effect;
  let state;
  let interval;
  const source = readFileSync(new URL(`../../resources/js/lib/${file}`, import.meta.url), 'utf8');
  const exports = {};
  const react = {
    useEffect: (callback) => { effect = callback; },
    useRef: (current) => ({ current }),
    useCallback: (callback) => callback,
    useState: (initial) => {
      state = initial;
      return [state, (update) => { state = typeof update === 'function' ? update(state) : update; }];
    },
  };
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    exports,
    require: (name) => name === 'react' ? react : extra,
    document: { visibilityState: 'visible', cookie: 'XSRF-TOKEN=test', addEventListener() {}, removeEventListener() {} },
    window: {
      setInterval: (callback) => { interval = callback; return 1; }, clearInterval() {},
      setTimeout: () => 1, clearTimeout() {}, addEventListener() {}, removeEventListener() {},
    },
    crypto: { randomUUID: () => 'test-client' }, AbortController, Date,
    ...extra,
  });
  return { exports, start: () => effect(), tick: () => interval(), state: () => state };
}

test('unread polling preserves unchanged rows and updates counts and statuses', async () => {
  let payload = { inquiries: [{ id: 1, unread_count: 2, status: 'new' }, { id: 2, unread_count: 0 }] };
  const hook = loadHook('useInquiryUnreadPolling.ts', { fetchChatUnreadCounts: async () => payload });
  let inquiries = [{ id: 1, unread_count: 2, status: 'new' }, { id: 2, unread_count: 0, status: 'completed' }];
  hook.exports.default((update) => { inquiries = update(inquiries); }, '/counts');
  const cleanup = hook.start();
  const initial = inquiries;
  hook.tick();
  await new Promise(setImmediate);
  assert.equal(inquiries, initial);

  payload = { inquiries: [{ id: 1, unread_count: 3, status: 'in_progress' }, { id: 2, unread_count: 0 }] };
  hook.tick();
  await new Promise(setImmediate);
  assert.notEqual(inquiries, initial);
  assert.equal(inquiries[1], initial[1]);
  assert.equal(inquiries[0].unread_count, 3);
  assert.equal(inquiries[0].status, 'in_progress');

  payload = { inquiries: [] };
  hook.tick();
  await new Promise(setImmediate);
  assert.equal(inquiries[0].unread_count, 0);
  assert.equal(inquiries[0].status, 'in_progress');
  cleanup();
});

test('chat heartbeats preserve unchanged presence and still update typing and failures', async () => {
  let payload = { peer_present: false, peer_typing: false };
  let fail = false;
  const hook = loadHook('useInquiryChatActivity.ts', {
    fetch: async () => {
      if (fail) throw new Error('Offline');
      return { ok: true, json: async () => payload };
    },
  });
  hook.exports.useInquiryChatActivity('/chat');
  const initial = hook.state();
  const cleanup = hook.start();
  await new Promise(setImmediate);
  assert.equal(hook.state(), initial);

  payload = { peer_present: true, peer_typing: true };
  hook.tick();
  await new Promise(setImmediate);
  const typing = hook.state();
  assert.equal(typing.peer_present, true);
  assert.equal(typing.peer_typing, true);
  hook.tick();
  await new Promise(setImmediate);
  assert.equal(hook.state(), typing);

  payload = { peer_present: true, peer_typing: false };
  hook.tick();
  await new Promise(setImmediate);
  assert.equal(hook.state().peer_typing, false);
  const present = hook.state();
  fail = true;
  hook.tick();
  await new Promise(setImmediate);
  assert.equal(hook.state(), present);
  cleanup();
  await new Promise(setImmediate);
});
