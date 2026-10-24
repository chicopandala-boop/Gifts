import fs from 'fs';

async function main() {
  const url = "https://drive.google.com/drive/folders/1bvEr66N9tSA74k60UzX_chpiXlvpKw5G?usp=sharing";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  const html = await res.text();
  fs.writeFileSync('/tmp/drive_folder.html', html);
  console.log("HTML length:", html.length);

  // Search for folder contents or file IDs
  // In Google Drive folder HTML, items often appear in JSON-like structures
  // Pattern: [null,"<file_id>",["<mime_type>",null,null...],"<filename>",...]
  // or ["<file_id>","<filename>",...]
  const matches = [...html.matchAll(/"([a-zA-Z0-9_-]{28,45})"/g)].map(m => m[1]);
  console.log("Found possible ID strings:", matches.length);

  // Look for any image filenames in the HTML
  const imageNames = [...html.matchAll(/([a-zA-Z0-9_\-\s\(\)\.]{3,80}\.(png|jpe?g|webp))/gi)].map(m => m[1]);
  console.log("Possible image names in HTML:", [...new Set(imageNames)]);

  // Let's also check for folder title
  const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
  console.log("Folder title:", titleMatch ? titleMatch[1] : 'Not found');
}

main().catch(console.error);
