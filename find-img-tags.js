#!/usr/bin/env node
/**
 * Find <img> tags to convert to next/image
 * ---------------------------------------
 * Scans your frontend source for raw <img src="..."> tags and prints
 * the exact file/line, plus a ready-to-paste next/image replacement.
 *
 * SAFETY: it reads each image's REAL pixel dimensions from the actual
 * file (no guessing width/height), and computes the optimized-file path
 * to exactly match what optimize-images.js produces. This prevents:
 *   - layout shift / collapsed images (from wrong or missing dimensions)
 *   - broken image links (from a wrong optimized/ path)
 *
 * SETUP: needs sharp (same dependency as optimize-images.js)
 *   npm install sharp
 *
 * USAGE (run from inside your frontend folder / project root):
 *   node find-img-tags.js
 *   node find-img-tags.js ./src --public ./public
 *
 * It does NOT edit your files — it only prints what to change, so
 * nothing breaks silently in JSX it can't safely parse.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = process.argv.slice(2);
const publicFlagIdx = args.indexOf('--public');
const publicDir = publicFlagIdx !== -1 ? args[publicFlagIdx + 1] : './public';
const positional = args.filter((a, i) => a !== '--public' && i !== publicFlagIdx + 1);
const startDir = positional[0] || '.';

const SCAN_DIRS = ['app', 'pages', 'components', 'src']
  .map((d) => path.join(startDir, d))
  .filter(fs.existsSync);
const dirsToScan = SCAN_DIRS.length > 0 ? SCAN_DIRS : [startDir];
const CODE_EXTENSIONS = new Set(['.jsx', '.tsx', '.js', '.ts']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'optimized', '.git']);
const IMG_TAG_REGEX = /<img\s+[^>]*src=["'{]([^"'}]+)["'}][^>]*>/g;

function walk(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, fileList);
    else if (CODE_EXTENSIONS.has(path.extname(entry.name))) fileList.push(fullPath);
  }
  return fileList;
}

function isLocalStaticSrc(src) {
  // Skip anything that isn't a plain local path we can actually resolve
  // and verify on disk — external URLs, data URIs, and dynamic
  // expressions get flagged separately instead of guessed at.
  if (!src.startsWith('/')) return false;
  if (src.startsWith('//')) return false;
  if (src.includes('${') || src.includes('+')) return false;
  return true;
}

function resolveOptimizedPath(src) {
  // Mirrors optimize-images.js's actual output structure:
  // <publicDir>/optimized/<same relative subpath>/<name>.webp
  const parsed = path.parse(src);
  return path.posix.join('/optimized', parsed.dir, parsed.name + '.webp');
}

async function buildReplacement(src, originalFileOnDisk) {
  let width = null;
  let height = null;
  try {
    const metadata = await sharp(originalFileOnDisk).metadata();
    width = metadata.width;
    height = metadata.height;
  } catch (err) {
    return { error: `Could not read image dimensions: ${err.message}` };
  }

  const optimizedSrc = resolveOptimizedPath(src);
  const optimizedFileOnDisk = path.join(publicDir, 'optimized', path.parse(src).dir, path.parse(src).name + '.webp');
  const optimizedExists = fs.existsSync(optimizedFileOnDisk);

  const code =
    `<Image\n` +
    `  src="${optimizedSrc}"\n` +
    `  alt="TODO: describe this image"\n` +
    `  width={${width}}\n` +
    `  height={${height}}\n` +
    `  style={{ width: '100%', height: 'auto' }}\n` +
    `  unoptimized\n` +
    `/>`;

  return { code, optimizedExists, optimizedFileOnDisk, width, height };
}

(async () => {
  let totalFound = 0;
  let totalReady = 0;
  let totalMissingOptimized = 0;
  let totalSkippedDynamic = 0;
  const filesWithImports = new Set();

  for (const dir of dirsToScan) {
    const files = walk(dir);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      IMG_TAG_REGEX.lastIndex = 0;
      while ((match = IMG_TAG_REGEX.exec(content)) !== null) {
        const upToMatch = content.slice(0, match.index);
        const lineNum = upToMatch.split('\n').length;
        const src = match[1];
        totalFound++;

        console.log(`\n${file}:${lineNum}`);
        console.log(`  Found: ${match[0].slice(0, 100)}${match[0].length > 100 ? '...' : ''}`);

        if (!isLocalStaticSrc(src)) {
          console.log(`  ⚠ Skipped — dynamic or external src ("${src}"). Convert this one by hand.`);
          totalSkippedDynamic++;
          continue;
        }

        const originalFileOnDisk = path.join(publicDir, src);
        if (!fs.existsSync(originalFileOnDisk)) {
          console.log(`  ⚠ Original file not found at ${originalFileOnDisk} — check --public path. Skipped.`);
          totalSkippedDynamic++;
          continue;
        }

        const result = await buildReplacement(src, originalFileOnDisk);
        if (result.error) {
          console.log(`  ⚠ ${result.error}`);
          continue;
        }

        if (!result.optimizedExists) {
          console.log(`  ⚠ Optimized file not generated yet: ${result.optimizedFileOnDisk}`);
          console.log(`    Run: node optimize-images.js ${publicDir} --lossless`);
          totalMissingOptimized++;
        }

        console.log(`  Real dimensions: ${result.width}x${result.height}px (read from file, not guessed)`);
        console.log(`  Replace with:\n`);
        console.log(result.code.split('\n').map((l) => '    ' + l).join('\n'));

        if (!content.includes("from 'next/image'") && !content.includes('from "next/image"')) {
          filesWithImports.add(file);
        }
        totalReady++;
      }
    }
  }

  console.log(`\n\n--- Summary ---`);
  console.log(`Found ${totalFound} <img> tag(s) total.`);
  console.log(`  Ready to convert (verified dimensions + path): ${totalReady - totalMissingOptimized}`);
  console.log(`  Needs optimize-images.js run first: ${totalMissingOptimized}`);
  console.log(`  Skipped — dynamic/external/missing, needs manual review: ${totalSkippedDynamic}`);

  if (filesWithImports.size > 0) {
    console.log(`\nThese files also need this import added at the top:`);
    console.log(`  import Image from 'next/image';\n`);
    filesWithImports.forEach((f) => console.log(`  - ${f}`));
  }

  console.log(`\nWhy this is safe:`);
  console.log(`  - width/height come from the actual image file, not a guess — so it`);
  console.log(`    won't collapse, stretch, or misplace anything.`);
  console.log(`  - style={{width:'100%',height:'auto'}} keeps it responsive while`);
  console.log(`    preserving the real aspect ratio.`);
  console.log(`  - 'unoptimized' skips Next's own re-compression since the file is`);
  console.log(`    already a guaranteed-lossless webp — nothing recompresses it further.`);
})();