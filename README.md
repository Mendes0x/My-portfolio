# Renegado — Building in the Dark

Portfólio minimalista do desenvolvedor **Renegado**, inspirado no próprio perfil GitHub e na estética alternativa / dark / editorial.

**Live:** https://renegadothedev.github.io/My-portfolio/

## Identidade

A reformulação parte da identidade do perfil: preto profundo, vermelho e vinho da imagem de perfil, detalhes sutis em roxo e letras expressivas. O site opta por espaço negativo, hierarquia e conteúdo, evitando dashboards decorativos e excesso de animações.

- **Preto:** `#0D0A10`
- **Vinho:** `#8B1E3F`
- **Vermelho:** `#C43743`
- **Roxo:** `#B57EDC`
- **Tipografia:** DM Sans, Instrument Serif, DM Mono

## O que contém

- Hero editorial com foto de perfil atual do GitHub
- Sobre / Selected Work / Stack / Contato
- Cinco repositórios públicos reais com links de código
- Filtros para projetos Web e Ferramentas
- Menu responsivo, navegação rápida Ctrl+K / Cmd+K
- Copiar e-mail com alternativa quando a API de Clipboard está indisponível
- Conteúdo acessível com navegação por teclado, HTML semântico e suporte a redução de movimento
- HTML, CSS e JavaScript puros; sem framework e sem build

## Projetos

1. [Bot Framework Dashboard](https://github.com/renegadothedev/bot-framework-dashboard)
2. [VPN Manager](https://github.com/renegadothedev/vpn-tor)
3. [Network Toolkit](https://github.com/renegadothedev/Network-Toolkit)
4. [YouTube Downloader](https://github.com/renegadothedev/youtube-downloader)
5. [Media Downloader](https://github.com/renegadothedev/web-site-dowloader-mp3)

A prévia gráfica do Dashboard é uma ilustração conceitual, e não dados de funcionamento em tempo real.

## Começar

Basta abrir `index.html` no navegador ou iniciar um servidor local:

```bash
python -m http.server 8000
```

Acesse http://localhost:8000.

## Arquivos

- `index.html` — estrutura semântica, seções, SEO e links
- `style.css` — identidade visual, responsividade, efeitos
- `script.js` — filtros, menu, modal e e-mail
- `favicon.svg` — ícone do projeto

## Personalização

Edite o conteúdo diretamente no `index.html`. Projetos usam `data-category="web"` ou `data-category="tools"`; se adicionar itens, atualize as contagens de filtros. O contato profissional corresponde ao que está no perfil GitHub: `renegadothedev001@gmail.com`.

## Publicação

Compatível com GitHub Pages servindo a raiz da branch `main`. A publicação efetiva depende das configurações do Pages.

© Renegado · Building in the Dark.
