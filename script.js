(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const KEY = 'mendes0x-portfolio-language';
  const strings = {
    pt: {
      skip:'Ir para o conteúdo',
      nav_about:'Sobre',nav_projects:'Projetos',nav_skills:'Stack',nav_contact:'Contato',
      say_hello:'Vamos conversar ',
      hero_eyebrow:'DESENVOLVEDOR INDEPENDENTE · BRASIL',
      hero_line1:'Menos ruído.',hero_line2:'Mais intenção.',
      hero_description:'Sou Mendes0x. Transformo ideias em sites, bots e ferramentas que unem funcionalidade, simplicidade e personalidade.',
      view_projects:'Ver projetos',hero_footer:'CRIANDO, APRENDENDO E MELHORANDO SEMPRE',
      about_label:'UM POUCO SOBRE MIM',about_heading1:'Curiosidade',about_heading2:'que constrói.',
      about_lead:'A melhor maneira de aprender algo é transformar a ideia em um projeto real.',
      about_paragraph1:'Gosto de criar aplicações web, ferramentas de automação e bots para Discord. Entre interfaces e terminais Linux, busco soluções que sejam úteis, claras e fáceis de usar.',
      about_paragraph2:'Meu processo é simples: experimentar, construir, testar e melhorar. Cada projeto é uma oportunidade de descobrir algo novo.',
      all_repos:'Explorar meus repositórios',
      work_label:'PROJETOS SELECIONADOS',work_heading1:'Feito para',work_heading2:'ser usado.',
      work_intro:'Uma seleção de projetos públicos. Cada um nasceu de uma ideia, de um desafio ou da vontade de fazer algo funcionar melhor.',
      filter_label:'FILTRAR POR',filter_all:'Todos',filter_web:'Web',filter_tools:'Ferramentas',
      project_media:'Uma aplicação local para gerenciar downloads de mídia com fila de tarefas, progresso em tempo real e biblioteca de arquivos.',
      project_bot:'Dashboard para bots do Discord com status, informações de execução, comandos e gerenciamento de módulos.',
      view_repository:'Ver repositório',
      more_projects:'Também no meu GitHub',
      project_vpn:'Controle e diagnóstico de conexões OpenVPN e NetworkManager no Linux.',
      project_network:'Utilitários para diagnóstico, rastreamento de rotas e análise de rede.',
      project_youtube:'Ferramenta em Bash para baixar mídia autorizada com opções de formato.',
      see_everything:'Explorar todos os projetos',
      skills_label:'MINHAS FERRAMENTAS',skills_heading1:'Sempre',skills_heading2:'aprendendo.',
      skills_note:'Tecnologias com as quais trabalho, estudo e experimento. Sem promessas exageradas, só evolução.',
      contact_top:'TEM UMA IDEIA?',contact_eyebrow:'O PRÓXIMO PROJETO COMEÇA COM UMA CONVERSA.',
      contact_heading1:'Vamos criar',contact_heading2:'algo juntos?',
      contact_description:'Se quiser conversar sobre desenvolvimento, projetos ou alguma ideia, pode me chamar. Estou sempre aberto a boas conversas.',
      copy_email:'Copiar e-mail',back_to_top:'Voltar ao topo',
      menu_open:'Abrir menu',menu_close:'Fechar menu',copied:'E-mail copiado ✓',copy_fail:'Copie: ',
      filter_result:(count) => count === 1 ? '1 projeto exibido.' : count + ' projetos exibidos.'
    },
    en: {
      skip:'Skip to content',
      nav_about:'About',nav_projects:'Projects',nav_skills:'Stack',nav_contact:'Contact',
      say_hello:"Let's talk ",
      hero_eyebrow:'INDEPENDENT DEVELOPER · BRAZIL',
      hero_line1:'Less noise.',hero_line2:'More meaning.',
      hero_description:"I'm Mendes0x. I turn ideas into websites, bots, and tools that combine function, simplicity, and personality.",
      view_projects:'Explore projects',hero_footer:'BUILDING, LEARNING, AND GETTING BETTER',
      about_label:'A LITTLE ABOUT ME',about_heading1:'Curiosity',about_heading2:'that creates.',
      about_lead:'The best way to learn something is to turn an idea into a real project.',
      about_paragraph1:'I enjoy building web applications, automation tools, and Discord bots. From interfaces to Linux terminals, I focus on solutions that are useful, clear, and easy to use.',
      about_paragraph2:'My process is simple: experiment, build, test, and refine. Every project is a chance to discover something new.',
      all_repos:'Explore my repositories',
      work_label:'SELECTED PROJECTS',work_heading1:'Made to',work_heading2:'be used.',
      work_intro:'A collection of public projects. Each started as an idea, a challenge, or a chance to make something work a little better.',
      filter_label:'FILTER BY',filter_all:'All',filter_web:'Web',filter_tools:'Tools',
      project_media:'A local media download manager with a job queue, real-time progress, and a dedicated file library.',
      project_bot:'A dashboard for Discord bots featuring status, runtime information, commands, and module management.',
      view_repository:'View repository',
      more_projects:'Also on my GitHub',
      project_vpn:'Tools for controlling and diagnosing OpenVPN and NetworkManager connections on Linux.',
      project_network:'Utilities for diagnostics, route tracing, and network analysis.',
      project_youtube:'A Bash utility for downloading media you are authorized to save, with format options.',
      see_everything:'Explore all projects',
      skills_label:'MY TOOLBOX',skills_heading1:'Always',skills_heading2:'learning.',
      skills_note:'Technologies I work with, study, and explore. No exaggerated claims, just continuous learning.',
      contact_top:'HAVE AN IDEA?',contact_eyebrow:'THE NEXT PROJECT BEGINS WITH A CONVERSATION.',
      contact_heading1:"Let's make",contact_heading2:'something together.',
      contact_description:'Want to talk about development, projects, or an idea? Feel free to reach out. I am always open to a thoughtful conversation.',
      copy_email:'Copy email',back_to_top:'Back to top',
      menu_open:'Open menu',menu_close:'Close menu',copied:'Email copied ✓',copy_fail:'Copy this: ',
      filter_result:(count) => count === 1 ? '1 project visible.' : count + ' projects visible.'
    }
  };

  let language = 'pt';
  try { language = localStorage.getItem(KEY) === 'en' ? 'en' : 'pt'; } catch {}
  const languageToggle = $('#language-toggle');
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'pt';
    const dict = strings[language];
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    for (const element of $$('[data-i18n]')) {
      const text = dict[element.dataset.i18n];
      if (typeof text !== 'string') continue;
      // Preserve nested decorative arrow elements and their aria-hidden attributes.
      const first = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
      if (first) first.textContent = text;
      else element.prepend(document.createTextNode(text));
    }
    // Keep the button's icon node; replacing innerHTML would recreate it on every switch.
    const langText = language === 'pt' ? 'EN' : 'PT';
    const langNode = [...languageToggle.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
    if (langNode) langNode.textContent = langText + ' ';
    else languageToggle.prepend(document.createTextNode(langText + ' '));
    languageToggle.setAttribute('aria-label', language === 'pt' ? 'Switch language to English' : 'Mudar idioma para português');

    const nav = $('#primary-nav');
    const filterGroup = $('.filter-row');
    if (nav) nav.setAttribute('aria-label', language === 'pt' ? 'Navegação principal' : 'Primary navigation');
    if (filterGroup) filterGroup.setAttribute('aria-label', language === 'pt' ? 'Filtrar projetos' : 'Filter projects');
    const menuToggle = $('#menu-toggle');
    if (menuToggle) {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', open ? dict.menu_close : dict.menu_open);
    }
    document.title = language === 'pt' ? 'Mendes0x — Desenvolvedor' : 'Mendes0x — Developer';
    const ogLocale = $('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = language === 'pt' ? 'pt_BR' : 'en_US';
    const description = $('meta[name="description"]');
    if (description) {
      description.content = language === 'pt'
        ? 'Mendes0x — desenvolvedor brasileiro. Projetos web, automação, bots, Linux e software feito com intenção.'
        : 'Mendes0x — Brazilian developer creating thoughtful web experiences, automation, bots and Linux tools.';
    }
    updateFilterStatus();
    try { localStorage.setItem(KEY, language); } catch {}
  }
  languageToggle.addEventListener('click', () => setLanguage(language === 'pt' ? 'en' : 'pt'));

  const menu = $('#primary-nav');
  const menuButton = $('#menu-toggle');
  function closeMenu() {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', strings[language].menu_open);
  }
  menuButton?.addEventListener('click', () => {
    const next = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('open', next);
    menuButton.setAttribute('aria-expanded', String(next));
    menuButton.setAttribute('aria-label', next ? strings[language].menu_close : strings[language].menu_open);
  });
  $('#primary-nav a').forEach(link => link.addEventListener('click', closeMenu));
  // Also close an open mobile menu after anchor changes from outside the nav.
  window.addEventListener('hashchange', closeMenu);
  document.addEventListener('click', event => {
    if (menu && menuButton && !menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });

  const filters = $$('.filter[data-filter]');
  const projects = $$('.project[data-category], .mini-project[data-category]');
  const filterStatus = $('#filter-status');
  function updateFilterStatus() {
    if (!filterStatus) return;
    const count = projects.filter(project => !project.hidden).length;
    filterStatus.textContent = strings[language].filter_result(count);
  }
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(project => {
      project.hidden = selected !== 'all' && project.dataset.category !== selected;
    });
    // Hide headings for secondary projects when only web projects are shown.
    const secondaryHeading = $('.more-heading');
    if (secondaryHeading) secondaryHeading.hidden = !projects.some(project => project.classList.contains('mini-project') && !project.hidden);
    updateFilterStatus();
  }));

  const copyButton = $('#copy-email');
  const copyStatus = $('#copy-status');
  copyButton?.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = strings[language].copied;
    } catch {
      copyStatus.textContent = strings[language].copy_fail + email;
    }
  });
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  setLanguage(language);
})();
