import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});
const dir = 'src/assets/images/drive_jerseys';

// Read all files > 20000 bytes
const files = fs.readdirSync(dir).filter(f => {
  const stat = fs.statSync(path.join(dir, f));
  return stat.size > 20000;
});

console.log(`Found ${files.length} substantial files in ${dir}`);

// Check which files are already referenced in products.ts
const productsContent = fs.readFileSync('src/data/products.ts', 'utf-8');

const results = [];
const cacheFile = 'scripts/classified_cache.json';
let cache = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  } catch (e) {}
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function analyze(file) {
  if (cache[file]) {
    console.log(`[CACHED] ${file}`);
    return cache[file];
  }

  const filePath = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : (ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp');
  const data = fs.readFileSync(filePath).toString('base64');

  const prompt = `Analyze this sports item image accurately from a high-end authentic jerseys and sports apparel collection.
Provide valid JSON ONLY with these fields:
{
  "sport": "basketball" | "football",
  "apparelType": "jersey" | "shorts" | "kit" | "hoodie" | "gear",
  "team": "Team Name (e.g. Chicago Bulls, Los Angeles Lakers, Arsenal FC, Real Madrid, Boston Celtics, Brooklyn Nets, Paris Saint-Germain, Germany, France, etc.)",
  "player": "Player Name if prominent/applicable (e.g. Michael Jordan, Kobe Bryant, LeBron James, Jayson Tatum, Stephen Curry, etc.) or null",
  "number": "Player Number (e.g. 23, 24, 8, 0, 30, 11) or null",
  "view": "front" | "back" | "full" | "detail",
  "color": "primary colors description e.g. Classic Red & Black, White & Gold, Navy & Red, Royal Purple",
  "edition": "e.g. 1997-98 Finals Edition, 2026 Home Long-Sleeve, City Edition, Hardwood Classics, Statement Edition, etc.",
  "name": "Full official e-commerce product name e.g. Chicago Bulls Michael Jordan #23 1997-98 Red Jersey",
  "subtitle": "Subtitle e.g. Official Hardwood Classics · Red Mesh",
  "priceUSD": 850,
  "description": "Engaging 2-3 sentence product description highlighting fabric quality, embroidery, patches, fit, and authentic details.",
  "details": [
    "High-resolution official photography from the Google Drive collection",
    "Point 2 about logos/embroidery",
    "Point 3 about fabric/ventilation",
    "Point 4 about cut/comfort",
    "Guaranteed nationwide doorstep delivery direct to your address"
  ],
  "material": "e.g. 100% Recycled Polyester Mesh or Breathable Double-Knit Jacquard",
  "fit": "Standard Athletic Fit",
  "sizes": ["S", "M", "L", "XL", "2XL"]
}`;

  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: [
        { text: prompt },
        { inlineData: { mimeType, data } }
      ]
    });

    const clean = res.text.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(clean);
    cache[file] = parsed;
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
    console.log(`[CLASSIFIED] ${file} -> ${parsed.name} (${parsed.team}, ${parsed.sport})`);
    return parsed;
  } catch (err) {
    console.error(`[ERROR] ${file}:`, err.message);
    return null;
  }
}

async function run() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`Processing ${i + 1}/${files.length}: ${file}`);
    const result = await analyze(file);
    if (result) {
      results.push({ file, ...result });
    }
    await sleep(600); // Polite delay to stay well within rate limits
  }

  fs.writeFileSync('scripts/classified_jerseys_all.json', JSON.stringify(results, null, 2));
  console.log(`Successfully classified and saved ${results.length} items to scripts/classified_jerseys_all.json`);
}

run();
