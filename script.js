(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal content progressively; retain full visibility without JavaScript.
  const revealElements = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: '0px 0px 45px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  // Readable mobile navigation, usable by touch and keyboard.
  const menu = $('#mobile-nav');
  const menuButton = $('#menu-toggle');
  const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  };
  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menu.hidden = isOpen;
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    });
    $$('a', menu).forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  // Quick navigation with the familiar Ctrl+K / Cmd+K shortcut.
  const palette = $('#command-palette');
  const openPalette = () => {
    if (!palette || typeof palette.showModal !== 'function') return;
    closeMenu();
    if (!palette.open) palette.showModal();
  };
  $$('[data-command-open]').forEach((button) => button.addEventListener('click', openPalette));
  if (palette) {
    $$('[data-close-palette]').forEach((button) => button.addEventListener('click', () => palette.close()));
    $$('a', palette).forEach((link) => link.addEventListener('click', () => palette.close()));
    palette.addEventListener('click', (event) => {
      if (event.target === palette) palette.close();
    });
  }
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openPalette();
    }
    if (event.key === 'Escape') closeMenu();
  });

  // Project filters are button-controlled and remain accessible.
  const filterButtons = $$('[data-filter]');
  const projectCards = $$('.project-card[data-category]');
  const status = $('#filter-status');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('active', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    projectCards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.hidden = !match;
      if (match) count += 1;
    });
    if (status) status.textContent = count + (count === 1 ? ' projeto exibido.' : ' projetos exibidos.');
  }));

  // Clipboard is optional; e-mail remains available as a normal mailto link.
  const copyButton = $('#copy-email');
  const copyFeedback = $('#copy-feedback');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const email = copyButton.dataset.email;
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard indisponível');
        await navigator.clipboard.writeText(email);
        if (copyFeedback) copyFeedback.textContent = 'E-mail copiado para a área de transferência.';
      } catch {
        if (copyFeedback) copyFeedback.textContent = 'Copie o endereço: ' + email;
      }
    });
  }

  // One scroll listener, one animation frame: light work even on low-end PCs.
  const progress = $('#scroll-progress');
  let ticking = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();

  // Update year without recurring timers or external services.
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
