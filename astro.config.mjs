// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Publicado no GitHub Pages, numa subpasta. Com domínio próprio, `site` vira o
// domínio e `base` vira '/'; o resto sai de `src/data/url.ts` e não precisa mudar.
export default defineConfig({
  site: 'https://murilojdc18.github.io',
  base: '/mercearia-site/',
  build: {
    // CSS embutido no HTML: são poucos kB e evita duas idas à rede antes de pintar
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      // A página de revisão é interna: fica fora do mapa do site
      filter: (pagina) => !pagina.includes('/cardapio/revisar'),
    }),
  ],
});
