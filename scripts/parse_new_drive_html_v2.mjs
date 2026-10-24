import fs from 'fs';

const html = fs.readFileSync('/tmp/new_drive_folder.html', 'utf-8');

// Match: aria-label="([^\"]+?\.(?:png|jpg|jpeg|webp))[^"]*"[^>]*ssk='[^']*?:([a-zA-Z0-9_-]{28,45})(?:-[^']*)?'
const regex = /aria-label="([^\"]+?\.(?:png|jpg|jpeg|webp))[^"]*"[^>]*?ssk='[^']*?:([a-zA-Z0-9_-]{28,45})/g;

const files = [];
const seen = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  const name = m[1].trim();
  const id = m[2].trim();
  if (!seen.has(id)) {
    seen.add(id);
    files.push({ id, name });
  }
}

console.log("Matched files using ssk pattern:", files.length);

// Also look for data-id or jslog or other patterns if not enough
if (files.length < 20) {
  // Let's try matching ssk first then aria-label
  const regex2 = /ssk='[^']*?:([a-zA-Z0-9_-]{28,45})[^']*'[^>]*?aria-label="([^\"]+?\.(?:png|jpg|jpeg|webp))/g;
  while ((m = regex2.exec(html)) !== null) {
    const id = m[1].trim();
    const name = m[2].trim();
    if (!seen.has(id)) {
      seen.add(id);
      files.push({ id, name });
    }
  }
  console.log("Matched files after second pattern:", files.length);
}

// Let's check files in the raw drive JSON block
const jsonBlocks = [...html.matchAll(/(\[\[\"[a-zA-Z0-9_-]{28,45}\"[\s\S]*?\]\])/g)];
console.log("Potential JSON blocks found:", jsonBlocks.length);

console.log("Files found so far:", files);
fs.writeFileSync('/tmp/parsed_new_files.json', JSON.stringify(files, null, 2));
