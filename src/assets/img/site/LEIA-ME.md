# Imagens do site — Stay Fit

Salve aqui com **exatamente estes nomes** (.jpg, .png, .webp ou .avif), rode `npm run otimizar` e
depois `npm run build`. Se trocar a `hero`, rode também `npm run og`. Prompts em `PROMPTS-IMAGENS.md`; só as que faltam (⬜) em `PROMPTS-FALTANDO.md`.

✅ = provisória (imagem da Princesa recolorida para amarelo) · ⭐ = definitiva (gerada com os prompts de `PROMPTS-FALTANDO.md`) · ⬜ = faltando (card gráfico no lugar)

| Nome do arquivo         | Onde aparece                                | Formato                    | Situação |
| ----------------------- | ------------------------------------------- | -------------------------- | -------- |
| `hero`                  | Topo da página e imagem de compartilhamento | Vertical 4:5 — 1600×2000   | ✅        |
| `sobre`                 | Seção "Sobre a academia"                    | Horizontal 4:3 — 2000×1500 | ✅        |
| `modalidade-musculacao` | Card Musculação                             | Horizontal 3:2 — 1800×1200 | ✅        |
| `modalidade-fitdance`   | Card FitDance                               | Horizontal 3:2 — 1800×1200 | ✅        |
| `modalidade-boxe`       | Card Boxe                                   | Horizontal 3:2 — 1800×1200 | ⭐        |
| `modalidade-muaythai`   | Card Muay Thai                              | Horizontal 3:2 — 1800×1200 | ⭐        |
| `modalidade-gap`        | Card GAP                                    | Horizontal 3:2 — 1800×1200 | ⭐        |
| `modalidade-funcional`  | Card Funcional                              | Horizontal 3:2 — 1800×1200 | ⭐        |
| `modalidade-jump`       | Card Jump                                   | Horizontal 3:2 — 1800×1200 | ✅        |
| `modalidade-step`       | Card Step                                   | Horizontal 3:2 — 1800×1200 | ✅        |
| `modalidade-ritbox`     | Card Ritbox                                 | Horizontal 3:2 — 1800×1200 | ⭐        |
| `galeria-01-musculacao` | Galeria — bloco grande                      | Horizontal 4:3 — 2000×1500 | ✅        |
| `galeria-02-iluminacao` | Galeria — bloco pequeno                     | Horizontal 4:3 — 1600×1200 | ✅        |
| `galeria-03-halteres`   | Galeria — bloco pequeno                     | Horizontal 4:3 — 1600×1200 | ✅        |
| `galeria-04-cardio`     | Galeria — bloco largo                       | Panorâmica 2:1 — 2400×1200 | ✅        |
| `galeria-05-paineis`    | Galeria — bloco pequeno                     | Horizontal 4:3 — 1600×1200 | ✅        |
| `galeria-06-maquinas`   | Galeria — bloco pequeno                     | Horizontal 4:3 — 1600×1200 | ✅        |

Para substituir uma provisória, salve o arquivo novo com o mesmo nome (ex.: `hero.jpg`) e rode
`npm run otimizar`: ele gera o `hero.webp` por cima da provisória.
