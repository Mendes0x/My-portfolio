# 🦇 Renegado — Building in the Dark

Portfólio pessoal com estética **alternative / goth / brutalist editorial**, criado especialmente para combinar com a identidade do perfil [@renegadothedev](https://github.com/renegadothedev).

**Site:** https://renegadothedev.github.io/My-portfolio/

## Conceito visual

Identidade construída a partir das cores e do tom do README de perfil:
- `#0D0A10` — preto profundo
- `#8B1E3F` — vinho
- `#C52B35` — vermelho intenso associado à imagem do perfil
- `#B57EDC` — roxo de contraste

O layout utiliza tipografia impactante, composição inspirada em zines/editorial e a foto de perfil pública do GitHub como elemento central, em vez de cartões genéricos de dashboard.

## Projetos exibidos

1. [Bot Framework Dashboard](https://github.com/renegadothedev/bot-framework-dashboard)
2. [VPN Manager](https://github.com/renegadothedev/vpn-tor)
3. [Network Toolkit](https://github.com/renegadothedev/Network-Toolkit)
4. [YouTube Downloader](https://github.com/renegadothedev/youtube-downloader)
5. [Web Site Downloader MP3](https://github.com/renegadothedev/web-site-dowloader-mp3)

As descrições correspondem ao material disponível publicamente nos respectivos repositórios. A ilustração de dashboard é conceitual, sem dados em tempo real.

## Recursos

- HTML semântico, CSS autoral, JavaScript puro; **sem build, sem framework obrigatório**
- Estilo editorial de alto contraste, tipografia grande, preto/vinho/vermelho e detalhes roxos
- Identidade e avatar do GitHub no destaque inicial
- Layout responsivo para celular, tablet e desktop
- Filtros reais por categoria (Web / Ferramentas)
- Menu móvel, navegação rápida com Ctrl+K / Cmd+K e modal nativo
- Copiar e-mail (com mensagem de fallback para navegadores sem Clipboard API)
- Barra de progresso e animações sutis com respeito a `prefers-reduced-motion`
- Links acessíveis, indicação de foco e conteúdo visível mesmo sem JavaScript
- Metadados básicos de SEO e compartilhamento; favicon próprio em SVG

## Executar localmente

Abra o arquivo `index.html` diretamente no navegador ou execute:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Estrutura

```text
index.html  — conteúdo e estrutura da página
style.css   — layout editorial e versões responsivas
script.js   — navegação, filtros, acessibilidade e interações
favicon.svg — marca vetorial
README.md   — documentação
```

## Editar

Projetos e textos estão em `index.html`. Ao adicionar/remover projetos, altere as contagens indicadas nos botões de filtro. As categorias são definidas por `data-category="web"` ou `data-category="tools"`.

O contato profissional usa o endereço divulgado no perfil GitHub: `renegadothedev001@gmail.com`.

## Créditos de direção criativa

Composição **original** inspirada em padrões de portfólios editoriais, brutalistas e experimentais. Referências de pesquisa: [Killian Herzer](https://killianherzer.com/), [Serhii Churilov no Awwwards](https://www.awwwards.com/inspiration/about-page-serhii-churilov), [Henry Codes](https://henry.codes/). Não há código, assets ou layouts copiados desses sites.

## Publicação

Compatível com GitHub Pages servindo a raiz da branch `main`. Publicação depende das configurações de Pages do repositório.

— **Renegado** / [GitHub](https://github.com/renegadothedev)
