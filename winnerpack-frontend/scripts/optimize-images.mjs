/**
 * optimize-images.mjs
 * Converts hero slider, industries, about, logo, header-bg, brand logos,
 * and desktop images to WebP format using sharp with high visual fidelity.
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function convertImageFile(inputRel, outputRel, options = {}) {
  const inputPath = path.join(PUBLIC_DIR, inputRel);
  const outputPath = path.join(PUBLIC_DIR, outputRel);

  if (!existsSync(inputPath)) {
    return null;
  }

  await ensureDir(outputPath);

  let pipeline = sharp(inputPath);

  if (options.width || options.height) {
    pipeline = pipeline.resize(options.width || null, options.height || null, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const result = await pipeline
    .webp({
      quality: options.quality || 88,
      alphaQuality: options.alphaQuality || 100,
      smartSubsample: options.smartSubsample ?? true,
      effort: options.effort || 5,
    })
    .toFile(outputPath);

  const inputStat = await stat(inputPath);
  const savedKiB = Math.round((inputStat.size - result.size) / 1024);
  const savedPct = Math.round(((inputStat.size - result.size) / inputStat.size) * 100);

  console.log(
    `  ✅ ${inputRel} → ${outputRel} ` +
    `(${Math.round(result.size / 1024)} KB, saved ${savedPct}%)`
  );

  return result;
}

// Convert all raster images in a directory to .webp
async function convertDirectory(relDir, options = {}) {
  const fullDir = path.join(PUBLIC_DIR, relDir);
  if (!existsSync(fullDir)) return;

  const entries = await readdir(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    const itemRel = path.join(relDir, entry.name);

    if (entry.isDirectory()) {
      await convertDirectory(itemRel, options);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outRel = itemRel.replace(/\.(png|jpe?g)$/i, '.webp');
        try {
          await convertImageFile(itemRel, outRel, options);
        } catch (err) {
          console.warn(`  ⚠️  Failed: ${itemRel}: ${err.message}`);
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 WinnerPack High-Quality Image Optimizer\n');
  console.log(`Target: ${PUBLIC_DIR}\n`);

  // 1. Hero Slider (Desktop) — Full native resolution, high quality 88
  console.log('📸 Optimizing Desktop Hero Slider…');
  await convertDirectory('images/desktop/hero-slider', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 2. Hero Slider (Mobile)
  console.log('\n📱 Optimizing Mobile Hero Slider…');
  await convertDirectory('images/mobile/hero-slider', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 3. Industries — Native 1024x1024 resolution, quality 88
  console.log('\n🏭 Optimizing Industries…');
  await convertDirectory('images/desktop/industries', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 4. About Section — Native 1024x768 resolution, quality 88
  console.log('\n🏢 Optimizing About Section…');
  await convertDirectory('images/desktop/about', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 5. Logo — High quality 95, crisp alpha
  console.log('\n✨ Optimizing Brand Logo…');
  await convertImageFile('logo.png', 'logo.webp', {
    quality: 95,
    alphaQuality: 100,
    smartSubsample: true,
    effort: 5,
  });

  // 6. Header Background
  console.log('\n🖼️  Optimizing Header Background…');
  await convertImageFile('images/header-bg.png', 'images/header-bg.webp', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 7. Partner / Client Brand Logos
  console.log('\n🤝 Optimizing Client Logos (Brand_logo)…');
  await convertDirectory('Brand_logo', {
    quality: 92,
    alphaQuality: 100,
    smartSubsample: true,
    effort: 5,
  });

  // 8. Certifications
  console.log('\n📜 Optimizing Certification Artworks…');
  await convertDirectory('certifications', {
    quality: 92,
    alphaQuality: 100,
    smartSubsample: true,
    effort: 5,
  });

  // 9. Machines & Gallery
  console.log('\n⚙️  Optimizing Machines & Gallery…');
  await convertDirectory('images/machines', {
    quality: 88,
    alphaQuality: 100,
    smartSubsample: true,
    effort: 5,
  });
  await convertDirectory('images/gallery', {
    quality: 88,
    smartSubsample: true,
    effort: 5,
  });

  // 10. Remaining Desktop Assets (directors, journey, hero, process, portfolio, testimonials, etc.)
  console.log('\n📂 Optimizing Remaining Desktop Assets…');
  await convertDirectory('images/desktop/directors', { quality: 88, alphaQuality: 100, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/hero', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/journey', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/process', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/machines', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/products', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/portfolio', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/testimonials', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('images/desktop/misc', { quality: 88, smartSubsample: true, effort: 5 });
  await convertDirectory('uploads', { quality: 88, smartSubsample: true, effort: 5 });

  console.log('\n🎉 All site images optimized to high-fidelity WebP!');
}

main().catch(console.error);
