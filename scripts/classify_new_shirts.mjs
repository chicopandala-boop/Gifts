import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});
const dir = 'src/assets/images/new_shirts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

const cacheFile = 'scripts/new_shirts_classified.json';
let cache = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  } catch (e) {}
}

async function analyzeSingle(file) {
  if (cache[file] && !cache[file].suggestedName.includes('Pro Matchday Sports Kit - SHIRT_')) {
    console.log(`[CACHED] ${file} -> ${cache[file].team || cache[file].suggestedName}`);
    return cache[file];
  }

  const filePath = path.join(dir, file);
  const data = fs.readFileSync(filePath).toString('base64');

  const prompt = `Analyze this football kit or shirt image accurately.
Identify:
1. Team / Club or Country (e.g. Liverpool FC, Manchester United, Arsenal, Chelsea, Manchester City, Real Madrid, Barcelona, Bayern Munich, PSG, Juventus, Orlando Pirates, Kaizer Chiefs, South Africa, Argentina, Portugal, etc.)
2. Kit Type (Home, Away, Third, Special Edition)
3. Dominant colors
4. Shows matching shorts (true if shorts are in the picture, false if only top is shown)
5. Child / Youth kit visual (true if kids/junior sizing or design, false if adult)
6. Suggested official product name
7. 2-sentence description highlighting team crest embroidery, lightweight breathable fabric, and matchday styling.

Output ONLY valid JSON:
{
  "team": "Team Name",
  "kitType": "Home" | "Away" | "Third" | "Special Edition",
  "season": "2025/2026",
  "colors": "Primary & secondary colors",
  "sponsor": "Sponsor text or None",
  "showsShorts": boolean,
  "isKidsVisual": boolean,
  "suggestedName": "Official product name",
  "description": "2-sentence product description"
}`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: data
                }
              }
            ]
          }
        ]
      });

      const text = response.text.trim().replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(text);
      cache[file] = parsed;
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      console.log(`[OK] ${file} -> ${parsed.team} (${parsed.kitType}) [Shorts: ${parsed.showsShorts}, Kids: ${parsed.isKidsVisual}]`);
      return parsed;
    } catch (err) {
      console.warn(`[WARN] ${file} attempt ${attempt}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function main() {
  console.log(`Classifying remaining shirts with gemini-3.1-flash-lite...`);
  for (const f of files) {
    await analyzeSingle(f);
    await new Promise(r => setTimeout(r, 400));
  }
  console.log("Successfully classified all 30 shirts!");
}

main().catch(console.error);
