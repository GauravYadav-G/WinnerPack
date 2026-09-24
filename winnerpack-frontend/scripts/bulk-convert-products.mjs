/**
 * bulk-convert-products.mjs
 * Converts ALL product PNG/JPG images to WebP in-place with high quality.
 * Preserves native resolution (caps only if width > 1600px).
 * Uses WebP quality: 88, alphaQuality: 100, smartSubsample: true for crystal-clear visuals.
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

let converted = 0;
let errors = 0;
let totalSaved = 0;

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

  try {
    const srcStat = await stat(filePath);
    
    // High-quality WebP conversion:
    // - Native resolution preserved (only capped at 1600px if larger)
    // - quality: 88 (near-lossless visual fidelity, crisp typography and packaging details)
    // - alphaQuality: 100 (crisp transparency borders for packaging cutouts)
    // - smartSubsample: true (preserves sharp color edges and high-contrast text)
    const result = await sharp(filePath)
      .resize(1600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({
        quality: 88,
        alphaQuality: 100,
        smartSubsample: true,
        effort: 5,
      })
      .toFile(webpPath);

    const saved = srcStat.size - result.size;
    totalSaved += saved;
    converted++;

    if (converted % 50 === 0 || converted <= 5) {
      const rel = path.relative(PRODUCTS_DIR, filePath);
      console.log(`  ✅ [${converted}] ${rel} → .webp (${Math.round(result.size / 1024)} KB)`);
    }
  } catch (err) {
    errors++;
    console.warn(`  ⚠️  Failed: ${filePath}: ${err.message}`);
  }
}

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  // Process entries sequentially or in controlled concurrency to avoid overloading memory
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      await convertFile(fullPath);
    }
  }
}

console.log('🚀 High-Quality Bulk-converting product images to WebP…');
console.log('   Settings: quality=88, alphaQuality=100, smartSubsample=true, maxWidth=1600 (without enlargement)\n');

const startTime = Date.now();
await walkDir(PRODUCTS_DIR);
const durationSec = Math.round((Date.now() - startTime) / 100) / 10;

console.log(`\n✨ Done! Converted ${converted} product images in ${durationSec}s (${errors} errors).`);
console.log(`   Net payload reduction: ~${Math.round(totalSaved / 1024 / 1024 * 10) / 10} MB while preserving crisp quality!`);
