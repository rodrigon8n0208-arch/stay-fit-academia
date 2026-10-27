// Gera public/og-image.jpg (1200×630): foto do hero escurecida + brilho amarelo + logo + slogan.
// Rode de novo sempre que trocar a imagem do hero: npm run og
import sharp from 'sharp';
import { readFileSync, readdirSync } from 'node:fs';

const W = 1200;
const H = 630;
const YELLOW = '#F2C200';

const hero = readdirSync('src/assets/img/site').find((f) => /^hero\.(jpe?g|png|webp|avif)$/i.test(f));
if (!hero) throw new Error('Coloque a imagem do hero em src/assets/img/site/ antes de gerar a OG.');
const source = `src/assets/img/site/${hero}`;
console.log('fonte:', source);

const photo = await sharp(source).resize(W, H, { fit: 'cover', position: 'centre' }).modulate({ brightness: 0.75 }).toBuffer();

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0B0B0C" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#0B0B0C" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#0B0B0C" stop-opacity="0.2"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="0.9">
      <stop offset="0" stop-color="${YELLOW}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${YELLOW}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#fade)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <g font-family="Arial Black, Arial, sans-serif" fill="#FFFFFF">
    <text x="80" y="345" font-size="46" font-weight="300" letter-spacing="2">TREINAR É UM</text>
    <rect x="72" y="365" width="272" height="72" fill="${YELLOW}"/>
    <text x="84" y="423" font-size="60" font-weight="900" fill="#0B0B0C">ESTILO</text>
    <text x="392" y="423" font-size="60" font-weight="900">DE VIDA.</text>
    <text x="80" y="515" font-size="24" fill="#D8D8DC" letter-spacing="1.5">Nova Satuba · Graciliano Ramos · AL</text>
  </g>
</svg>`);

const logo = await sharp(readFileSync('public/images/brand/logo-stay-fit.svg'), { density: 300 })
  .resize({ width: 300 })
  .png()
  .toBuffer();

await sharp(photo)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 70, left: 72 },
  ])
  .jpeg({ quality: 86 })
  .toFile('public/og-image.jpg');

console.log('✓ public/og-image.jpg');
