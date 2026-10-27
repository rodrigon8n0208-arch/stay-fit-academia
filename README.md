# Stay Fit Academia — site

Site one-page da Stay Fit Academia (unidades Alegria, em Satuba, e Graciliano, em Maceió - AL), feito
com **Astro**, **GSAP** (ScrollTrigger + SplitText) e **Lenis**. Construído a partir da base do site
da Princesa Fitness, com a identidade preto + amarelo da Stay Fit. Identidade visual em
[BRAND.md](BRAND.md); o que falta confirmar com a academia está em [PENDENCIAS.md](PENDENCIAS.md).

## Rodar localmente

Requer Node.js 22.12 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera o site estático em dist/
npm run preview    # serve o dist/ localmente
npm run check      # checagem de tipos
```

## Onde mudar cada coisa

| O quê | Onde |
|---|---|
| Unidades, endereços, telefones, planos, preços, modalidades, FAQ | `src/data/site.ts` |
| Links de matrícula online e área do aluno | `SITE.enrollUrl` / `SITE.studentPanelUrl` em `src/data/site.ts` |
| Cores, fontes, botões, seletor de unidade | `src/styles/global.css` |
| Cada seção da página | `src/components/sections/*.astro` |
| Header, rodapé, preloader, WhatsApp flutuante, cursor | `src/components/global/` |
| Animações (GSAP) | `src/scripts/motion/` |
| Comportamentos (menu, lightbox, FAQ, seletor de unidade) | `src/scripts/ui/` |
| SEO (title, description, Open Graph, JSON-LD das duas unidades) | `src/layouts/Base.astro` |
| Domínio do site (canonical, sitemap) | variável `SITE_URL` ou `astro.config.mjs` |

### Trocar as imagens

Cada imagem tem um nome fixo (um "slot"). Salve o arquivo em `src/assets/img/site/` com esse nome:

1. `npm run otimizar` — converte para WebP (máx. 2400 px) e move os originais pesados para
   `source-assets/imagens-originais/` (fora do site e do git). Recusa arquivos corrompidos.
2. `npm run build` (ou deixe o `npm run dev` aberto).
3. Se trocou a `hero`: `npm run og` para refazer a imagem de compartilhamento.

- Nomes, tamanhos e situação de cada imagem: `src/assets/img/site/LEIA-ME.md`
- Prompts prontos para gerar cada imagem: [PROMPTS-IMAGENS.md](PROMPTS-IMAGENS.md)
- Modalidade sem imagem mostra um card gráfico amarelo automaticamente.
- As miniaturas da seção do Instagram são capas de reels reais (`src/assets/img/feed-*.jpg`).

### Logo

`public/images/brand/logo-stay-fit.svg` (e a versão `-dark`) é uma vetorização feita a partir do
logo 3D do site atual da academia **[VALIDAR LOGO VETORIZADO]**. Os traçados usados nos componentes
ficam em `src/data/logo-paths.ts` (`light` = "Stay" e "academia", `symbol` = boneco, `word` = "fit" +
traço). Ao receber o arquivo original, troque esses três paths.

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório (a Vercel detecta o Astro).
3. Em **Settings → Environment Variables**, crie `SITE_URL` com o domínio final.
4. Em **Settings → Domains**, conecte o domínio.

## Acessibilidade e movimento

- Com "reduzir movimento" ativado no sistema, o site desliga preloader, scroll suave, pin,
  parallax, marquee e entradas animadas.
- Sem JavaScript, todo o conteúdo aparece (as duas unidades ficam visíveis, uma embaixo da outra).
- Navegação por teclado com foco visível, menu mobile com foco preso e Esc para fechar.

## Resultados de teste (27/10/2026, build local)

- Sem rolagem horizontal em 360, 390, 768, 1280 e 1440 px.
- Lighthouse desktop: Performance 96–98 · Acessibilidade 100 · Boas práticas 100 · SEO 100.
- Lighthouse mobile: Performance 88–89 (variação desta máquina) · Acessibilidade 100 ·
  Boas práticas 100 · SEO 100.
