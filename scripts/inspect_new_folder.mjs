import fs from 'fs';

async function main() {
  const folderId = "1QPL77AnKYQKe0fZU50z9WoqiUbuj3o3Y";
  const url = `https://drive.google.com/drive/folders/${folderId}?usp=sharing`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  const html = await res.text();
  fs.writeFileSync('/tmp/new_drive_folder.html', html);
  console.log("HTML length:", html.length);

  const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
  console.log("Folder title:", titleMatch ? titleMatch[1] : 'Not found');

  // Find image filenames and IDs
  const imageNames = [...html.matchAll(/([a-zA-Z0-9_\-\s\(\)\.]{3,80}\.(png|jpe?g|webp))/gi)].map(m => m[1]);
  console.log("Unique image names count:", new Set(imageNames).size);
  console.log("Image names:", [...new Set(imageNames)].slice(0, 50));
}

main().catch(console.error);
