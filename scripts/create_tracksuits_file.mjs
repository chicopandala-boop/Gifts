import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('scripts/tracksuits_manifest.json', 'utf-8'));

let code = `import { Product } from '../types/store';\n\n`;

for (let i = 1; i <= 12; i++) {
  const num = String(i).padStart(2, '0');
  code += `import tracksuit${num}Img from '../assets/images/tracksuits/tracksuit_${num}.png';\n`;
}

code += `\nexport const INITIAL_TRACKSUITS: Product[] = [\n`;

for (let i = 1; i <= 12; i++) {
  const num = String(i).padStart(2, '0');
  const key = `tracksuit_${num}.png`;
  const item = manifest[key];
  const a = item.analysis;

  code += `  {\n`;
  code += `    id: 'tracksuit-${num}',\n`;
  code += `    name: ${JSON.stringify(a.name)},\n`;
  code += `    subtitle: ${JSON.stringify(a.subtitle || 'Official Matchday Tracksuit · Full Zip Jacket + Tapered Pants')},\n`;
  code += `    brand: ${JSON.stringify(a.team)},\n`;
  code += `    category: 'Tracksuits',\n`;
  code += `    sport: 'football',\n`;
  code += `    apparelType: 'tracksuit',\n`;
  code += `    ageGroup: 'adult',\n`;
  code += `    priceUSD: ${a.priceUSD || 650},\n`;
  code += `    description: ${JSON.stringify(a.description)},\n`;
  code += `    details: ${JSON.stringify([
    "Complete Official Tracksuit: Full-zip jacket + matching tapered pants",
    "High-density club crest and technical sponsor embroidery",
    "Moisture-wicking breathable poly-knit performance fabric",
    "Secure zippered side pockets on both jacket and training pants",
    "Elasticated waistband with adjustable drawstring",
    "Guaranteed nationwide doorstep delivery"
  ], null, 6).replace(/\\n/g, '\n    ')},\n`;
  code += `    material: '100% Breathable Performance Poly-Knit',\n`;
  code += `    fit: 'Standard Athletic Performance Fit',\n`;
  code += `    origin: 'Official Licensed Merchandise',\n`;
  code += `    primaryImage: tracksuit${num}Img,\n`;
  code += `    alternateImages: [tracksuit${num}Img],\n`;
  code += `    sizes: ['S', 'M', 'L', 'XL', '2XL'],\n`;
  code += `    inStock: true,\n`;
  code += `    releaseYear: '2026',\n`;
  code += `    edition: '2025/2026 Official Training Tracksuit'\n`;
  code += `  },\n`;
}

code += `];\n`;

fs.writeFileSync('src/data/tracksuits.ts', code);
console.log("Wrote src/data/tracksuits.ts successfully!");
