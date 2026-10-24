import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({});
const dir = "src/assets/images/drive_folder_1bv";
const cacheFile = "scripts/classified_cache_1bv.json";

let cache = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  } catch (e) {}
}

const files = fs.readdirSync(dir);

async function analyzeWithTimeout(file) {
  if (cache[file]) {
    console.log(`[CACHED] ${file} -> ${cache[file].name}`);
    return cache[file];
  }

  const filePath = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
  const data = fs.readFileSync(filePath).toString("base64");

  const prompt = `Analyze this sports apparel item accurately from this sports apparel collection.
Provide valid JSON ONLY with these fields (no markdown, no backticks):
{
  "sport": "basketball" | "football",
  "apparelType": "jersey" | "shorts" | "kit" | "hoodie" | "gear",
  "team": "Team Name (e.g. Chicago Bulls, Los Angeles Lakers, Boston Celtics, Brooklyn Nets, New York Knicks, Philadelphia 76ers, Golden State Warriors, San Antonio Spurs, Arsenal FC, Real Madrid, France, etc.)",
  "player": "Player Name if prominent/applicable (e.g. Michael Jordan, Kobe Bryant, LeBron James, Jayson Tatum, Stephen Curry, Jalen Brunson, Joel Embiid, Tim Duncan, etc.) or null",
  "number": "Player Number or null",
  "view": "front" | "back" | "full",
  "color": "primary colors description",
  "edition": "e.g. 1997-98 Finals Edition, Hardwood Classics, City Edition, Statement Edition, Association Edition, etc.",
  "name": "Full official e-commerce product name e.g. Chicago Bulls Michael Jordan #23 1997-98 Red Jersey",
  "subtitle": "Subtitle e.g. Official Hardwood Classics · Red Mesh",
  "priceUSD": 850,
  "description": "Engaging 2-3 sentence product description highlighting fabric quality, embroidery, patches, fit, and authentic details.",
  "details": [
    "High-resolution official photography from Google Drive folder 1bvEr66N9tSA74k60UzX_chpiXlvpKw5G",
    "Point 2 about logos and embroidery",
    "Point 3 about ventilation and fabric",
    "Point 4 about athletic fit and comfort",
    "Guaranteed nationwide doorstep delivery direct to your address"
  ],
  "material": "100% Breathable Technical Poly Mesh",
  "fit": "Standard Athletic Fit",
  "sizes": ["S", "M", "L", "XL", "2XL"]
}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 14000)
      );

      const apiPromise = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          { text: prompt },
          { inlineData: { mimeType, data } }
        ]
      });

      const res = await Promise.race([apiPromise, timeoutPromise]);
      let text = res.text.trim();
      text = text.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```$/s, "").trim();
      const parsed = JSON.parse(text);
      cache[file] = parsed;
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      console.log(`[CLASSIFIED] ${file} -> ${parsed.name} (${parsed.team}, ${parsed.sport})`);
      return parsed;
    } catch (err) {
      console.warn(`[WARN ${attempt}/3] ${file}: ${err.message}`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return null;
}

async function run() {
  const missing = files.filter(f => !cache[f]);
  console.log(`Analyzing ${missing.length} remaining items from folder 1bv...`);
  
  // Process in small batches of 2
  for (let i = 0; i < missing.length; i += 2) {
    const batch = missing.slice(i, i + 2);
    await Promise.all(batch.map(f => analyzeWithTimeout(f)));
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("All done! Total in cache:", Object.keys(cache).length);
}

run();
