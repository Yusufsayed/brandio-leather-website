/**
 * Brandio image optimiser (pure-JS, Node 18 compatible)
 * - Downloads Brandio logo and generates PWA icons (192 + 512) via Jimp
 * - Compresses all large images in public/ via sips (macOS built-in)
 * Run: node scripts/optimise-images.mjs
 */
import { Jimp, JimpMime } from 'jimp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';

const PUBLIC = new URL('../public/', import.meta.url).pathname;
const LOGO_URL = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/brandio-logo-final.png';

async function generatePWAIcons() {
  console.log('Downloading logo and generating PWA icons…');
  const res = await fetch(LOGO_URL);
  if (!res.ok) throw new Error(`Failed to fetch logo: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const src = await Jimp.fromBuffer(buf);

  // 192x192
  const icon192 = src.clone().contain({ w: 160, h: 160 });
  const canvas192 = new Jimp({ width: 192, height: 192, color: 0xfffbebff });
  canvas192.composite(icon192, 16, 16);
  await canvas192.write(join(PUBLIC, 'icon-192.png'));
  console.log('  ✓ icon-192.png');

  // 512x512
  const icon512 = src.clone().contain({ w: 440, h: 440 });
  const canvas512 = new Jimp({ width: 512, height: 512, color: 0xfffbebff });
  canvas512.composite(icon512, 36, 36);
  await canvas512.write(join(PUBLIC, 'icon-512.png'));
  console.log('  ✓ icon-512.png');
}

async function compressImages() {
  console.log('\nCompressing large images with sips…');
  const files = (await readdir(PUBLIC)).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  let saved = 0;
  let count = 0;

  for (const file of files) {
    if (file === 'icon-192.png' || file === 'icon-512.png') continue;
    const path = join(PUBLIC, file);
    const { size: before } = await stat(path);
    if (before < 300_000) continue;

    try {
      execSync(`sips -Z 1200 "${path}" --out "${path}" 2>/dev/null`, { stdio: 'pipe' });
      const { size: after } = await stat(path);
      if (after < before) {
        const pct = Math.round((1 - after / before) * 100);
        saved += before - after;
        count++;
        console.log(`  ✓ ${file.padEnd(44)} ${(before/1024).toFixed(0).padStart(5)} KB → ${(after/1024).toFixed(0).padStart(5)} KB  (-${pct}%)`);
      }
    } catch (e) {
      console.warn(`  ✗ ${file}: ${e.message}`);
    }
  }
  console.log(`\n  Compressed ${count} files — saved ${(saved / 1024 / 1024).toFixed(1)} MB total`);
}

await generatePWAIcons();
await compressImages();
console.log('\nDone.');
