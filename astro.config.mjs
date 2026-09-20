// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio próprio, servido pelo GitHub Pages. A base voltou a ser a raiz; o
// helper de `src/data/url.ts` continua no caminho e absorveu a troca sozinho.
export default defineConfig({
  site: 'https://merceariaguimaraesrosa.store',
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
