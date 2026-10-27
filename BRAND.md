# BRAND.md — Stay Fit Academia

> Levantamento de 27/10/2026: perfil público [@stay_fit_academia](https://www.instagram.com/stay_fit_academia/)
> (bio, reels recentes e legendas) e sistema de matrícula deles (stayfitacademia.sitesca.com).

## Dados confirmados

| Item | Valor | Fonte |
|---|---|---|
| Nome | Stay Fit Academia | bio |
| Lema | "Um estilo de vida" | bio |
| Unidade Alegria | Cond. Recanto da Alegria, Rua G, 242 — Nova Satuba, Satuba-AL, 57120-000 · (82) 98859-4034 | sistema de matrícula |
| Unidade Graciliano | Rua Jeanette Carigé Pereira Lima, s/n — Graciliano Ramos (Cidade Universitária), Maceió-AL, 57073-197 · (82) 99632-9374 | sistema de matrícula |
| E-mail | academiastay.fit222@gmail.com | sistema de matrícula |
| WhatsApp da bio | +55 82 98859-4034 (Alegria / "Nova Satuba") | bio |
| Matrícula online e área do aluno | stayfitacademia.sitesca.com/matricular e /painel/login | bio |
| Modalidades | Musculação, FitDance, Boxe, Muay Thai, GAP, Funcional (as duas) + Jump, Step, Ritbox (Graciliano) | planos |
| Planos e preços | ver `src/data/site.ts` (valores "a partir de") | sistema de matrícula |
| Novidade | Espaço Kids | reel de 19/01/2026 |
| Seguidores | 10,1 mil | perfil |
| Horário de funcionamento | **não encontrado** | — |

## Logo
Boneco de levantador de peso amarelo, com a barra acima da cabeça, formando o "X" entre **Stay**
(branco/cinza) e **fit** (amarelo). Embaixo, **academia** em minúsculas espaçadas, com um traço curvo
amarelo. Versões vistas: perfil (plana, sobre preto) e render 3D (fundo do site de matrícula).

Arquivos: `public/images/brand/logo-stay-fit.svg` (fundo escuro) e `logo-stay-fit-dark.svg` (fundo
claro), vetorizados a partir do render 3D **[VALIDAR LOGO VETORIZADO]**. O símbolo isolado (só o
boneco) é usado no favicon, no preloader, no selo do hero e na marca d'água da chamada final.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--sf-yellow` | `#F2C200` | Principal: logo, faixas, botões, estruturas |
| `--sf-yellow-hot` | `#FFD84A` | Brilho e hover |
| `--sf-yellow-deep` | `#A37F00` | Fim de gradiente, bordas |
| `--sf-black` | `#0B0B0C` | Fundo |
| `--sf-on-accent` | `#0B0B0C` | **Texto sobre amarelo é sempre preto** (contraste ≈ 12:1) |
| `--sf-white` / `--sf-muted` | `#FFFFFF` / `#A8A8AF` | Texto |

Diferença importante em relação à Princesa: lá o texto sobre a cor da marca era branco; aqui é preto.

## Tipografia
Mesma base do site da Princesa: **Archivo** variável (expandida, contraste fino/pesado nos títulos).
O logo usa uma sans humanista arredondada (parecida com Ubuntu), mas entra sempre como SVG.

## Tom de voz
Descontraído, animado e próximo, com muito humor nos reels (desafios, "academinha lotada", "cabelo
maluco") e foco em comunidade: "Vem fazer parte do nosso time!", "Aqui a gente cuida de você e da sua
família". Emojis 💛🖤. No site: frases curtas e animadas ("bora treinar", "a resenha", "o mesmo pique").

## Ambiente (referência para imagens)
Paredes e teto pretos (teto de telha metálica), **estruturas de aço amarelas**, **luminárias
hexagonais de LED**, **setas de neon amarelas (">") nas paredes**, um boneco amarelo pintado no piso,
detalhes em luz azul. Descrição usada nos prompts de `PROMPTS-IMAGENS.md`.
