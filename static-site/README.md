# VIP ACCESS — Site Estático (HTML/CSS/JS puro)

Projeto 100% estático, sem dependências, sem build. Basta abrir `index.html` em qualquer navegador moderno ou hospedar em qualquer serviço (Vercel, Netlify, GitHub Pages, hospedagem cPanel, etc).

## Estrutura

```
static-site/
├── index.html      → Página inicial (hero + CTA → oferta.html)
├── oferta.html     → Página de venda completa
├── style.css       → Todos os estilos
├── script.js       → Contador online, countdown, sticky CTA, checkout
└── img/            → Imagens (hero + prévias)
```

## Como editar

| O que alterar         | Onde                                                                 |
|-----------------------|----------------------------------------------------------------------|
| Textos da home        | `index.html` — procure os comentários `<!-- HEADLINE -->`, `<!-- SUBTEXTO -->` |
| Preço                 | `oferta.html` — bloco `<div class="price">`                          |
| Link de checkout      | `script.js` — constante `CHECKOUT_URL`                               |
| Imagem principal      | Substituir `img/hero.jpg`                                            |
| Prévias da galeria    | Substituir `img/preview-1.jpg` ... `preview-6.jpg`                   |
| Benefícios            | `oferta.html` — seção `.benefits__grid`                              |
| Depoimentos           | `oferta.html` — seção `.testimonials__grid`                          |
| FAQ                   | `oferta.html` — seção `.faq__list`                                   |
| Cores neon            | `style.css` — buscar por `#a855f7` e `#ec4899`                       |

## Publicar

- **Vercel/Netlify:** arraste a pasta ou conecte o repositório.
- **GitHub Pages:** commit os arquivos e ative Pages na branch.
- **Hospedagem tradicional:** faça upload via FTP para `public_html/`.

Nenhum comando `npm install` é necessário.
