import fs from 'fs';

// Define the clean, deduplicated product list for the new clothes
// Rules applied:
// 1. Orlando Pirates 2025/2026 Home set -> ADULT SET R350
// 2. Orlando Pirates 2024/2025 Away set -> ADULT SET R350
// 3. Orlando Pirates Away jersey -> SOCCER JERSEYS R220
// 4. Szoboszlai (#8 Liverpool) -> KIDS R300
// 5. Wirtz (#7) -> KIDS R300
// 6. Kits with no player names and numbers -> Adult category R350 (sets) or R220 (tops)
// 7. Deduplicated items:
//    - Real Madrid Home (shirt_15 front + shirt_12 Mbappé back) -> Kids R300
//    - Arsenal Home (shirt_17 front + shirt_13 Saka back) -> Kids R300
//    - Man Utd Home (shirt_29 front + shirt_14 Bruno back) -> Kids R300
//    - Man Utd Third (shirt_28 front + shirt_16 Bruno back) -> Kids R300
//    - Man City Home (shirt_18 front + shirt_30 Haaland back) -> Kids R300

const products = [
  // 1. Orlando Pirates 2025/2026 Home Set (Adult Set R350)
  {
    id: 'drive-new-pirates-2026-home-set',
    name: 'Orlando Pirates FC 2025/26 Home Matchday Set (Top + Shorts)',
    subtitle: 'Adults Set · Plain (No Names & Numbers) · Top + Matching Shorts',
    brand: 'Orlando Pirates',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 350,
    description: 'Official Orlando Pirates 2025/26 Home matchday set featuring the iconic geometric graphic pattern with signature red and gold accents. Complete with matching shorts, elasticated waistband, and embroidered skull & crossbones crest. Plain edition with no player names or numbers.',
    details: [
      'Complete Adult Set: Official Top + Matching Shorts included',
      'Plain edition with clean finish (no player names and numbers: R350)',
      'High-definition woven Orlando Pirates skull and crossbones crest',
      'Breathable moisture-wicking technical poly mesh engineered for matchday comfort',
      'Elasticated waistband shorts with secure internal drawcord',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt01Img',
    alternateImages: ['shirt01Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: '2025/2026 Home Kit Set'
  },

  // 2. Orlando Pirates 2024/2025 Away Set (Adult Set R350)
  {
    id: 'drive-new-pirates-away-set',
    name: 'Orlando Pirates FC 2024/25 Away Matchday Set (Top + Shorts)',
    subtitle: 'Adults Set · Plain (No Names & Numbers) · Top + Matching Shorts',
    brand: 'Orlando Pirates',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 350,
    description: 'Showcase your Buccaneers pride with the official 2024/25 Away set with matching black shorts. Clean, plain finish with authentic club crest embroidery and vintage trefoil styling built for matchday flair.',
    details: [
      'Complete Adult Set: Official Top + Matching Shorts included',
      'Plain edition with clean finish (no player names and numbers: R350)',
      'High-definition woven Orlando Pirates crest and Vodacom sponsorship',
      'Lightweight, breathable quick-dry technical fabric',
      'Matching athletic cut shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt05Img',
    alternateImages: ['shirt05Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Away Kit Set'
  },

  // 3. Orlando Pirates Away Jersey (Soccer Jerseys R220)
  {
    id: 'drive-new-pirates-away-jersey',
    name: 'Orlando Pirates FC 2024/25 Away Matchday Jersey (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Orlando Pirates',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Authentic Orlando Pirates 2024/25 Away matchday top in cream and off-white with gold accents. Features high-quality club crest embroidery on lightweight breathable fabric. Clean plain finish with no player names and numbers.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered club crest and official Vodacom sponsor',
      'Ultra-breathable honeycomb mesh engineered for superior ventilation',
      'Standard athletic comfort fit for everyday wear and match days',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt24Img',
    alternateImages: ['shirt24Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Away Jersey'
  },

  // 4. South Africa 1996 Retro Set (Adult Set R350 - no player names/numbers)
  {
    id: 'drive-new-south-africa-retro-set',
    name: 'South Africa 1996 Retro Matchday Set (Top + Shorts)',
    subtitle: 'Adults Set · Plain (No Names & Numbers) · Top + Matching Shorts',
    brand: 'South Africa',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 350,
    description: 'Iconic South Africa 1996 retro nation matchday set featuring the historic green, yellow, and white geometric pattern. Includes matching shorts with elasticated waistband. Plain edition with no player names or numbers.',
    details: [
      'Complete Adult Set: Official Top + Matching Shorts included',
      'Plain edition with clean finish (no player names and numbers: R350)',
      'Embroidered national crest and authentic retro heritage pattern',
      'Breathable athletic fabric crafted for matchday comfort',
      'Matching green shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt08Img',
    alternateImages: ['shirt08Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: '1996 Retro Commemorative Set'
  },

  // 5. Liverpool FC Szoboszlai #8 Kids Set (Kids R300 - "PLACE SZOBOSLAZAI IN KIDS")
  {
    id: 'drive-new-liverpool-szoboszlai-kids',
    name: 'Liverpool FC 2024/25 Szoboszlai #8 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Liverpool FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Liverpool FC 2024/25 Home junior kit set featuring Dominik Szoboszlai #8. Crafted from lightweight breathable fabric with an embroidered Liverbird crest, matching red shorts, and authentic matchday styling for young Reds supporters.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Szoboszlai #8 official print included (R300)',
      'Embroidered Liverbird crest and official Expedia / Standard Chartered branding',
      'Lightweight moisture-wicking weave for active children',
      'Elasticated waistband shorts with secure fit',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt09Img',
    alternateImages: ['shirt09Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 6. Wirtz #7 Kids Set (Kids R300 - "WRTZZ IN KIDS")
  {
    id: 'drive-new-wirtz-kids',
    name: 'Wirtz #7 White Away Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Liverpool FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official junior kit set featuring Florian Wirtz #7 print in clean white and red matchday styling. Includes matching athletic shorts with elasticated waistband and club memorial crest on neck.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Wirtz #7 official print included (R300)',
      'Embroidered team crest and authentic matchday styling',
      'Lightweight breathable fabric designed for young players',
      'Matching shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt10Img',
    alternateImages: ['shirt10Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Away Junior Set'
  },

  // 7. FC Barcelona Lamine Yamal #10 Kids Set (Kids R300)
  {
    id: 'drive-new-barca-yamal-kids',
    name: 'FC Barcelona 2024/25 Lamine Yamal #10 Kids Home Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'FC Barcelona',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official FC Barcelona junior home kit featuring superstar Lamine Yamal #10. Classic Blaugrana vertical stripes with embroidered Barca crest, matching shorts, and breathable performance mesh.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Lamine Yamal #10 official print included (R300)',
      'Embroidered FC Barcelona crest and Barca Foundation branding',
      'Lightweight breathable fabric designed for play and matchdays',
      'Matching navy/garnet shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt04Img',
    alternateImages: ['shirt04Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 8. Al Nassr FC Cristiano Ronaldo #7 Kids Set (Kids R300)
  {
    id: 'drive-new-alnassr-ronaldo-kids',
    name: 'Al Nassr FC 2024/25 Ronaldo #7 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Al Nassr FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Al Nassr FC home junior kit in vibrant victory yellow with navy blue trim. Featuring Cristiano Ronaldo #7 shorts and jersey, woven club crest, and lightweight breathable comfort.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Cristiano Ronaldo #7 print included (R300)',
      'Embroidered Al Nassr FC crest and KAFD sponsorship',
      'Breathable moisture-wicking technical fabric for young athletes',
      'Matching yellow shorts with #7 print and elasticated waist',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt06Img',
    alternateImages: ['shirt06Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 9. Arsenal FC Gyökeres #14 Kids Set (Kids R300)
  {
    id: 'drive-new-arsenal-gyokeres-kids',
    name: 'Arsenal FC Gyökeres #14 Kids Third Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Arsenal FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Arsenal Third kit in navy, red, and yellow trim featuring Viktor Gyökeres #14. High-definition club crest, vintage cannon detailing, and matching navy shorts with elastic waistband.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Gyökeres #14 print included (R300)',
      'Embroidered cannon crest and retro collar accents',
      'Lightweight breathable fabric for all-day comfort',
      'Matching athletic cut shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt07Img',
    alternateImages: ['shirt07Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Junior Set'
  },

  // 10. Chelsea FC Cole Palmer #10 Kids Set (Kids R300)
  {
    id: 'drive-new-chelsea-palmer-kids',
    name: 'Chelsea FC 2024/25 Cole Palmer #10 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Chelsea FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Chelsea FC 2024/25 Home junior kit set featuring Cole Palmer #10. Classic royal blue with yellow accents, polo collar, woven Chelsea lion crest, and matching blue shorts.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Palmer #10 official print included (R300)',
      'Embroidered Chelsea club crest and signature polo collar',
      'Breathable quick-drying fabric for active children',
      'Matching shorts with elasticated waistband and club lion',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt11Img',
    alternateImages: ['shirt11Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 11. Real Madrid Kylian Mbappé #10 Home Kids Set (DEDUPLICATED: shirt_15 Front + shirt_12 Mbappé Back) -> Kids R300
  {
    id: 'drive-new-real-madrid-mbappe-kids',
    name: 'Real Madrid 2024/25 Kylian Mbappé #10 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Real Madrid',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Real Madrid 2024/25 Home junior kit featuring galáctico Kylian Mbappé #10. Includes both pristine white matchday jersey and matching shorts with club crests. High-resolution front and back photography included.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Complete Front & Back views: Emirates sponsor front + Mbappé #10 back',
      'Player Personalised: Kylian Mbappé #10 official print included (R300)',
      'Woven Real Madrid club crest and Adidas 3-stripes detailing',
      'Matching white shorts with elastic waistband and #10 print',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt15Img',
    alternateImages: ['shirt15Img', 'shirt12Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 12. Arsenal FC Bukayo Saka #7 Home Kids Set (DEDUPLICATED: shirt_17 Front + shirt_13 Saka Back) -> Kids R300
  {
    id: 'drive-new-arsenal-saka-kids',
    name: 'Arsenal FC 2024/25 Bukayo Saka #7 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Arsenal FC',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Arsenal FC 2024/25 Home mini kit featuring Bukayo Saka #7. Iconic red torso with white raglan sleeves, embroidered cannon crest, Emirates sponsor front, and Saka #7 back with matching white shorts.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Complete Front & Back views: Emirates sponsor front + Saka #7 back',
      'Player Personalised: Bukayo Saka #7 official print included (R300)',
      'Embroidered Arsenal cannon badge and navy accent piping',
      'Matching white shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt17Img',
    alternateImages: ['shirt17Img', 'shirt13Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 13. Manchester United Bruno Fernandes #8 Home Kids Set (DEDUPLICATED: shirt_29 Front + shirt_14 Bruno Back) -> Kids R300
  {
    id: 'drive-new-man-united-home-bruno-kids',
    name: 'Manchester United 2024/25 Bruno Fernandes #8 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Manchester United',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Manchester United 2024/25 Home junior kit featuring captain Bruno Fernandes #8. Iconic Red Devils red with Snapdragon front, B. Fernandes #8 back, and matching white shorts.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Complete Front & Back views: Snapdragon sponsor front + B. Fernandes #8 back',
      'Player Personalised: Bruno Fernandes #8 official print included (R300)',
      'Embroidered Manchester United crest and Adidas trim',
      'Matching white shorts with elasticated waistband and club crest',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt29Img',
    alternateImages: ['shirt29Img', 'shirt14Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 14. Manchester United Bruno Fernandes #8 Third Kids Set (DEDUPLICATED: shirt_28 Front + shirt_16 Bruno Back) -> Kids R300
  {
    id: 'drive-new-man-united-third-bruno-kids',
    name: 'Manchester United 2024/25 Bruno Fernandes #8 Third Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Manchester United',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Manchester United 2024/25 Third kit in bold blue, red, and off-white trefoil styling featuring Bruno Fernandes #8. Complete with matching shorts, Snapdragon front, and Fernandes #8 back.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Complete Front & Back views: Trefoil & Snapdragon front + Fernandes #8 back',
      'Player Personalised: Bruno Fernandes #8 official print included (R300)',
      'Retro Manchester United crest embroidery and tricolor chest band',
      'Matching navy/blue shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt28Img',
    alternateImages: ['shirt28Img', 'shirt16Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Junior Set'
  },

  // 15. Manchester City Erling Haaland #9 Home Kids Set (DEDUPLICATED: shirt_18 Front + shirt_30 Haaland Back) -> Kids R300
  {
    id: 'drive-new-man-city-haaland-home-kids',
    name: 'Manchester City 2024/25 Erling Haaland #9 Home Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Manchester City',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Official Manchester City 2024/25 Home junior kit featuring goal machine Erling Haaland #9. Classic sky blue with 0161 collar detailing, Etihad Airways front, Haaland #9 back, and matching white shorts.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Complete Front & Back views: Etihad Airways front + Haaland #9 back',
      'Player Personalised: Erling Haaland #9 official print included (R300)',
      'Embroidered Manchester City crest and 0161 Manchester area code graphic',
      'Matching white shorts with elasticated waistband and club crest',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt18Img',
    alternateImages: ['shirt18Img', 'shirt30Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Junior Set'
  },

  // 16. Manchester City Erling Haaland #9 Third Kids Set (shirt_26) -> Kids R300
  {
    id: 'drive-new-man-city-haaland-third-kids',
    name: 'Manchester City 2024/25 Erling Haaland #9 Third Kids Kit Set',
    subtitle: "Kid's Set · Player Personalised · Jersey + Shorts (Sizes 4-14)",
    brand: 'Manchester City',
    category: 'Official Youth and Football Kits',
    sport: 'kids_football',
    apparelType: 'kids_kit',
    ageGroup: 'kids',
    priceUSD: 300,
    customizablePriceUSD: 300,
    description: 'Manchester City special edition Third junior kit featuring gold and burgundy accents with Haaland #9. Complete set with matching athletic shorts and embroidered club crest.',
    details: [
      'Official Youth & Football Kit with matching shorts included',
      'Player Personalised: Haaland #9 official print included (R300)',
      'High-density Manchester City crest embroidery and gold accents',
      'Lightweight, breathable technical fabric for young footballers',
      'Matching shorts with elasticated waistband',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Youth Athletic Fit (Ages 4-14)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt26Img',
    alternateImages: ['shirt26Img'],
    sizes: ['Age 4-5', 'Age 6-7', 'Age 8-9', 'Age 10-11', 'Age 12-13', 'Age 14'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Junior Set'
  },

  // === ADULT SOCCER JERSEYS (TOPS PLAIN R220) ===

  // 17. Manchester City 2025/2026 Third Adult Top (Plain R220)
  {
    id: 'drive-new-man-city-third-top',
    name: 'Manchester City 2025/26 Third Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Manchester City',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Sleek Manchester City 2025/26 Third jersey in crisp white with sky blue and navy accents. Embroidered club crest and Etihad Airways sponsor in a clean plain finish with no player names or numbers.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Woven Manchester City crest and official Puma technical details',
      'Ultra-breathable dryCELL performance mesh fabric',
      'Standard athletic comfort fit for everyday wear and match days',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt02Img',
    alternateImages: ['shirt02Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: '2025/2026 Third Jersey'
  },

  // 18. Chelsea FC Special Edition Polo Adult Top (Plain R220)
  {
    id: 'drive-new-chelsea-polo-top',
    name: 'Chelsea FC Special Edition Polo Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Chelsea FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Showcase your Blues pride with this classic polo-collar Chelsea jersey featuring premium team embroidery and an embossed tonal crest. Clean plain finish with no player names and numbers.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered Chelsea lion crest and classic ribbed polo collar',
      'Lightweight, breathable quick-drying performance fabric',
      'Standard athletic comfort fit for supporters',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt03Img',
    alternateImages: ['shirt03Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: 'Special Edition Polo Jersey'
  },

  // 19. Real Madrid 2024/2025 Third Adult Top (Plain R220)
  {
    id: 'drive-new-real-madrid-third-top',
    name: 'Real Madrid 2024/25 Third Authentic Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Real Madrid',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Sophisticated Real Madrid 2024/25 Third jersey in charcoal with subtle monogram patterning, Emirates Fly Better sponsor, and monochromatic club crest embroidery. Clean plain finish.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered Real Madrid crest and adidas Trefoil branding',
      'Heat-dispersing breathable poly mesh weave',
      'Standard athletic comfort fit for dedicated Madridistas',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt19Img',
    alternateImages: ['shirt19Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Jersey'
  },

  // 20. Liverpool FC 2024/2025 Third Red Pattern Adult Top (Plain R220)
  {
    id: 'drive-new-liverpool-third-red-top',
    name: 'Liverpool FC 2024/25 Third Pattern Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Liverpool FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Dynamic Liverpool FC 2024/25 Third shirt with all-over red graphic pattern, Standard Chartered sponsor, and woven Liverbird crest. Clean plain finish with no player names and numbers.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered Liverbird crest and official club sponsor branding',
      'Breathable technical knit fabric engineered for matchday comfort',
      'Standard athletic fit for passionate supporters',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt20Img',
    alternateImages: ['shirt20Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Jersey'
  },

  // 21. FC Barcelona 2023/2024 Home Stadium Adult Top (Plain R220)
  {
    id: 'drive-new-barca-home-top',
    name: 'FC Barcelona Home Stadium Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'FC Barcelona',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Iconic FC Barcelona home jersey with classic Blaugrana vertical stripes, Spotify front sponsor, and woven club crest with embroidered gold star. Clean plain finish.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered FC Barcelona club crest and Nike swoosh',
      'Dri-FIT breathable moisture-control fabric',
      'Standard athletic fit for everyday wear and stadium chants',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt21Img',
    alternateImages: ['shirt21Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: 'Home Stadium Jersey'
  },

  // 22. Chelsea FC 2024/2025 Third Stadium Adult Top (Plain R220)
  {
    id: 'drive-new-chelsea-third-top',
    name: 'Chelsea FC 2024/25 Third Stadium Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Chelsea FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Modern Chelsea FC 2024/25 Third stadium jersey in anthracite with electric volt accents. Clean plain finish with embroidered club lion crest and athletic performance cut.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'High-definition woven Chelsea lion crest in vibrant volt yellow',
      'Lightweight, breathable quick-dry technical fabric',
      'Standard athletic comfort fit',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt22Img',
    alternateImages: ['shirt22Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Third Jersey'
  },

  // 23. Arsenal FC 2024/2025 Away Gold/Black Adult Top (Plain R220)
  {
    id: 'drive-new-arsenal-away-gold-top',
    name: 'Arsenal FC 2024/25 Away Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Arsenal FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Striking Arsenal FC 2024/25 Away jersey in champagne gold with black and red accents. Features the minimalist cannon crest embroidery, Emirates Fly Better sponsor, and clean plain finish.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered Arsenal cannon crest and Emirates Fly Better branding',
      'Lightweight technical knit fabric engineered for optimal breathability',
      'Standard athletic comfort fit',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt23Img',
    alternateImages: ['shirt23Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Away Jersey'
  },

  // 24. Liverpool FC 2024/2025 Originals White/Red Third Adult Top (Plain R220)
  {
    id: 'drive-new-liverpool-originals-white-top',
    name: 'Liverpool FC 2024/25 Originals Third Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Liverpool FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Clean Liverpool FC 2024/25 adidas Originals Third shirt in crisp white with platinum red accents, Trefoil branding, and retro Liverbird crest. Clean plain finish with no player names or numbers.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered retro Liverbird crest and vintage Trefoil branding',
      'Premium breathable soft-touch poly blend',
      'Standard athletic comfort fit',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt25Img',
    alternateImages: ['shirt25Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Originals Third Jersey'
  },

  // 25. Paris Saint-Germain 2023/2024 Home Adult Top (Plain R220)
  {
    id: 'drive-new-psg-home-top',
    name: 'Paris Saint-Germain 2024/25 Home Matchday Top (Plain)',
    subtitle: 'Adults Top · Plain (No Names & Numbers) · Matchday Jersey',
    brand: 'Paris Saint-Germain',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    ageGroup: 'adult',
    priceUSD: 220,
    description: 'Official Paris Saint-Germain home jersey featuring the iconic midnight blue body with gradient red and white central stripe, Qatar Airways front sponsor, and woven PSG Eiffel Tower crest. Clean plain finish.',
    details: [
      'Official Matchday Top only (Plain: R220)',
      'Plain finish with no player names and numbers',
      'Embroidered Paris Saint-Germain club crest and Jordan / Nike branding',
      'Breathable quick-drying performance fabric',
      'Standard athletic comfort fit for Parc des Princes faithful',
      'Guaranteed nationwide doorstep delivery'
    ],
    material: '100% Breathable Technical Poly Mesh',
    fit: 'Standard Athletic Fit (Adults)',
    origin: 'Official Licensed Merchandise',
    primaryImage: 'shirt27Img',
    alternateImages: ['shirt27Img'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2025',
    edition: '2024/2025 Home Jersey'
  }
];

// Generate the file
let code = `import { Product } from '../types/store';\n\n`;

// Imports for the images used
const usedImgs = [
  'shirt01Img', 'shirt02Img', 'shirt03Img', 'shirt04Img', 'shirt05Img',
  'shirt06Img', 'shirt07Img', 'shirt08Img', 'shirt09Img', 'shirt10Img',
  'shirt11Img', 'shirt12Img', 'shirt13Img', 'shirt14Img', 'shirt15Img',
  'shirt16Img', 'shirt17Img', 'shirt18Img', 'shirt19Img', 'shirt20Img',
  'shirt21Img', 'shirt22Img', 'shirt23Img', 'shirt24Img', 'shirt25Img',
  'shirt26Img', 'shirt27Img', 'shirt28Img', 'shirt29Img', 'shirt30Img'
];

for (const img of usedImgs) {
  const num = img.replace('shirt', '').replace('Img', '');
  code += `import ${img} from '../assets/images/new_shirts/shirt_${num}.png';\n`;
}

code += `\nexport const NEW_DRIVE_FOLDER_SHIRTS: Product[] = [\n`;

for (const p of products) {
  code += `  {\n`;
  code += `    id: ${JSON.stringify(p.id)},\n`;
  code += `    name: ${JSON.stringify(p.name)},\n`;
  code += `    subtitle: ${JSON.stringify(p.subtitle)},\n`;
  code += `    brand: ${JSON.stringify(p.brand)},\n`;
  code += `    category: ${JSON.stringify(p.category)},\n`;
  code += `    sport: ${JSON.stringify(p.sport)},\n`;
  code += `    apparelType: ${JSON.stringify(p.apparelType)},\n`;
  code += `    ageGroup: ${JSON.stringify(p.ageGroup)},\n`;
  code += `    priceUSD: ${p.priceUSD},\n`;
  if (p.customizablePriceUSD) {
    code += `    customizablePriceUSD: ${p.customizablePriceUSD},\n`;
  }
  code += `    description: ${JSON.stringify(p.description)},\n`;
  code += `    details: ${JSON.stringify(p.details, null, 6).replace(/\\n/g, '\n    ')},\n`;
  code += `    material: ${JSON.stringify(p.material)},\n`;
  code += `    fit: ${JSON.stringify(p.fit)},\n`;
  code += `    origin: ${JSON.stringify(p.origin)},\n`;
  code += `    primaryImage: ${p.primaryImage},\n`;
  code += `    alternateImages: [${p.alternateImages.join(', ')}],\n`;
  code += `    sizes: ${JSON.stringify(p.sizes)},\n`;
  code += `    inStock: true,\n`;
  code += `    releaseYear: ${JSON.stringify(p.releaseYear)},\n`;
  code += `    edition: ${JSON.stringify(p.edition)}\n`;
  code += `  },\n`;
}

code += `];\n`;

fs.writeFileSync('src/data/newDriveShirts.ts', code);
console.log(`Generated clean src/data/newDriveShirts.ts with ${products.length} deduplicated products!`);
