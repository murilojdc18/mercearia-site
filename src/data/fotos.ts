import type { ImageMetadata } from 'astro';

// Todas as fotos de src/assets, pelo caminho sem extensão: 'vitrine', 'cardapio/sonho'...
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png,webp}', { eager: true });

export const fotos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, mod]) => [
    caminho.replace('../assets/', '').replace(/\.(jpe?g|png|webp)$/, ''),
    mod.default,
  ]),
);

export function foto(chave: string): ImageMetadata {
  const f = fotos[chave];
  if (!f) throw new Error(`Foto não encontrada em src/assets: ${chave}`);
  return f;
}
