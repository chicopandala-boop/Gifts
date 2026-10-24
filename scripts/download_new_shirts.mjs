import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const outDir = 'src/assets/images/new_shirts';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean list of IDs
const rawFiles = JSON.parse(fs.readFileSync('/tmp/parsed_new_files.json', 'utf-8'));
const files = rawFiles.map((f, i) => {
  const cleanId = f.id.replace(/-0-16$/, '');
  let safeName = f.name.replace(/&#39;/g, '').replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  return {
    id: cleanId,
    name: safeName,
    originalName: f.name,
    index: i + 1
  };
});

console.log(`Processing ${files.length} images...`);

async function downloadFile(id, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
    return true;
  }
  const url = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Failed to download ${id}:`, err.message);
    return false;
  }
}

async function run() {
  for (const f of files) {
    const filename = `shirt_${String(f.index).padStart(2, '0')}.png`;
    const dest = path.join(outDir, filename);
    const ok = await downloadFile(f.id, dest);
    console.log(`Downloaded ${f.name} -> ${filename}: ${ok}`);
    f.localFile = filename;
    f.localPath = dest;
  }
  fs.writeFileSync('scripts/new_shirts_manifest.json', JSON.stringify(files, null, 2));
}

run().catch(console.error);
