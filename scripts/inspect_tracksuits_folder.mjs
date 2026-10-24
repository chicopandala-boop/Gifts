import fs from 'fs';

async function main() {
  const folderId = "1nCElrp14uMIDcD1vh3GDCCsoi8tYregy";
  const url = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  const html = await res.text();
  fs.writeFileSync('/tmp/tracksuits_folder.html', html);
  console.log("HTML length:", html.length);

  const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
  console.log("Folder title:", titleMatch ? titleMatch[1] : 'Not found');

  // Extract ssk pattern or aria-label
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

  // Also check alternative order
  const regex2 = /ssk='[^']*?:([a-zA-Z0-9_-]{28,45})[^']*'[^>]*?aria-label="([^\"]+?\.(?:png|jpg|jpeg|webp))/g;
  while ((m = regex2.exec(html)) !== null) {
    const id = m[1].trim();
    const name = m[2].trim();
    if (!seen.has(id)) {
      seen.add(id);
      files.push({ id, name });
    }
  }

  console.log("Found files count:", files.length);
  for (const f of files) {
    console.log(`- ${f.name} (ID: ${f.id})`);
  }
  fs.writeFileSync('/tmp/tracksuits_files.json', JSON.stringify(files, null, 2));
}

main().catch(console.error);
