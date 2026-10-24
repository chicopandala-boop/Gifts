import fs from 'fs';

const html = fs.readFileSync('/tmp/new_drive_folder.html', 'utf-8');

// In Drive public folder HTML, items are embedded in JSON array or data blocks
// Look for pattern: ["<id>","<filename>",... or similar
const idFileMap = new Map();

// Regex matching [null,"id",["mime",...],"filename" or variations
// Often Drive JSON has: ["<28-45 char id>","<filename>.png"] or similar
const regex = /\["([a-zA-Z0-9_-]{28,45})",\[.*?\],"([^\"]+\.(?:png|jpg|jpeg|webp))"/g;
let match;
while ((match = regex.exec(html)) !== null) {
  idFileMap.set(match[1], match[2]);
}

// Another common pattern:
// ["<id>","<name>",...
const regex2 = /\["([a-zA-Z0-9_-]{28,45})","([^"]+\.(?:png|jpg|jpeg|webp))"/g;
while ((match = regex2.exec(html)) !== null) {
  idFileMap.set(match[1], match[2]);
}

// Another pattern: "id":"...", "title":"..." or name
const regex3 = /"([a-zA-Z0-9_-]{28,45})"[^\]]*?"(WhatsApp Image 2026-10-22[^\"]*?\.png)"/g;
while ((match = regex3.exec(html)) !== null) {
  idFileMap.set(match[1], match[2]);
}

console.log("Total mapped files found:", idFileMap.size);
for (const [id, name] of idFileMap.entries()) {
  console.log(`ID: ${id} -> Name: ${name}`);
}

// Let's dump all text around "WhatsApp Image 2026-10-22" if needed
if (idFileMap.size === 0) {
  const snippets = [];
  let pos = 0;
  while ((pos = html.indexOf("WhatsApp Image 2026-10-22", pos)) !== -1) {
    snippets.push(html.substring(Math.max(0, pos - 150), Math.min(html.length, pos + 150)));
    pos += 26;
  }
  console.log("Found raw occurrences:", snippets.length);
  if (snippets.length > 0) {
    console.log("Sample snippet:", snippets[0]);
  }
}
