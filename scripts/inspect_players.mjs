import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({});
const dir = 'src/assets/images/new_shirts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

async function inspectText(file) {
  const filePath = path.join(dir, file);
  const data = fs.readFileSync(filePath).toString('base64');
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        role: 'user',
        parts: [
          { text: "Examine this jersey image very closely. What text, player names, numbers, or badges are visible? Does it have a player name on it like Szoboszlai, Wirtz, Mbappe, Yamal, Ronaldo, Haaland, Gyokeres, Bruno Fernandes, etc.? Or does it have NO player name and number (plain)? Return JSON: {\"file\": \"" + file + "\", \"hasPlayerName\": boolean, \"playerName\": string|null, \"number\": string|null, \"team\": string, \"type\": string}" },
          { inlineData: { mimeType: 'image/png', data } }
        ]
      }]
    });
    const txt = res.text.trim().replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
    return JSON.parse(txt);
  } catch (err) {
    return { file, error: err.message };
  }
}

async function main() {
  const results = [];
  for (const f of files) {
    const info = await inspectText(f);
    results.push(info);
    console.log(`${f} -> Player: ${info.playerName || 'None (PLAIN)'} | Team: ${info.team} | Num: ${info.number}`);
    await new Promise(r => setTimeout(r, 400));
  }
  fs.writeFileSync('scripts/shirt_player_names.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
