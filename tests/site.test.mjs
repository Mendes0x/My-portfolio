import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

test('home page has proper metadata, current canonical and local assets', () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>Mendes0x — Developer & Builder<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/mendes0x\.github\.io\/My-portfolio\/">/);
  for (const file of ['style.css', 'script.js', 'favicon.svg']) {
    assert.ok(html.includes('./' + file));
    assert.ok(fs.existsSync(path.join(root, file)));
  }
  assert.doesNotMatch(html, /renegadothedev\.github\.io/);
  assert.doesNotMatch(html, /github\.com\/renegadothedev/i);
});
test('all repository links are updated to Mendes0x', () => {
  for (const project of ['web-site-dowloader-mp3','bot-framework-dashboard','vpn-tor','Network-Toolkit','youtube-downloader']) {
    assert.ok(html.includes('https://github.com/Mendes0x/' + project), project);
    assert.ok(readme.includes('https://github.com/Mendes0x/' + project), project);
  }
  assert.match(readme, /https:\/\/mendes0x\.github\.io\/My-portfolio\//);
});
test('project filters match exactly five project cards', () => {
  assert.equal((html.match(/data-category="web"/g)||[]).length,2);
  assert.equal((html.match(/data-category="tools"/g)||[]).length,3);
  for (const name of ['all','web','tools']) assert.ok(html.includes('data-filter="' + name + '"'));
  assert.match(js, /project\.hidden\s*=/);
  assert.match(css, /\[hidden\]\s*\{\s*display:none/);
});
test('all translated elements are represented in both dictionaries', () => {
  const keys = [...html.matchAll(/data-i18n="([a-z_0-9]+)"/g)].map(match=>match[1]);
  assert.ok(keys.length>=30);
  for (const key of new Set(keys)) {
    const matches = [...js.matchAll(new RegExp('(?:^|\\s|,)'+key+'\\s*:', 'gm'))];
    assert.ok(matches.length>=2, 'translation incomplete for ' + key);
  }
  assert.match(js, /document\.documentElement\.lang/);
});
test('supports accessible controls and reduced motion', () => {
  for (const id of ['main','primary-nav','menu-toggle','language-toggle','copy-email','copy-status','filter-status']) {
    assert.ok(html.includes('id="' + id + '"'), 'missing #' + id);
  }
  assert.match(html,/aria-expanded="false"/);
  assert.match(html,/aria-pressed="true"/);
  assert.match(html,/class="skip-link"/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(js, /eval\(/);
});
test('no remote javascript, tracking beacon or absolute asset paths', () => {
  assert.doesNotMatch(html, /<script[^>]+src="https?:/);
  assert.doesNotMatch(html, /google-analytics|gtag\(|facebook\.net|clarity\.ms/);
  assert.match(html, /href="\.\/style\.css"/);
  assert.match(html, /src="\.\/script\.js"/);
  assert.match(fs.readFileSync(path.join(root,'robots.txt'),'utf8'),/Sitemap: https:\/\/mendes0x\.github\.io/);
});

test('ultra-minimal design never includes profile photography or decorative images', () => {
  assert.doesNotMatch(html, /<img\\b/i);
  assert.doesNotMatch(html, /avatars\\.githubusercontent\\.com/i);
  assert.doesNotMatch(html, /hero-visual|portrait-frame|media-object|dash-shell/i);
  assert.doesNotMatch(css, /background-image\\s*:/i);
  assert.doesNotMatch(html, /<canvas\\b|<svg\\b/i);
  assert.match(css, /--bg:#f8f8f6/);
  assert.match(html, /data-i18n="hero_line1">Menos ruído\\./);
  assert.match(html, /data-i18n="hero_line2">Mais intenção\\./);
});

test('all portfolio projects are presented as keyboard-accessible links', () => {
  assert.equal((html.match(/class="project" data-category=/g)||[]).length, 5);
  assert.equal((html.match(/class="project-link"/g)||[]).length, 5);
  assert.equal((html.match(/class="project-arrow"/g)||[]).length, 5);
  for (const section of ['about','projects','skills','contact']) {
    assert.ok(html.includes('id="' + section + '"'));
  }
  assert.match(css, /:focus-visible/);
});
