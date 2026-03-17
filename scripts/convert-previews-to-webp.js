/**
 * One-time conversion script: convert all PNG previews to WebP.
 * Run from project root: node scripts/convert-previews-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'previews');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

(async () => {
  console.log(`Converting ${files.length} PNG previews to WebP (quality 85)...\n`);
  let totalPng = 0;
  let totalWebp = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace('.png', '.webp'));
    const pngSize = fs.statSync(input).size;
    const info = await sharp(input).webp({ quality: 85 }).toFile(output);
    totalPng += pngSize;
    totalWebp += info.size;
    const saving = (((pngSize - info.size) / pngSize) * 100).toFixed(0);
    console.log(`  ${file.replace('.png', '')}  ${(pngSize/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB  (-${saving}%)`);
  }

  const overallSaving = (((totalPng - totalWebp) / totalPng) * 100).toFixed(1);
  console.log(`\nDone: ${files.length} files converted`);
  console.log(`Total: ${(totalPng/1024/1024).toFixed(2)}MB PNG → ${(totalWebp/1024/1024).toFixed(2)}MB WebP  (-${overallSaving}%)`);
})();
