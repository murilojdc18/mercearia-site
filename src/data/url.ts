// Todo caminho interno do site passa por aqui.
//
// O site está publicado numa subpasta (`/mercearia-site/`), então um `href="/"`
// escrito à mão aponta para fora do site e dá 404. Quando entrar um domínio
// próprio, a base vira `/` e só `astro.config.mjs` muda: nenhuma página precisa
// ser tocada.

const base = import.meta.env.BASE_URL;

/** Caminho interno pronto para `href`. `rota('/cardapio')` → `/mercearia-site/cardapio` */
export function rota(caminho = '/'): string {
  return (base + caminho.replace(/^\/+/, '')).replace(/\/{2,}/g, '/');
}

/** Endereço completo, para canônico, dados estruturados e redes sociais. */
export function absoluta(caminho: string, site: URL): string {
  return new URL(rota(caminho), site).href;
}

/** Tira a barra final para comparar dois caminhos. `/loja/` e `/loja` são o mesmo. */
export function normalizar(caminho: string): string {
  return caminho.replace(/\/+$/, '') || '/';
}
