// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [PREENCHER] domínio definitivo. Na Vercel, defina SITE_URL nas variáveis de ambiente.
const site = process.env.SITE_URL || 'https://stayfitacademia.com.br';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: {
    // CSS pequeno: inline evita requisição bloqueante de renderização
    inlineStylesheets: 'always',
  },
});
