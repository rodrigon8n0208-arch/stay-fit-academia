// Otimiza as imagens de src/assets/img/site/: converte para WebP com no máximo 2400 px
// (2× o maior tamanho exibido no site, nítido em telas retina) e move o original para
// source-assets/imagens-originais/ (fora do site e do git).
// Uso: npm run otimizar   — rode sempre que colocar imagens novas na pasta.
import sharp from 'sharp';
import { readdirSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';

const DIR = 'src/assets/img/site';
const ORIGINALS = 'source-assets/imagens-originais';
const MAX = 2400;
const QUALITY = 80;

mkdirSync(ORIGINALS, { recursive: true });
const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png|avif|tiff?)$/i.test(f));
if (!files.length) console.log('Nada para otimizar (só WebP na pasta).');

let before = 0;
let after = 0;
for (const file of files) {
  const src = join(DIR, file);
  const { name } = parse(file);
  const out = join(DIR, `${name}.webp`);
  const size = statSync(src).size;

  try {
    // failOn 'truncated': recusa arquivos com download incompleto em vez de gerar imagem cinza
    await sharp(src, { failOn: 'truncated' })
      .rotate()
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
  } catch (e) {
    console.log(`✗ ${file}: arquivo corrompido/incompleto (${e.message}). Salve de novo.`);
    continue;
  }

  renameSync(src, join(ORIGINALS, file));
  const newSize = statSync(out).size;
  before += size;
  after += newSize;
  console.log(`✓ ${file} → ${name}.webp  ${(size / 1e6).toFixed(2)} MB → ${(newSize / 1e6).toFixed(2)} MB`);
}

if (before) console.log(`\nTotal: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`);
