import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});
const dir = 'src/assets/images/new_shirts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

// Group files by team/appearance to check duplicates
// Let's inspect potential duplicate pairs:
// E.g.
// Real Madrid 24/25 Home: shirt_12 (kids Mbappé), shirt_15 (adult top)
// Arsenal 24/25 Home: shirt_13 (kids Saka), shirt_17 (adult top)
// Manchester City 24/25 Home: shirt_18 (adult top), shirt_30 (kids Haaland)
// Manchester United 24/25 Home: shirt_14 (kids Bruno), shirt_29 (adult top)
// Manchester United 24/25 Third: shirt_16 (kids Bruno), shirt_28 (adult top)
// Liverpool Third: shirt_20 vs shirt_25 ?
// Manchester City Third: shirt_02 vs shirt_26 ?
// Let's check if shirt_20 and shirt_25 or any other files are duplicate images of the exact same shirt!

async function checkPairs(pairs) {
  for (const [a, b] of pairs) {
    const dataA = fs.readFileSync(path.join(dir, a)).toString('base64');
    const dataB = fs.readFileSync(path.join(dir, b)).toString('base64');
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        role: 'user',
        parts: [
          { text: "Are these two images showing the exact same product/shirt (or the exact same photograph/item)? Describe difference if any, or state DUPLICATE." },
          { inlineData: { mimeType: 'image/png', data: dataA } },
          { inlineData: { mimeType: 'image/png', data: dataB } }
        ]
      }]
    });
    console.log(`Compare ${a} vs ${b}: ${res.text.trim().replace(/\n/g, ' ')}`);
  }
}

// Check suspicious pairs:
// shirt_20 vs shirt_25 (both Liverpool Third)
// shirt_02 vs shirt_26 (both Man City Third)
// shirt_14 vs shirt_29 (Man Utd Home)
// shirt_16 vs shirt_28 (Man Utd Third)
// shirt_17 vs shirt_13 (Arsenal Home)
// shirt_15 vs shirt_12 (Real Madrid Home)
// shirt_05 vs shirt_24 (Pirates Away)
checkPairs([
  ['shirt_20.png', 'shirt_25.png'],
  ['shirt_02.png', 'shirt_26.png'],
  ['shirt_05.png', 'shirt_24.png'],
  ['shirt_14.png', 'shirt_29.png'],
  ['shirt_16.png', 'shirt_28.png']
]).catch(console.error);
