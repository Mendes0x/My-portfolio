# Renegado — Personal Portfolio

Uma experiência pessoal com visual dark/editorial, inspiração alternativa e foco em projetos reais.

## Sobre

Portfólio estático de Renegado (@renegadothedev), construído com HTML, CSS e JavaScript puro. A página apresenta cinco repositórios reais: Bot Framework Dashboard, VPN Manager, Network Toolkit, YouTube Downloader e Web Site Downloader MP3.

## Recursos

- Visual dark/goth com tipografia editorial, órbitas e ilustrações feitas em CSS.
- Layout responsivo para desktop, tablet e celular; menu móvel acessível.
- Projetos com filtros funcionais e links diretos para o código no GitHub.
- Navegação rápida por Ctrl+K (ou Cmd+K), incluindo fechamento por Esc.
- Atalho para copiar e-mail, com alternativa visível quando Clipboard API não está disponível.
- Microinterações, progresso de leitura e revelação de conteúdo no scroll.
- Respeito à preferência de movimento reduzido e foco visível para navegação por teclado.
- Sem framework, sem build e sem API externa obrigatória para carregar os projetos.
- Metadados básicos para SEO, compartilhamento e favicon SVG.

## Como executar

Clone o repositório e abra o arquivo index.html no navegador. Para usar com servidor local:

    python -m http.server 8000

Depois acesse http://localhost:8000.

## Arquivos

- index.html — estrutura semântica, textos, links e metadados.
- style.css — identidade visual, responsividade e efeitos.
- script.js — navegação, filtros, modal, clipboard, animação e progresso.
- favicon.svg — ícone vetorial do projeto.

## Editando

Textos e projetos ficam diretamente em index.html. Para adicionar um projeto, duplique um article.project-card dentro de .projects-grid, ajuste a categoria em data-category e atualize a contagem de cada filtro no HTML. O endereço de e-mail aparece nos links mailto e no atributo data-email do botão de cópia.

Os mockups nos cards são ilustrações conceituais, não métricas em tempo real.

## Publicação

O site é estático e compatível com GitHub Pages. Se o Pages estiver configurado para publicar a raiz da branch main, as atualizações aparecem após o deploy da plataforma.

## Acessibilidade

A página usa landmarks semânticos, botão com aria-expanded no menu, filtros com aria-pressed, atualização com aria-live e suporte a prefers-reduced-motion. O site continua navegável mesmo sem JavaScript (exceto recursos opcionais interativos).

## Autor

Renegado — https://github.com/renegadothedev

Contato: joaovitorbds752@gmail.com
