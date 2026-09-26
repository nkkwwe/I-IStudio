import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../../resources/js/legacy/legacyApp.js', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function pageFixture({ languages = true } = {}) {
  function element() {
    const target = new EventTarget();
    const classes = new Set();
    const attributes = new Map();
    return Object.assign(target, {
      dataset: {},
      classList: {
        add: value => classes.add(value),
        remove: value => classes.delete(value),
        toggle: value => classes.has(value) ? (classes.delete(value), false) : (classes.add(value), true),
        contains: value => classes.has(value),
      },
      setAttribute: (name, value) => attributes.set(name, value),
      getAttribute: name => attributes.get(name),
      removeAttribute: name => attributes.delete(name),
      querySelectorAll: () => [],
      querySelector: () => null,
      contains: node => node === target,
      focus: () => {},
    });
  }

  const theme = element();
  const trigger = element();
  const switcher = element();
  switcher.querySelector = selector => selector === '.language-trigger' ? trigger : null;
  switcher.contains = node => node === switcher || node === trigger;
  const header = Object.assign(element(), { offsetHeight: 72 });
  const link = element();
  link.setAttribute('href', '#hero');
  let measurements = 0;
  const section = { getBoundingClientRect: () => { measurements++; return { top: 0 }; } };
  const frames = new Map();
  const timers = new Map();
  let nextId = 0;
  const window = Object.assign(new EventTarget(), {
    scrollY: 100,
    innerHeight: 800,
    translations: { en: {} },
    location: { pathname: '/en', search: '', assign: () => {} },
    requestAnimationFrame: callback => { const id = ++nextId; frames.set(id, callback); return id; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const document = Object.assign(new EventTarget(), {
    documentElement: { lang: 'en', dataset: { theme: 'light' }, scrollHeight: 5000 },
    getElementById: id => id === 'themeToggle' ? theme : null,
    querySelector: selector => ({
      '.account-site-header': languages ? null : header,
      '.language-switcher': switcher,
      '.site-header': header,
      '#hero': section,
    })[selector] ?? null,
    querySelectorAll: selector => ({
      '.site-header:not(.account-site-header) .language-switcher': languages ? [switcher] : [],
      '.nav-menu .nav-link': [link],
    })[selector] ?? [],
  });
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, window, document, AbortController, URLSearchParams,
    localStorage: { getItem: () => null, setItem: () => {} },
    setTimeout: callback => { const id = ++nextId; timers.set(id, callback); return id; },
    clearTimeout: id => timers.delete(id),
    require: name => {
      if (name === '@inertiajs/react') return { router: {} };
      if (name === '../content/translations') return {};
      if (name === '../content/siteLanguage') return { getSiteLanguageFromDocument: () => 'en' };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { init: exports.initLegacyApp, window, document, theme, trigger, switcher, link, frames, timers, measurements: () => measurements };
}

test('revisiting a page does not duplicate theme, language or global event handlers', () => {
  const page = pageFixture();
  for (let visit = 0; visit < 4; visit++) {
    const cleanup = page.init();
    assert.equal(getEventListeners(page.window, 'scroll').length, 2);
    const previousTheme = page.document.documentElement.dataset.theme;
    page.theme.dispatchEvent(new Event('click'));
    assert.notEqual(page.document.documentElement.dataset.theme, previousTheme);
    page.trigger.dispatchEvent(new Event('click'));
    assert.equal(page.switcher.classList.contains('open'), true);
    cleanup();
    for (const type of ['scroll', 'resize', 'wheel', 'touchmove', 'keydown']) {
      assert.equal(getEventListeners(page.window, type).length, 0);
    }
    assert.equal(getEventListeners(page.document, 'keydown').length, 0);
    assert.equal(getEventListeners(page.theme, 'click').length, 0);
    assert.equal(getEventListeners(page.trigger, 'click').length, 0);
    assert.equal(page.window.setLanguage, undefined);
  }
});

test('scroll work is batched and pending frames and click timers are cleared on exit', () => {
  const page = pageFixture();
  const cleanup = page.init();
  const initialMeasurements = page.measurements();
  for (let scroll = 0; scroll < 5; scroll++) page.window.dispatchEvent(new Event('scroll'));
  assert.equal(page.frames.size, 1);
  assert.equal(page.measurements(), initialMeasurements);
  const [[frameId, callback]] = page.frames;
  page.frames.delete(frameId);
  callback();
  assert.equal(page.measurements(), initialMeasurements + 1);
  page.window.dispatchEvent(new Event('scroll'));
  page.link.dispatchEvent(new Event('click'));
  assert.equal(page.timers.size, 1);
  cleanup();
  assert.equal(page.frames.size, 0);
  assert.equal(page.timers.size, 0);
});

test('Escape also works on pages with a React language switcher', () => {
  const page = pageFixture({ languages: false });
  const cleanup = page.init();
  const escape = new Event('keydown');
  Object.defineProperty(escape, 'key', { value: 'Escape' });
  page.document.dispatchEvent(escape);
  cleanup();
});
