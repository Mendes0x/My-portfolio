(() => {
  'use strict';
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Progressive enhancement: content is visible by default without scripts.
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observed = $$('.reveal');
    const observer = new IntersectionObserver((entries, instance) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    }, {threshold: 0.04, rootMargin: '0px 0px 60px 0px'});
    observed.forEach(el => observer.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  const menuButton = $('#menu-button');
  const nav = $('#main-nav');
  function closeMenu() {
    if (!nav || !menuButton) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Abrir menu');
  }
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('a',nav).forEach(a => a.addEventListener('click',closeMenu));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
    });
    window.addEventListener('resize', () => {if (innerWidth > 960) closeMenu();});
  }

  const palette = $('#palette');
  const openPalette = () => {
    if (!palette || typeof palette.showModal !== 'function') return;
    closeMenu();
    if (!palette.open) palette.showModal();
  };
  $('#open-search')?.addEventListener('click', openPalette);
  $('#close-palette')?.addEventListener('click', () => palette?.close());
  if (palette) {
    $$('a',palette).forEach(link => link.addEventListener('click',() => palette.close()));
    palette.addEventListener('click',e => {if(e.target === palette) palette.close();});
  }
  document.addEventListener('keydown',e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape') closeMenu();
  });

  const filters = $$('[data-filter]');
  const projects = $$('.project[data-category]');
  const status = $('#filter-status');
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    let shown = 0;
    projects.forEach(project => {
      const matches = category === 'all' || project.dataset.category === category;
      project.hidden = !matches;
      if (matches) shown++;
    });
    if (status) status.textContent = shown + (shown === 1 ? ' projeto exibido.' : ' projetos exibidos.');
  }));

  const copyButton = $('#copy-email');
  const copyStatus = $('#copy-status');
  copyButton?.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw Error('clipboard unavailable');
      await navigator.clipboard.writeText(copyButton.dataset.email);
      if (copyStatus) copyStatus.textContent = 'E-MAIL COPIADO ✓';
    } catch {
      if (copyStatus) copyStatus.textContent = 'E-MAIL: ' + copyButton.dataset.email;
    }
  });

  const progress = $('#progress');
  let scheduled = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    scheduled = false;
  };
  addEventListener('scroll',() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateProgress);
  },{passive:true});
  updateProgress();
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
