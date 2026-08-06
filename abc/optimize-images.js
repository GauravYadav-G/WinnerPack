#!/usr/bin/env node
/**
 * Image Optimization Script
 * ---------------------------------------
 * Scans a folder of images, resizes anything wider than a max width,
 * and outputs compressed WebP versions alongside the originals.
 * This is usually the single biggest fix for a low Lighthouse
 * Performance score / slow LCP on an image-heavy site.
 *
 * SETUP (run once, in the same folder as perf-seo-test.js):
 *   npm install sharp
 *
 * USAGE:
 *   node optimize-images.js <folder> [maxWidthPx] [quality]
 *
 * EXAMPLES:
 *   node optimize-images.js ./public
 *   node optimize-images.js ./public/images 1600 80
 *
 * OUTPUT:
 *   Writes optimized files into <folder>/optimized/ preserving
 *   relative paths, as .webp. Originals are left untouched —
 *   nothing is deleted or overwritten.
 *
 * AFTER RUNNING:
 *   Swap your <img src="..."> tags to next/image (which will pick
 *   the right format/size automatically), or manually point them
 *   at the new .webp files in optimized/.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = process.argv.slice(2);
const lossless = args.includes('--lossless');
const positional = args.filter((a) => !a.startsWith('--'));

const inputDir = positional[0];
const maxWidth = parseInt(positional[1]) || 1600;
// Default 92 = "visually lossless" — no perceptible difference at normal
// viewing distance/zoom, but still meaningfully smaller than the original.
// Use --lossless for pixel-perfect (no data loss at all, smaller savings).
const quality = parseInt(positional[2]) || 92;

if (!inputDir) {
  console.error('Usage: node optimize-images.js <folder> [maxWidthPx] [quality] [--lossless]');
  console.error('  --lossless    True pixel-perfect WebP (bigger files, zero quality loss)');
  console.error('  quality       Default 92 = visually lossless. Ignored if --lossless is set.');
  process.exit(1);
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif']);

function walk(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'optimized' || entry.name === 'node_modules') continue;
      walk(fullPath, fileList);
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function optimizeImage(filePath, outputRoot, inputRoot) {
  const relativePath = path.relative(inputRoot, filePath);
  const parsed = path.parse(relativePath);
  const outputPath = path.join(outputRoot, parsed.dir, parsed.name + '.webp');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const originalSize = fs.statSync(filePath).size;
  const image = sharp(filePath);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > maxWidth) {
    // Only downsizes images larger than maxWidth (e.g. a 4000px photo shown
    // at 1600px wide) — this removes pixels a browser would never display
    // anyway, it does not degrade the visible image.
    pipeline = pipeline.resize({ width: maxWidth });
  }
  pipeline = lossless ? pipeline.webp({ lossless: true }) : pipeline.webp({ quality });

  await pipeline.toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  const savings = originalSize > 0 ? (100 * (1 - newSize / originalSize)).toFixed(0) : 0;

  return { relativePath, originalSize, newSize, savings, width: metadata.width };
}

(async () => {
  if (!fs.existsSync(inputDir)) {
    console.error(`Folder not found: ${inputDir}`);
    process.exit(1);
  }

  const files = walk(inputDir);
  if (files.length === 0) {
    console.log('No images found in that folder.');
    return;
  }

  const outputRoot = path.join(inputDir, 'optimized');
  console.log(`Found ${files.length} image(s) in ${inputDir}`);
  console.log(`Max width: ${maxWidth}px | Mode: ${lossless ? 'lossless (pixel-perfect)' : `visually-lossless (quality ${quality})`}`);
  console.log(`Writing output to: ${outputRoot}\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];

  for (const file of files) {
    try {
      const result = await optimizeImage(file, outputRoot, inputDir);
      results.push(result);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      console.log(
        `✓ ${result.relativePath}  (${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)}, -${result.savings}%)`
      );
    } catch (err) {
      console.log(`✗ ${file}: ${err.message}`);
    }
  }

  const totalSavings = totalOriginal > 0 ? (100 * (1 - totalNew / totalOriginal)).toFixed(0) : 0;
  console.log('\n--- Summary ---');
  console.log(`Images processed: ${results.length}`);
  console.log(`Total size before: ${formatBytes(totalOriginal)}`);
  console.log(`Total size after:  ${formatBytes(totalNew)}`);
  console.log(`Total savings:     ${totalSavings}%`);
  console.log(`\nOptimized files are in: ${outputRoot}`);
  console.log('Point your <img>/next/image src at these, or swap to next/image for automatic format/size selection.');
})();
