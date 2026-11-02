(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Content is visible without JavaScript. Motion is an enhancement.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    }, { threshold: .06, rootMargin: '0px 0px 50px 0px' });
    $$('.reveal').forEach(el => observer.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  const menuButton = $('#menu-button');
  const nav = $('#main-nav');
  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const palette = $('#palette');
  function openPalette() {
    if (!palette || typeof palette.showModal !== 'function') return;
    closeMenu();
    if (!palette.open) palette.showModal();
  }
  $('#open-search')?.addEventListener('click', openPalette);
  $('#close-palette')?.addEventListener('click', () => palette?.close());
  if (palette) {
    $$('a', palette).forEach(link => link.addEventListener('click', () => palette.close()));
    palette.addEventListener('click', e => { if (e.target === palette) palette.close(); });
  }
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape') closeMenu();
  });

  const filters = $$('[data-filter]');
  const projects = $$('.work-item[data-category]');
  const filterStatus = $('#filter-status');
  for (const button of filters) {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let count = 0;
      for (const item of filters) {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      }
      for (const project of projects) {
        const matches = category === 'all' || category === project.dataset.category;
        project.hidden = !matches;
        if (matches) count += 1;
      }
      if (filterStatus) filterStatus.textContent = count + (count === 1 ? ' projeto exibido.' : ' projetos exibidos.');
    });
  }

  const copyButton = $('#copy-email');
  const copyStatus = $('#copy-status');
  copyButton?.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(copyButton.dataset.email);
      if (copyStatus) copyStatus.textContent = 'E-mail copiado ✓';
    } catch {
      if (copyStatus) copyStatus.textContent = 'Copie este endereço: ' + copyButton.dataset.email;
    }
  });

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
