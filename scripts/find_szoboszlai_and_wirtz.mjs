import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});
const dir = 'src/assets/images/new_shirts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

async function checkPlayerNames() {
  for (const f of files) {
    const data = fs.readFileSync(path.join(dir, f)).toString('base64');
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [{
          role: 'user',
          parts: [
            { text: "Does this sports item photo show any player name or number (printed or tags, e.g. Szoboszlai, Wirtz, Mbappé, Ronaldo, Yamal, Haaland, Bruno Fernandes, Gyökeres, Saka, Palmer, etc.)? If so, which player and number? What team? If there is NO player name or number, reply 'NO PLAYER NAME/NUMBER'." },
            { inlineData: { mimeType: 'image/png', data } }
          ]
        }]
      });
      console.log(`[${f}] ${res.text.trim().replace(/\n/g, ' ')}`);
    } catch (e) {
      console.error(`Error on ${f}:`, e.message);
    }
  }
}

checkPlayerNames().catch(console.error);
