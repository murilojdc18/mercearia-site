// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Trocar pelo endereço definitivo depois do primeiro deploy na Netlify
export default defineConfig({
  site: 'https://mercearia-guimaraes-rosa.netlify.app',
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
