import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({});
const dir = "src/assets/images/drive_jerseys";
const thumbDir = "/tmp/thumbs";

const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).size > 20000);

const cacheFile = "scripts/classified_cache.json";
let cache = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  } catch (e) {}
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function analyzeWithRetry(file, thumbPath) {
  if (cache[file]) {
    return cache[file];
  }

  const data = fs.readFileSync(thumbPath).toString("base64");
  const prompt = `Analyze this sports apparel item accurately.
Return strictly a single JSON object (no markdown, no backticks, no comments) with fields:
{
  "sport": "basketball" | "football",
  "apparelType": "jersey" | "shorts" | "kit" | "hoodie" | "gear",
  "brand": "e.g. Chicago Bulls, Los Angeles Lakers, Arsenal FC, Real Madrid, Boston Celtics, Brooklyn Nets, Air Jordan, New York Knicks, Germany DFB, France FFF, etc.",
  "team": "Full team or brand name",
  "player": "Player Name if visible/applicable or null",
  "number": "Player Number or null",
  "view": "front" | "back" | "full",
  "color": "primary colors description",
  "edition": "e.g. 1997-98 Finals Edition, 2024-25 Home, City Edition, Hardwood Classics, etc.",
  "name": "Full descriptive e-commerce product name e.g. Chicago Bulls Michael Jordan #23 1997-98 Red Jersey",
  "subtitle": "Short subtitle e.g. Official Hardwood Classics · Red Mesh",
  "priceUSD": 850,
  "description": "Engaging 2-sentence product description highlighting fabric quality, embroidery, patches, fit, and authentic details.",
  "details": [
    "High-resolution official photography from the Google Drive collection",
    "Point 2 about logos and embroidery",
    "Point 3 about ventilation and fabric",
    "Point 4 about athletic fit and comfort",
    "Guaranteed nationwide doorstep delivery direct to your address"
  ],
  "material": "100% Recycled Technical Polyester Mesh",
  "fit": "Standard Athletic Fit",
  "sizes": ["S", "M", "L", "XL", "2XL"]
}`;

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
          { text: prompt },
          { inlineData: { mimeType: "image/jpeg", data } }
        ]
      });

      let text = res.text.trim();
      text = text.replace(/^\`\`\`json\\s*/i, "").replace(/^\`\`\`\\s*/, "").replace(/\`\`\`$/s, "").trim();
      const parsed = JSON.parse(text);
      cache[file] = parsed;
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      console.log(`[SUCCESS] ${file} -> ${parsed.name} (${parsed.sport})`);
      return parsed;
    } catch (err) {
      console.warn(`[ATTEMPT ${attempt} FAILED for ${file}]: ${err.message}`);
      await sleep(15000); // Wait 15s if rate limited
    }
  }
  return null;
}

async function run() {
  const missing = files.filter(f => !cache[f]);
  console.log(`Processing remaining ${missing.length} items...`);
  
  for (let i = 0; i < missing.length; i++) {
    const file = missing[i];
    const originalIdx = files.indexOf(file);
    const thumbPath = path.join(thumbDir, `${originalIdx}_thumb.jpg`);
    console.log(`[${i+1}/${missing.length}] ${file}...`);
    await analyzeWithRetry(file, thumbPath);
    await sleep(4200);
  }
  
  console.log(`\nAll done! Total in cache: ${Object.keys(cache).length} / ${files.length}`);
}

run();
