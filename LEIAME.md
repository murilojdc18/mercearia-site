# Site da Mercearia Guimarães Rosa

Astro 7, site estático, publicado na Netlify.

| Para | Comando |
|---|---|
| Instalar | `npm install` |
| Desenvolver | `npm run dev` |
| Gerar o site | `npm run build` (sai em `dist/`) |
| Ver o gerado | `npm run preview` |

## Páginas

| Endereço | Para quê |
|---|---|
| `/` | Início: história do João e da Renata, o que tem na loja, como chegar |
| `/cardapio` | Cardápio digital. Vai no Google e no link da bio do Instagram |
| `/cardapio/revisar` | **Uso interno.** Mostra também os itens presumidos. Não entra no Google nem no mapa do site |
| `/links` | Página de links para a bio do Instagram |
| `/creditos` | Créditos das fotos de banco |

## Onde mexer

| O quê | Arquivo |
|---|---|
| Telefone, endereço, horário, feriados, links | `src/data/loja.ts` |
| Cardápio | `src/data/cardapio.ts` |
| Créditos das fotos | `src/data/creditos-fotos.ts` |
| Fotos | `src/assets/` (a do cardápio em `src/assets/cardapio/`) |
| Cores, fontes e botões | `src/styles/global.css` |

## Regras do cardápio

- **Sem preço.** Nenhum item leva preço.
- **`status: ok`** é item confirmado: aparece no site.
- **`status: rev`** é item presumido: só aparece em `/cardapio/revisar`.
  Depois de conferir com a loja, troque para `ok` o que existe e apague o que não existe.
- **`ilustrativa: true`** marca foto de banco de imagem, que aparece com o selo "foto ilustrativa".
  Ao trocar pela foto real da loja, ponha o arquivo em `src/assets/cardapio/` com o mesmo nome e remova a marca e a linha correspondente em `src/data/creditos-fotos.ts`.

## Depois de publicar

1. Pôr o endereço definitivo em `site`, no `astro.config.mjs`, e no `public/robots.txt`.
2. Cadastrar o site no **Google Search Console** e enviar `/sitemap-index.xml`.
3. No **Perfil da Empresa**: campo "Site" com o endereço do site e "Link do cardápio" com `/cardapio`.
4. Conferir se o endereço do Perfil bate com o do site: Jardim Tupã, CEP a confirmar nos Correios.
5. Trocar o link "Avaliar no Google" em `src/data/loja.ts` pelo link oficial "Receber avaliações".
6. Conferir as coordenadas em `loja.geo` com o pino do Google Maps (hoje são aproximadas, do OpenStreetMap).

## Publicar na Netlify

`netlify.toml` pronto (`npm run build`, pasta `dist`).
- **Netlify Drop:** rodar `npm run build` e arrastar `dist` em app.netlify.com/drop.
- **Git:** subir para o GitHub e conectar em app.netlify.com, em "Add new site".
