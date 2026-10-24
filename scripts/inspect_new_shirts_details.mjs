import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dir = 'src/assets/images/new_shirts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

// Check file hashes and sizes to find exact duplicates
const hashMap = {};
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const size = buf.length;
  if (!hashMap[hash]) hashMap[hash] = [];
  hashMap[hash].push({ file: f, size });
}

console.log("=== HASH CHECK FOR EXACT DUPLICATES ===");
for (const [hash, list] of Object.entries(hashMap)) {
  if (list.length > 1) {
    console.log(`Duplicate files with hash ${hash.substring(0, 10)}:`, list.map(x => x.file));
  }
}

// Let's check visual similarities and names in new_shirts_classified.json
const classified = JSON.parse(fs.readFileSync('scripts/new_shirts_classified.json', 'utf-8'));
console.log("\n=== ALL 30 CLASSIFIED ITEMS ===");
for (const [file, item] of Object.entries(classified)) {
  console.log(`${file}: ${item.team} | ${item.suggestedName} | Sponsor: ${item.sponsor} | Shorts: ${item.showsShorts} | Kids: ${item.isKidsVisual}`);
}
