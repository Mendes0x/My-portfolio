import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

function makeHarness() {
  const TEXT_NODE = 3;
  function element(opts = {}) {
    const attributes = { ...opts.attrs };
    const classes = new Set(opts.classes || []);
    const listeners = {};
    const el = {
      dataset: opts.dataset || {},
      hidden: false,
      childNodes: [{ nodeType: TEXT_NODE, textContent: opts.text || 'initial' }],
      textContent: opts.text || '',
      content: '',
      href: opts.href || '',
      style: {},
      attributes,
      listeners,
      classList: {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        contains: name => classes.has(name),
        toggle: (name, force) => {
          if (force === true || (force === undefined && !classes.has(name))) classes.add(name);
          else classes.delete(name);
        }
      },
      setAttribute(key, value) { attributes[key] = String(value); },
      getAttribute(key) { return attributes[key] ?? null; },
      addEventListener(key, listener) { (listeners[key] ??= []).push(listener); },
      trigger(key, event = {}) { return Promise.all((listeners[key] || []).map(cb => cb(event))); },
      prepend(node) { this.childNodes.unshift(node); },
      contains(target) { return target === this; }
    };
    return el;
  }

  const ids = new Map();
  for (const id of ['language-toggle','menu-toggle','primary-nav','copy-email','copy-status','filter-status','year']) {
    ids.set(id, element({ text: id, attrs: id === 'menu-toggle' ? { 'aria-expanded':'false' } : {} }));
  }
  ids.get('copy-email').dataset.email = 'renegadothedev001@gmail.com';

  const local = { value: 'pt' };
  const stores = new Map([['mendes0x-portfolio-language', local.value]]);
  const nav = ids.get('primary-nav');
  const group = element({ attrs: { 'aria-label':'Filtrar projetos' } });
  const meta = element();
  const ogLocale = element();
  const translated = [...html.matchAll(/data-i18n="([a-z_0-9]+)"/g)]
    .map(match => element({ dataset: { i18n:match[1] }, text:match[1] }));
  const buttons = ['all','web','tools'].map(name => element({
    dataset: { filter:name },
    attrs: { 'aria-pressed':name === 'all' ? 'true' : 'false' },
    classes: name === 'all' ? ['active'] : []
  }));
  const projectEls = ['web','web','tools','tools','tools']
    .map(type => element({ dataset:{ category:type } }));
  const links = Array.from({length:4}, () => element());
  const documentEvents = {}, windowEvents = {};
  let copied = null;
  const document = {
    documentElement: { lang:'pt-BR' },
    title:'Mendes0x',
    querySelector(selector) {
      if (selector.startsWith('#')) return ids.get(selector.slice(1)) || null;
      if (selector === '.filter-row') return group;
      if (selector === 'meta[name="description"]') return meta;
      if (selector === 'meta[property="og:locale"]') return ogLocale;
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '[data-i18n]') return translated;
      if (selector === '.filter[data-filter]') return buttons;
      if (selector === '.project[data-category], .mini-project[data-category]') return projectEls;
      if (selector === '#primary-nav a') return links;
      return [];
    },
    createTextNode(value) { return {nodeType:TEXT_NODE,textContent:value}; },
    addEventListener(type, fn) { (documentEvents[type] ??= []).push(fn); }
  };
  const window = {
    innerWidth:375,
    addEventListener(type, fn) { (windowEvents[type] ??= []).push(fn); },
    trigger(type, event = {}) { (windowEvents[type] || []).forEach(fn => fn(event)); }
  };
  const navigator = { clipboard:{ async writeText(value) { copied = value; } } };
  const localStorage = {
    getItem(key) { return stores.get(key) || null; },
    setItem(key, val) { stores.set(key,val); }
  };
  const sandbox = {document,window,navigator,localStorage,Node:{TEXT_NODE},Date,console};
  vm.runInNewContext(js, sandbox, {timeout:2000,filename:'script.js'});
  return { ids,translated,buttons,projectEls,document,window,nav,group,meta,ogLocale,stores,links,documentEvents, getCopied:()=>copied };
}

test('language switch translates the interface and its accessible labels without replacing markup', async () => {
  const h = makeHarness();
  assert.equal(h.document.documentElement.lang,'pt-BR');
  assert.equal(h.group.getAttribute('aria-label'),'Filtrar projetos');
  const btn = h.ids.get('language-toggle');
  const beforeNodes = btn.childNodes.length;
  await btn.trigger('click');
  assert.equal(h.document.documentElement.lang,'en');
  assert.equal(h.document.title,'Mendes0x — Developer');
  assert.equal(h.group.getAttribute('aria-label'),'Filter projects');
  assert.equal(h.nav.getAttribute('aria-label'),'Primary navigation');
  assert.equal(h.ogLocale.content,'en_US');
  assert.equal(btn.childNodes.length,beforeNodes);
  assert.equal(btn.childNodes[0].textContent,'PT ');
  assert.equal(h.stores.get('mendes0x-portfolio-language'),'en');
  assert.ok(h.translated.some(e=>e.dataset.i18n==='hero_line1' && e.childNodes[0].textContent==='Less noise.'));
  await btn.trigger('click');
  assert.equal(h.document.documentElement.lang,'pt-BR');
  assert.equal(btn.childNodes[0].textContent,'EN ');
  assert.ok(h.translated.some(e=>e.dataset.i18n==='hero_line1' && e.childNodes[0].textContent==='Menos ruído.'));
});

test('filters show the correct project sets and announce updated counts', async () => {
  const h = makeHarness();
  assert.equal(h.projectEls.filter(x=>!x.hidden).length,5);
  await h.buttons[1].trigger('click');
  assert.equal(h.projectEls.filter(x=>!x.hidden).length,2);
  assert.equal(h.buttons[1].getAttribute('aria-pressed'),'true');
  assert.equal(h.buttons[0].getAttribute('aria-pressed'),'false');
  assert.equal(h.ids.get('filter-status').textContent,'2 projetos exibidos.');
  await h.buttons[2].trigger('click');
  assert.equal(h.projectEls.filter(x=>!x.hidden).length,3);
  await h.buttons[0].trigger('click');
  assert.equal(h.projectEls.filter(x=>!x.hidden).length,5);
});

test('mobile menu closes on Escape, hash navigation, and nav link clicks', async () => {
  const h = makeHarness();
  const menu = h.ids.get('menu-toggle');
  await menu.trigger('click');
  assert.equal(menu.getAttribute('aria-expanded'),'true');
  assert.equal(h.nav.classList.contains('open'),true);
  h.window.trigger('hashchange');
  assert.equal(menu.getAttribute('aria-expanded'),'false');
  await menu.trigger('click');
  for (const fn of h.documentEvents['keydown'] || []) fn({key:'Escape'});
  assert.equal(menu.getAttribute('aria-expanded'),'false');
  await menu.trigger('click');
  await h.links[0].trigger('click');
  assert.equal(menu.getAttribute('aria-expanded'),'false');
});

test('copy email button uses clipboard and project layout supports small screens', async () => {
  const h = makeHarness();
  await h.ids.get('copy-email').trigger('click');
  assert.equal(h.getCopied(),'renegadothedev001@gmail.com');
  assert.match(h.ids.get('copy-status').textContent,/copiado/);
  assert.match(css,/@media\(max-width:370px\)/);
  assert.match(css,/overflow-wrap:anywhere/);
  assert.doesNotMatch(html,/<img\b/i);
});
