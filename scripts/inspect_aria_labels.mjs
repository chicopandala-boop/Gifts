import fs from 'fs';

const html = fs.readFileSync('/tmp/new_drive_folder.html', 'utf-8');

const regex = /aria-label="([^"]*WhatsApp Image 2026-10-22[^"]*)"([\s\S]{1,400}?)(?=aria-label="|$)/g;

let match;
let count = 0;
while ((match = regex.exec(html)) !== null && count < 10) {
  count++;
  console.log(`--- Item ${count}: Label = "${match[1]}" ---`);
  console.log(match[2].substring(0, 300));
}
