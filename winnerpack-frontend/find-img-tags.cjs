#!/usr/bin/env node
/**
 * Find <img> tags to convert to next/image
 * ---------------------------------------
 * Scans your frontend source for raw <img src="..."> tags and prints
 * the exact file/line, plus a ready-to-paste next/image replacement
 * that points at the LOSSLESS optimized file (from optimize-images.js
 * --lossless) and skips Next's own re-compression, so quality is
 * guaranteed unchanged.
 *
 * USAGE (run from your project root, inside the frontend folder):
 *   node find-img-tags.js
 *   node find-img-tags.js ./src        // scan a specific folder
 *
 * It does NOT edit your files — it only prints what to change and how,
 * so nothing breaks silently in JSX it can't safely parse.
 */

const fs = require('fs');
const path = require('path');

const startDir = process.argv[2] || '.';
const SCAN_DIRS = ['app', 'pages', 'components', 'src'].map((d) => path.join(startDir, d)).filter(fs.existsSync);
const dirsToScan = SCAN_DIRS.length > 0 ? SCAN_DIRS : [startDir];
const CODE_EXTENSIONS = new Set(['.jsx', '.tsx', '.js', '.ts']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'optimized', '.git']);

const IMG_TAG_REGEX = /<img\s+[^>]*src=["'{]([^"'}]+)["'}][^>]*>/g;

function walk(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else if (CODE_EXTENSIONS.has(path.extname(entry.name))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function suggestReplacement(src) {
  // Point at the lossless-optimized webp version, and disable Next's
  // own re-compression with `unoptimized` since the file is already
  // a guaranteed-lossless webp — no reason to run it through Next's
  // lossy pipeline a second time.
  const parsed = path.parse(src);
  const optimizedSrc = path.posix.join(path.dirname(src), 'optimized', parsed.name + '.webp');

  return (
    `<Image\n` +
    `  src="${optimizedSrc}"\n` +
    `  alt="TODO: describe this image"\n` +
    `  width={0}\n` +
    `  height={0}\n` +
    `  sizes="100vw"\n` +
    `  style={{ width: '100%', height: 'auto' }}\n` +
    `  unoptimized\n` +
    `/>`
  );
}

let totalFound = 0;
const filesWithImports = new Set();

for (const dir of dirsToScan) {
  const files = walk(dir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let match;
    IMG_TAG_REGEX.lastIndex = 0;
    while ((match = IMG_TAG_REGEX.exec(content)) !== null) {
      const upToMatch = content.slice(0, match.index);
      const lineNum = upToMatch.split('\n').length;
      const src = match[1];

      console.log(`\n${file}:${lineNum}`);
      console.log(`  Found: ${match[0].slice(0, 100)}${match[0].length > 100 ? '...' : ''}`);
      console.log(`  Replace with:\n`);
      console.log(
        suggestReplacement(src)
          .split('\n')
          .map((l) => '    ' + l)
          .join('\n')
      );

      if (!content.includes("from 'next/image'") && !content.includes('from "next/image"')) {
        filesWithImports.add(file);
      }
      totalFound++;
    }
  }
}

console.log(`\n\n--- Summary ---`);
console.log(`Found ${totalFound} <img> tag(s) to convert.`);
if (filesWithImports.size > 0) {
  console.log(`\nThese files also need this import added at the top:`);
  console.log(`  import Image from 'next/image';\n`);
  filesWithImports.forEach((f) => console.log(`  - ${f}`));
}
console.log(`\nNote: width/height are set to 0 with 'sizes' + style for a fluid/responsive image.`);
console.log(`If an image has a FIXED size instead (e.g. a logo), use explicit width/height in px`);
console.log(`instead of the sizes/style approach, and you can drop 'unoptimized' if you're fine`);
console.log(`with Next's own compression at quality=100 for that one.`);
