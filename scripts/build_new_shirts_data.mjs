import fs from 'fs';

const classified = JSON.parse(fs.readFileSync('scripts/new_shirts_classified.json', 'utf-8'));

const entries = [];
for (let i = 1; i <= 30; i++) {
  const fileKey = `shirt_${String(i).padStart(2, '0')}.png`;
  const info = classified[fileKey] || {};
  entries.push({
    index: i,
    fileKey,
    varName: `shirt${String(i).padStart(2, '0')}Img`,
    ...info
  });
}

console.log("Total entries to generate:", entries.length);
fs.writeFileSync('scripts/classified_summary.json', JSON.stringify(entries, null, 2));
