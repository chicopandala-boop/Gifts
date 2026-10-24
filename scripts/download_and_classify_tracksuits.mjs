import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});
const outDir = 'src/assets/images/tracksuits';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const rawFiles = JSON.parse(fs.readFileSync('/tmp/tracksuits_files.json', 'utf-8'));
const files = rawFiles.map((f, i) => {
  const cleanId = f.id.replace(/-0-16$/, '');
  let safeName = f.name.replace(/&#39;/g, '').replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  return {
    id: cleanId,
    name: safeName,
    originalName: f.name,
    index: i + 1,
    localFile: `tracksuit_${String(i + 1).padStart(2, '0')}.png`,
    localPath: path.join(outDir, `tracksuit_${String(i + 1).padStart(2, '0')}.png`)
  };
});

async function downloadFile(id, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
    return true;
  }
  const url = `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
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

async function analyze(fileObj) {
  const data = fs.readFileSync(fileObj.localPath).toString('base64');
  const prompt = `Analyze this football / sportswear item carefully.
Check:
1. Is it a Tracksuit (jacket/top + track pants), a training kit, or a jersey / shirt?
2. Club or National Team (e.g. South Africa / Bafana Bafana, Arsenal, Real Madrid, Chelsea, Manchester City, Manchester United, PSG, Bayern Munich, etc.)
3. Home/Away/Third/Pre-Match/Training/Warmup
4. Dominant colors
5. Does it show full tracksuit (jacket + pants) or jacket/top only?
6. Is it adult or kids?
7. Suggested product title and attractive 2-sentence description highlighting premium poly fabric, zip pockets, club crest embroidery, and athletic performance fit.

Return ONLY valid JSON:
{
  "itemType": "tracksuit" | "jersey" | "set" | "jacket",
  "team": "Team / Nation Name",
  "isBafanaBafana": boolean,
  "colors": "Primary colors",
  "name": "Full product title",
  "subtitle": "Subtitle e.g. Official Matchday Tracksuit · Full Zip Jacket + Tapered Pants",
  "priceUSD": number (e.g. 550 or 650 for tracksuits, or appropriate rand price),
  "description": "2-sentence description",
  "details": [
    "Detail 1",
    "Detail 2",
    "Detail 3",
    "Detail 4"
  ]
}`;

  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/png', data } }
        ]
      }]
    });
    const text = res.text.trim().replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.warn(`Analysis failed for ${fileObj.localFile}:`, err.message);
    return null;
  }
}

async function main() {
  console.log(`Downloading ${files.length} images...`);
  for (const f of files) {
    const ok = await downloadFile(f.id, f.localPath);
    console.log(`Downloaded ${f.name} -> ${f.localFile}: ${ok}`);
  }

  console.log("Analyzing with Gemini 3.1 Flash Lite...");
  const results = {};
  for (const f of files) {
    const analysis = await analyze(f);
    results[f.localFile] = { ...f, analysis };
    console.log(`[ANALYZED] ${f.localFile}:`, analysis?.name || 'Failed');
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync('scripts/tracksuits_manifest.json', JSON.stringify(results, null, 2));
  console.log("Finished analyzing all tracksuit folder items!");
}

main().catch(console.error);
