import fs from 'fs';

const classified = JSON.parse(fs.readFileSync('scripts/new_shirts_classified.json', 'utf-8'));

let importsCode = "import { Product } from '../types/store';\n\n";

for (let i = 1; i <= 30; i++) {
  const num = String(i).padStart(2, '0');
  importsCode += `import shirt${num}Img from '../assets/images/new_shirts/shirt_${num}.png';\n`;
}

const youthSizes = `['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14']`;
const adultSizes = `['S', 'M', 'L', 'XL', '2XL']`;

let productsCode = `
export const NEW_DRIVE_FOLDER_SHIRTS: Product[] = [
`;

for (let i = 1; i <= 30; i++) {
  const num = String(i).padStart(2, '0');
  const fileKey = `shirt_${num}.png`;
  const info = classified[fileKey] || {};

  const isKids = Boolean(info.isKidsVisual);
  const showsShorts = Boolean(info.showsShorts);

  let priceUSD = 220;
  let category = 'Kits & Jerseys';
  let sport = 'football';
  let apparelType = 'jersey';
  let ageGroup = 'adult';
  let sizes = adultSizes;
  let subtitle = '';
  let customizablePriceUSD = undefined;
  let details = [];

  if (isKids) {
    // R300 kid's sets player personalised
    priceUSD = 300;
    customizablePriceUSD = 300;
    category = 'Official Youth and Football Kits';
    sport = 'kids_football';
    apparelType = 'kids_kit';
    ageGroup = 'kids';
    sizes = youthSizes;
    subtitle = `Kid's Set · Player Personalised · Jersey + Matching Shorts (Sizes 4-14)`;
    details = [
      "Official Youth & Football Kit with matching shorts included",
      "Player Personalised (custom name & number printing included: R300)",
      "High-density club crest and official sponsor branding",
      "Breathable moisture-wicking technical poly mesh for active juniors",
      "Elasticated waistband shorts with secure drawstring",
      "Guaranteed nationwide doorstep delivery"
    ];
  } else if (showsShorts) {
    // R350 adults sets (plain with no player names and numbers)
    priceUSD = 350;
    category = 'Kits & Jerseys';
    sport = 'football';
    apparelType = 'jersey';
    ageGroup = 'adult';
    sizes = adultSizes;
    subtitle = `Adults Set · Plain (No Names & Numbers) · Top + Matching Shorts`;
    details = [
      "Complete Adults Matchday Set: Top + Matching Shorts included",
      "Plain edition with clean finish (no player names and numbers: R350)",
      "Embroidered club crest and official technical sponsors",
      "Ultra-breathable honeycomb mesh engineered for matchday comfort",
      "Matching shorts with reinforced drawcord and athletic cut",
      "Guaranteed nationwide doorstep delivery"
    ];
  } else {
    // R220 adults tops plain
    priceUSD = 220;
    category = 'Kits & Jerseys';
    sport = 'football';
    apparelType = 'jersey';
    ageGroup = 'adult';
    sizes = adultSizes;
    subtitle = `Adults Top · Plain (No Names & Numbers) · Matchday Jersey`;
    details = [
      "Authentic Adults Matchday Top (Plain: R220)",
      "Plain finish with no player names and numbers",
      "High-definition embroidered club crest and team details",
      "Lightweight, breathable quick-dry technical poly fabric",
      "Standard athletic comfort fit for everyday wear and match days",
      "Guaranteed nationwide doorstep delivery"
    ];
  }

  const team = info.team || 'Football Club';
  const kitType = info.kitType || 'Home';
  const name = info.suggestedName || `${team} 2025/2026 ${kitType} ${isKids ? "Kids Kit Set" : showsShorts ? "Adult Set" : "Adult Top"}`;
  const description = info.description || `Crafted from breathable technical fabric with woven club crest and championship matchday styling. Perfect for passionate supporters.`;

  productsCode += `  {
    id: 'drive-new-${num}',
    name: ${JSON.stringify(name)},
    subtitle: ${JSON.stringify(subtitle)},
    brand: ${JSON.stringify(team)},
    category: ${JSON.stringify(category)},
    sport: ${JSON.stringify(sport)},
    apparelType: ${JSON.stringify(apparelType)},
    ageGroup: ${JSON.stringify(ageGroup)},
    priceUSD: ${priceUSD},
${customizablePriceUSD !== undefined ? `    customizablePriceUSD: ${customizablePriceUSD},\n` : ''}    description: ${JSON.stringify(description)},
    details: ${JSON.stringify(details, null, 6).replace(/\n/g, '\n    ')},
    material: '100% Breathable Technical Poly Mesh',
    fit: ${JSON.stringify(isKids ? "Youth Athletic Fit (Ages 4-14)" : "Standard Athletic Fit (Adults)")},
    origin: 'Official Licensed Merchandise',
    primaryImage: shirt${num}Img,
    alternateImages: [shirt${num}Img],
    sizes: ${sizes},
    inStock: true,
    releaseYear: '2026',
    edition: ${JSON.stringify(info.season || '2025/2026')}
  },
`;
}

productsCode += `];\n`;

const fullFile = importsCode + productsCode;
fs.writeFileSync('src/data/newDriveShirts.ts', fullFile);
console.log("Wrote src/data/newDriveShirts.ts successfully!");
