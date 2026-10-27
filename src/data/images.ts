// Imagens do site por "slot". Para trocar uma imagem, coloque o arquivo em
// src/assets/img/site/ com o nome do slot (ex.: hero.jpg, modalidade-boxe.png) e rode
// `npm run otimizar`. Extensões aceitas: jpg, jpeg, png, webp, avif.
// Prompts de cada slot: PROMPTS-IMAGENS.md. Sem arquivo, as modalidades mostram um card gráfico.
import type { ImageMetadata } from 'astro';

type Mod = { default: ImageMetadata };

const images = import.meta.glob<Mod>('../assets/img/site/*.{jpg,jpeg,png,webp,avif}', { eager: true });

const basename = (path: string) => path.split('/').pop()!.replace(/\.[^.]+$/, '');

/** Larguras do srcset limitadas ao tamanho real da imagem (nunca amplia). */
export function fitWidths(widths: number[], image: ImageMetadata) {
  const fit = widths.filter((w) => w <= image.width);
  return fit.length ? fit : [image.width];
}

export function slot(name: string): ImageMetadata | null {
  const hit = Object.entries(images).find(([path]) => basename(path) === name);
  return hit ? hit[1].default : null;
}
