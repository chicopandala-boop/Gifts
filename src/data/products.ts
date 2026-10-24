import franceKitImg from '../assets/images/france_kit.png';
import argentinaImg from '../assets/images/highlight_blue_shirt.png';
import psgImg from '../assets/images/shirt.png';
import manUtdImg from '../assets/images/man.png';
import liverpoolImg from '../assets/images/WhatsApp_Image_matchday.png';
import bayernImg from '../assets/images/WhatsApp_Image_club.png';
import realMadridAwayImg from '../assets/images/REAL_MADRID_2.png';
import stadiumEditionImg from '../assets/images/sven-kucinic-Z0KjmjxUsKs-unsplash.jpg';
import courtBallImg from '../assets/images/charlesdeluvio-LajNZRWPVmI-unsplash.jpg';
import lyleFosterPng from '../assets/images/lyle_foster.png';
import basketballPlayerPng from '../assets/images/jamal_crawford.png';

// Authentic 14 Jersey Pairs (28 high-resolution images) from Google Drive folder 1bvEr66N9tSA74k60UzX_chpiXlvpKw5G
import lakersKobeFrontImg from '../assets/images/catalog_1bv/lakers_kobe_mamba_24_front.png';
import lakersKobeBackImg from '../assets/images/catalog_1bv/lakers_kobe_mamba_24_back.png';
import lakersLebronFrontImg from '../assets/images/catalog_1bv/lakers_lebron_23_white_front.png';
import lakersLebronBackImg from '../assets/images/catalog_1bv/lakers_lebron_23_white_back.png';
import lakersShaqFrontImg from '../assets/images/catalog_1bv/lakers_shaq_34_gold_front.png';
import lakersShaqBackImg from '../assets/images/catalog_1bv/lakers_shaq_34_gold_back.png';
import lakersKareemGoldFrontImg from '../assets/images/catalog_1bv/lakers_kareem_33_gold_front.png';
import lakersKareemBlueBackImg from '../assets/images/catalog_1bv/lakers_kareem_33_blue_back.png';
import celticsBirdFrontImg from '../assets/images/catalog_1bv/celtics_larry_bird_33_front.png';
import celticsBirdBackImg from '../assets/images/catalog_1bv/celtics_larry_bird_33_back.png';
import bullsJordanWhiteFrontImg from '../assets/images/catalog_1bv/bulls_jordan_white_front.png';
import bullsJordanWhiteBackImg from '../assets/images/catalog_1bv/bulls_jordan_white_back.png';
import bullsJordanRedFrontImg from '../assets/images/catalog_1bv/bulls_jordan_red_front.png';
import bullsJordanRedBackImg from '../assets/images/catalog_1bv/bulls_jordan_red_back.png';
import bullsJordanBlackFrontImg from '../assets/images/catalog_1bv/bulls_jordan_black_front.png';
import bullsJordanBlackBackImg from '../assets/images/catalog_1bv/bulls_jordan_black_back.png';
import bullsJordanSplitFrontImg from '../assets/images/catalog_1bv/bulls_jordan_split_front.png';
import bullsJordanSplitBackImg from '../assets/images/catalog_1bv/bulls_jordan_split_back.png';
import warriorsCurryBlueFrontImg from '../assets/images/catalog_1bv/warriors_curry_blue_front.png';
import warriorsCurryBlueBackImg from '../assets/images/catalog_1bv/warriors_curry_blue_back.png';
import warriorsCurryWhiteFrontImg from '../assets/images/catalog_1bv/warriors_curry_white_front.png';
import sixersEmbiidBackImg from '../assets/images/catalog_1bv/sixers_embiid_black_back.png';
import spursDuncanFrontImg from '../assets/images/catalog_1bv/spurs_duncan_black_front.png';
import knicksBrunsonFrontImg from '../assets/images/catalog_1bv/knicks_brunson_blue_front.png';
import knicksBrunsonBackImg from '../assets/images/catalog_1bv/knicks_brunson_blue_back.png';
import germany1990RetroImg from '../assets/images/jerseys/germany_1990_retro_front.png';
import realMadridHomeLongSleeveImg from '../assets/images/jerseys/real_madrid_2026_home.png';
import arsenalHomeLongSleeveImg from '../assets/images/jerseys/arsenal_2026_home.png';

// Authentic basketball shorts & gear from Google Drive folder
import lakersSplitFrontImg from '../assets/images/basketball/lakers_split_front.png';
import lakersSplitBackImg from '../assets/images/basketball/lakers_split_back.png';
import lakersDragonFrontImg from '../assets/images/basketball/lakers_dragon_front.png';
import lakersDragonBackImg from '../assets/images/basketball/lakers_dragon_back.png';
import lakersStarsFrontImg from '../assets/images/basketball/lakers_stars_front.png';
import bullsRedFrontImg from '../assets/images/basketball/bulls_red_front.png';
import bullsRedBackImg from '../assets/images/basketball/bulls_red_back.png';
import bullsPinstripeFrontImg from '../assets/images/basketball/bulls_pinstripe_front.png';
import bullsPinstripeBackImg from '../assets/images/basketball/bulls_pinstripe_back.png';
import bostonTatumFrontImg from '../assets/images/basketball/boston_tatum_front.png';
import bostonTatumBackImg from '../assets/images/basketball/boston_tatum_back.png';
import brooklynNetsFrontImg from '../assets/images/basketball/brooklyn_nets_front.png';
import brooklynNetsBackImg from '../assets/images/basketball/brooklyn_nets_back.png';
import newYorkFrontImg from '../assets/images/basketball/new_york_front.png';
import airJordanFrontImg from '../assets/images/basketball/air_jordan_front.png';
import allstarNavyFrontImg from '../assets/images/basketball/allstar_navy_front.png';

import { Product } from '../types/store';

export const HERO_SOCCER_IMAGE = stadiumEditionImg;
export const HERO_BALL_IMAGE = courtBallImg;
export const HERO_CAMPAIGN_IMAGE = stadiumEditionImg;
export const BANNER_SOCCER_PLAYER_PNG = lyleFosterPng;
export const BANNER_BASKETBALL_PLAYER_PNG = basketballPlayerPng;
export const BASKETBALL_LAKERS_JERSEY_IMAGE = lakersKobeFrontImg;
export const BASKETBALL_BULLS_JERSEY_IMAGE = bullsJordanWhiteFrontImg;
export const BASKETBALL_WARRIORS_JERSEY_IMAGE = warriorsCurryBlueFrontImg;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'drive-germany-1990-retro',
    name: 'Germany DFB 1990 World Champions Retro Long-Sleeve Home Jersey',
    subtitle: 'Official Retro Matchday Kit · Long-Sleeve Edition',
    brand: 'Germany DFB',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Iconic Germany 1990 World Cup winners retro long-sleeve home jersey. Features the famous black, red, and gold chest chevron, 4 championship stars above the Deutscher Fussball-Bund eagle crest, ribbed collar, and black Adidas three-stripes down the sleeves.',
    details: [
      'Authentic high-resolution photography from the official sports collection',
      'Iconic black, red, and gold national flag chest chevron graphic',
      'Four embroidered World Cup victory stars above the DFB eagle badge',
      'Long-sleeve performance cut with Climacool ventilation technology',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Breathable Retro Jacquard Polyester',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: germany1990RetroImg,
    alternateImages: [
      germany1990RetroImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: '1990 Champions Retro Edition'
  },
  {
    id: 'drive-real-madrid-2026-home',
    name: 'Real Madrid 2026 Home Long-Sleeve Jersey',
    subtitle: 'Official Long-Sleeve Matchday Kit · Pristine White & Magenta',
    brand: 'Real Madrid',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official 2026 Real Madrid home long-sleeve matchday jersey. Rendered in pristine white with vibrant magenta-pink shoulder stripes, official HP sleeve sponsor badge, Emirates Fly Better chest logo, and authentic woven club crest.',
    details: [
      'Original photography from the Google Drive folder',
      'Embroidered royal Real Madrid club crest and Adidas badge of sport',
      'Official HP sleeve sponsor patch and Emirates Fly Better chest branding',
      'Full-length match sleeves with contrast magenta 3-stripes and dark cuffs',
      'Fast doorstep delivery nationwide direct to your door'
    ],
    material: '100% Recycled Performance Poly Doubleknit',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: realMadridHomeLongSleeveImg,
    alternateImages: [
      realMadridHomeLongSleeveImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Long-Sleeve'
  },
  {
    id: 'drive-arsenal-2026-home',
    name: 'Arsenal FC 2026 Home Long-Sleeve Jersey',
    subtitle: 'Official Long-Sleeve Matchday Kit · Gunners Red & White',
    brand: 'Arsenal',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official Arsenal FC home long-sleeve match jersey in iconic Gunners scarlet with contrast optic white sleeves. Embellished with the embroidered cannon crest, dark burgundy sleeve stripes, Emirates Fly Better sponsor, and Climacool ventilation.',
    details: [
      'Original photography from the official sports collection',
      'Signature Arsenal cannon crest embroidered on left chest',
      'Full long-sleeve cut with patterned burgundy cuffs and collar trim',
      'Official Emirates Fly Better and sleeve branding',
      'Guaranteed nationwide delivery direct to your address'
    ],
    material: '100% Technical Climacool Polyester',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: arsenalHomeLongSleeveImg,
    alternateImages: [
      arsenalHomeLongSleeveImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Long-Sleeve'
  },
  {
    id: 'drive-france-away',
    name: 'France FFF Away Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'France FFF',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official France FFF away match jersey. Features the iconic oversized golden French rooster (Coq Gaulois), two World Champions stars, tricolor collar and cuff trims, and high-performance breathable Nike Dri-FIT weave.',
    details: [
      'Two embroidered World Cup stars above the golden French Coq crest',
      'Tricolor red, white and blue cuff accents with orange side piping',
      'Engineered Nike Dri-FIT ventilation mesh for elite matchday performance',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Breathable Technical Polyester',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: franceKitImg,
    alternateImages: [
      franceKitImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-argentina-3star',
    name: 'Argentina 3-Star World Champions Edition Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'Argentina AFA',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Argentina AFA 3-Star World Champions special edition jersey. Features the official gold FIFA 2022 World Champions center crest, vintage Adidas Trefoil, and swirling electric royal blue graphics.',
    details: [
      'Official gold FIFA World Champions 2022 center shield',
      'Embroidered AFA 3-star badge (1978, 1986, 2022)',
      'Retro Adidas Trefoil logo and Climacool woven mesh',
      'Guaranteed fast doorstep delivery nationwide'
    ],
    material: '100% Performance Poly Jacquard',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: argentinaImg,
    alternateImages: [
      argentinaImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-psg-home',
    name: 'Paris Saint-Germain (PSG) Home Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'Paris Saint-Germain',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official Paris Saint-Germain home jersey featuring the historic red and white Hechter central band on deep Parisian navy blue with Qatar Airways sponsor.',
    details: [
      'Authentic PSG circular club crest and Nike Swoosh',
      'Inner collar inscription: "Fiers de nos Couleurs"',
      'Performance match cut with tricolor cuff details',
      'Doorstep delivery guaranteed nationwide'
    ],
    material: '100% Recycled Performance Polyester',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: psgImg,
    alternateImages: [
      psgImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-manchester-united',
    name: 'Manchester United Home Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'Manchester United',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official Manchester United home jersey in iconic Old Trafford scarlet red. Features the Snapdragon front sponsor, tailored polo collar with black-and-white tipping, and Adidas three stripes.',
    details: [
      'Embroidered Red Devils crest in red and gold',
      'Ribbed polo collar with contrast tipping',
      'Official Snapdragon sponsor logo',
      'Fast doorstep delivery nationwide'
    ],
    material: '100% Recycled Polyester Doubleknit',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: manUtdImg,
    alternateImages: [
      manUtdImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-liverpool-home',
    name: 'Liverpool FC Home Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'Liverpool FC',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official Liverpool FC home jersey in Anfield red with striking geometric angled lines, embroidered Liver Bird crest, and Standard Chartered sponsor.',
    details: [
      'Iconic embroidered L.F.C. Liver Bird crest',
      'Long-sleeve performance cut with Adidas shoulder stripes',
      'Standard Chartered and sleeve sponsor detailing',
      'Guaranteed nationwide delivery direct to your door'
    ],
    material: '100% Breathable Performance Poly',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: liverpoolImg,
    alternateImages: [
      liverpoolImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-germany-bayern',
    name: 'FC Bayern Munich Home Jersey',
    subtitle: 'Official German Match Jersey',
    brand: 'Bayern Munich',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Official FC Bayern Munich home jersey in classic Bavarian red with tonal vertical jacquard stripes, Deutsche Telekom front sponsor, Allianz sleeve patch, and 5-star championship crest.',
    details: [
      'Original German football club matchday jersey direct from the official sports collection',
      'Embroidered FC Bayern München crest with 5 championship stars',
      'Performance match cut with Adidas Climacool standard and white 3-stripes',
      'Deutsche Telekom front sponsor and Allianz sleeve badge',
      'Fast doorstep delivery nationwide direct to your address'
    ],
    material: '100% High-Performance Poly',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: bayernImg,
    alternateImages: [
      bayernImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  },
  {
    id: 'drive-real-madrid-away',
    name: 'Real Madrid Away Jersey',
    subtitle: 'Official Match Jersey',
    brand: 'Real Madrid',
    category: 'Kits & Jerseys',
    sport: 'football',
    apparelType: 'jersey',
    priceUSD: 850,
    description: 'Striking official Real Madrid alternate matchday jersey. Complete with gold accent trims and premium lightweight weave.',
    details: [
      'Official alternate matchday kit styling with gold accents',
      'Delivered nationwide in secure tamper-proof packaging',
      'Authentic club crest and sponsor detailing',
      'Athletic ergonomic cut'
    ],
    material: '100% Recycled Technical Polyester',
    fit: 'Standard Fit',
    origin: 'Official Licensed Merchandise',
    primaryImage: realMadridAwayImg,
    alternateImages: [
      realMadridAwayImg
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Official Matchday Edition'
  }
];

export const INITIAL_BASKETBALL_PRODUCTS: Product[] = [
  // --- 14 AUTHENTIC JERSEY PAIRS (28 IMAGES) FROM GOOGLE DRIVE FOLDER 1bvEr66N9tSA74k60UzX_chpiXlvpKw5G ---
  {
    id: 'basketball-celtics-larry-bird',
    name: 'Boston Celtics Larry Bird #33 1985-86 Hardwood Classics Green Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics · Boston Clover Green',
    brand: 'Boston Celtics',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'The definitive Boston Celtics Larry Bird 1985-86 championship jersey by Mitchell & Ness. Finished in iconic Celtics shamrock green with optic white tackle-twill CELTICS 33 across the chest, embroidered NBA logoman, and BIRD 33 on the reverse.',
    details: [
      'Original photography direct from the official sports collection (Front & Back)',
      'Front: Stitched tackle-twill CELTICS with #33 numerals and 1985-86 Larry Bird patch',
      'Back: Authentic arched BIRD nameplate with varsity #33 in bright white',
      'Accents: Classic white and green striped rib-knit collar and armhole trim',
      'Tagging: Mitchell & Ness 1985-86 Larry Bird Hardwood Classics woven jock tag',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Breathable Retro Jacquard Polyester Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Mitchell & Ness NBA Merchandise',
    primaryImage: celticsBirdFrontImg,
    alternateImages: [
      celticsBirdFrontImg,
      celticsBirdBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: '1985-86 Championship Throwback'
  },
  {
    id: 'basketball-lakers-shaq-1999',
    name: 'LA Lakers Shaquille O\'Neal #34 1999-00 Hardwood Classics Gold Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics · Showtime Gold & Royal Purple',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Championship-era 1999-00 Los Angeles Lakers Shaquille O\'Neal #34 gold jersey by Mitchell & Ness. Commemorating Shaq\'s dominant MVP championship season with iconic purple and white drop-shadow LAKERS and #34 on vibrant Forum Gold mesh.',
    details: [
      'High-resolution photography direct from Google Drive (Front & Back Views)',
      'Front: Embroidered LAKERS script with purple and white drop-shadow #34 numerals',
      'Back: Arched O\'NEAL nameplate with oversized #34 center numbers',
      'Sides: Contrast royal purple side ventilation panels with optic white piping',
      'Tagging: Mitchell & Ness 1999-00 Shaquille O\'Neal Hardwood Classics jock tag',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Breathable Performance Poly Doubleknit',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Mitchell & Ness NBA Merchandise',
    primaryImage: lakersShaqFrontImg,
    alternateImages: [
      lakersShaqFrontImg,
      lakersShaqBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: '1999-00 MVP Championship Edition'
  },
  {
    id: 'basketball-lakers-kobe-mamba',
    name: 'LA Lakers Kobe Bryant #24 Black Mamba City Edition Snakeskin Jersey',
    subtitle: 'Official NBA Nike City Edition · Textured Snakeskin Mesh',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'The legendary Los Angeles Lakers Kobe Bryant Black Mamba City Edition jersey. Engineered with all-over tonal black snakeskin texture, vibrant gold and purple drop-shadow LAKERS and #24 numerals, gold bibigo sponsor patch, and royal purple neckline accent.',
    details: [
      'Original photography from the official sports collection (Front & Back Views)',
      'Body: All-over sublimated snakeskin scale texture in pitch black',
      'Front: Tackle-twill LAKERS wordmark in gold with purple shadow and #24 numerals',
      'Back: Stitched BRYANT #24 with gold drop-shadow and NBA silhouette badge',
      'Accents: Gold and royal purple dual-tone striped collar and armhole trim',
      'Sponsor: Gold Bibigo roundel patch on left chest; Nike Swoosh on right chest',
      'Guaranteed nationwide delivery direct to your door'
    ],
    material: '100% Dual-Knit Textured Poly Mesh with Nike Dri-FIT',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: lakersKobeFrontImg,
    alternateImages: [
      lakersKobeFrontImg,
      lakersKobeBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Black Mamba Tribute Edition'
  },
  {
    id: 'basketball-lakers-lebron-association',
    name: 'LA Lakers LeBron James #23 White Association Edition Jersey',
    subtitle: 'Official NBA Nike Association Jersey · Optic White & Purple',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Official Los Angeles Lakers LeBron James #23 Association Edition jersey in crisp optic white. Highlighted by iconic royal purple and yellow gold neck ribbing, bibigo chest sponsor patch, and double-stitched tackle-twill LAKERS 23 and JAMES 23 numerals.',
    details: [
      'Original photography from the Google Drive folder (Front & Back Views)',
      'Front: Tackle-twill LAKERS and yellow #23 numerals with Nike Swoosh and Bibigo patch',
      'Back: Bold arching JAMES nameplate in deep purple with yellow outline and #23 block numbers',
      'Trim: Purple and yellow sports stripe ribbing along collar and armholes',
      'Neck: Embroidered red, white, and blue NBA silhouette logoman',
      'Fast doorstep delivery nationwide'
    ],
    material: '100% Recycled Technical Polyester Mesh with Nike Dri-FIT',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: lakersLebronFrontImg,
    alternateImages: [
      lakersLebronFrontImg,
      lakersLebronBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Association Edition Series'
  },
  {
    id: 'basketball-lakers-kareem-throwback',
    name: 'LA Lakers Kareem Abdul-Jabbar #33 Mitchell & Ness Throwback Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics Throwback · Showtime Gold & Royal Blue',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Championship-era Los Angeles Lakers Kareem Abdul-Jabbar #33 throwback jersey by Mitchell & Ness. Displays cursive gold and white LAKERS script, white #33 numerals with drop-shadow, gold NBA logo embroidery, and arched ABDUL-JABBAR across the back.',
    details: [
      'Full front & back views direct from the official sports collection',
      'Front: Flowing gold LAKERS script with white fill and drop-shadow #33',
      'Back: Arched ABDUL-JABBAR nameplate with oversized #33 numerals in royal blue',
      'Collar & Trim: White and gold knit ribbing on classic court mesh',
      'Tagging: Mitchell & Ness Kareem Abdul-Jabbar Hardwood Classics jock tag',
      'Doorstep delivery guaranteed nationwide'
    ],
    material: '100% Breathable Retro Court Mesh Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Mitchell & Ness NBA Merchandise',
    primaryImage: lakersKareemGoldFrontImg,
    alternateImages: [
      lakersKareemGoldFrontImg,
      lakersKareemBlueBackImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: '1984-85 Championship Throwback'
  },
  {
    id: 'basketball-bulls-jordan-1998-white',
    name: 'Chicago Bulls 1997-98 Michael Jordan #23 White Home Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics "The Last Dance" Edition',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'The Holy Grail of basketball jerseys: Michael Jordan 1997-98 Chicago Bulls championship white home jersey by Mitchell & Ness. Features black and red tackle-twill BULLS, Jordan embroidered signature detail across the #23 numeral, and authentic 1997-98 Last Dance jock tag.',
    details: [
      'Full front & back views direct from the official sports collection',
      'Front: Tackle-twill arched BULLS with Jordan stitched signature across #23',
      'Back: Red and black arched JORDAN nameplate and matching varsity #23',
      'Patch: Embroidered Chicago Bulls chest emblem on right chest',
      'Tagging: Mitchell & Ness 1997-98 Michael Jordan Hardwood Classics jock tag',
      'Guaranteed nationwide delivery direct to your door'
    ],
    material: '100% Heavyweight Breathable Pro Mesh Polyester',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Mitchell & Ness NBA Merchandise',
    primaryImage: bullsJordanWhiteFrontImg,
    alternateImages: [
      bullsJordanWhiteFrontImg,
      bullsJordanWhiteBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: '1997-98 "Last Dance" Championship Edition'
  },
  {
    id: 'basketball-bulls-jordan-red',
    name: 'Chicago Bulls Michael Jordan #23 Classic Scarlet Red Road Jersey',
    subtitle: 'Official NBA Court Jersey · United Center Scarlet Red',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'The definitive Chicago Bulls Michael Jordan #23 road jersey in fiery scarlet red. Embellished with black and white drop-shadow BULLS lettering and #23, embroidered NBA logoman on left chest, and arching JORDAN 23 on the back.',
    details: [
      'Original photography from the official sports collection (Front & Back Views)',
      'Front: Embroidered black and white tackle-twill BULLS 23 across United Center red mesh',
      'Back: Arched JORDAN 23 block lettering with embroidered Bulls bullhead logo',
      'Trims: Striped black, white, and red collar and armhole elastic ribbing',
      'Tagging: Authentic team jock tag with Length +2 specifications',
      'Fast doorstep delivery nationwide direct to your address'
    ],
    material: '100% Breathable Athletic Mesh Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: bullsJordanRedFrontImg,
    alternateImages: [
      bullsJordanRedFrontImg,
      bullsJordanRedBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Championship Road Edition'
  },
  {
    id: 'basketball-bulls-jordan-black',
    name: 'Chicago Bulls Michael Jordan #23 1997-98 Black Alternate Road Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics · Pitch Black & Scarlet Red',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Chicago Bulls Michael Jordan #23 alternate road statement jersey in pitch black court mesh. Displays scarlet red tackle-twill BULLS 23 on the chest with white borders, arching JORDAN 23 on the back, and signature red-and-white striped neckline.',
    details: [
      'Original photography from the Google Drive folder (Front & Back Views)',
      'Front: Scarlet red tackle-twill BULLS #23 with white outline on black mesh',
      'Back: High-contrast red and white tackle-twill JORDAN 23 block numerals',
      'Collar & Trim: Red and white sports ribbing along neck and armhole edges',
      'Fabric: Heavyweight ventilated basketball court mesh engineered for supreme airflow',
      'Guaranteed nationwide delivery direct to your address'
    ],
    material: '100% Heavyweight Breathable Court Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: bullsJordanBlackFrontImg,
    alternateImages: [
      bullsJordanBlackFrontImg,
      bullsJordanBlackBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Statement Road Series'
  },
  {
    id: 'basketball-bulls-jordan-split',
    name: 'Chicago Bulls Michael Jordan #23 1997-98 Split Red & White Jersey',
    subtitle: 'Collector\'s Edition Dual-Tone Half & Half Jersey',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Special collector\'s split-edition Michael Jordan #23 jersey divided down the center into road scarlet red on the left and home white on the right. Features dual-tone split BULLS 23 and JORDAN 23 tackle-twill typography uniting both legendary Bulls colorways.',
    details: [
      'Original photography from the official sports collection (Front & Back Views)',
      'Front: Split BULLS 23 across contrasting red and white halves',
      'Back: Split lettering: black with red outline on white side, black with white outline on red side',
      'Trims: Coordinated dual-color collar and sleeve ribbing',
      'Tagging: Mitchell & Ness 1997-98 Michael Jordan Hardwood Classics commemorative jock tag',
      'Guaranteed nationwide doorstep delivery direct to your door'
    ],
    material: '100% Dual-Tone Performance Poly Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Collector\'s Series Licensed Apparel',
    primaryImage: bullsJordanSplitFrontImg,
    alternateImages: [
      bullsJordanSplitFrontImg,
      bullsJordanSplitBackImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Split Heritage Tribute Edition'
  },
  {
    id: 'basketball-warriors-curry-icon',
    name: 'Golden State Warriors Stephen Curry #30 Icon Edition Royal Blue Jersey',
    subtitle: 'Official NBA Nike Swingman Jersey · Royal Blue & Golden Yellow',
    brand: 'Golden State Warriors',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Official Golden State Warriors Stephen Curry #30 Icon Edition Swingman jersey in deep Bay Area royal blue. Embellished with the circular Golden Gate Bridge logo, gold #30 numerals, Rakuten sponsor patch, and CURRY 30 on the back.',
    details: [
      'Original photography from the Google Drive folder (Front & Back Views)',
      'Front: Embroidered roundel with Golden Gate Bridge crest, #30, and Rakuten patch',
      'Back: Arched CURRY nameplate and oversized #30 numerals in golden yellow',
      'Sides: Optic white and blue side ventilation inserts with Nike engineered jock tag',
      'Trim: California golden yellow V-neck collar and armhole elastic trim',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Nike Dri-FIT Moisture-Wicking Poly Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: warriorsCurryBlueFrontImg,
    alternateImages: [
      warriorsCurryBlueFrontImg,
      warriorsCurryBlueBackImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Icon Swingman Series'
  },
  {
    id: 'basketball-warriors-curry-association',
    name: 'Golden State Warriors Stephen Curry #30 \'The Town\' White Swingman Jersey',
    subtitle: 'Official NBA Nike Swingman Jersey · Optic White & Royal Blue',
    brand: 'Golden State Warriors',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Official Golden State Warriors Stephen Curry #30 white Swingman jersey. Embellished with royal blue and golden yellow circular Warriors bridge chest emblem, Rakuten sponsor badge, and bold CURRY 30 across the reverse.',
    details: [
      'Original photography from the official sports collection (Front & Back Views)',
      'Front: Optic white mesh body with circular Golden Gate Bridge chest emblem',
      'Back: Arched CURRY nameplate and oversized #30 numerals in dark royal navy',
      'Sides: Royal navy and yellow side ventilation panels with contrast piping',
      'Neckline: Golden yellow interior collar tipping with NBA logoman embroidery',
      'Fast doorstep delivery nationwide direct to your address'
    ],
    material: '100% Nike Dri-FIT Recycled Performance Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: warriorsCurryWhiteFrontImg,
    alternateImages: [
      warriorsCurryWhiteFrontImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Association Player Series'
  },
  {
    id: 'basketball-sixers-embiid',
    name: 'Philadelphia 76ers #21 Joel Embiid Classic Retro Black Swingman Jersey',
    subtitle: 'Official NBA Swingman Jersey · Nostalgic 2000s Comet Edition',
    brand: 'Philadelphia 76ers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'The iconic Philadelphia 76ers classic black Swingman jersey honoring MVP center Joel Embiid. Features the nostalgic 2000s Allen Iverson era SIXERS shooting star comet wordmark, red and gold V-neck trim with gold star, crypto.com sponsor, and EMBIID 21 on the reverse.',
    details: [
      'Original high-resolution photography from the Google Drive folder (Front & Back Views)',
      'Front: Embroidered vintage SIXERS comet logo with trailing basketball in blue and gold',
      'Back: Stitched EMBIID 21 tackle-twill numerals with red and white borders',
      'Collar: Crimson red and gold multi-rib V-neck with gold center star',
      'Tagging: Nike Dri-FIT standard with official NBA engineered jock tag',
      'Fast doorstep delivery nationwide direct to your address'
    ],
    material: '100% Breathable Athletic Court Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: sixersEmbiidBackImg,
    alternateImages: [
      sixersEmbiidBackImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Classic Hardwood Series'
  },
  {
    id: 'basketball-spurs-duncan-throwback',
    name: 'San Antonio Spurs Tim Duncan #21 Mitchell & Ness Hardwood Classics Jersey',
    subtitle: 'Mitchell & Ness Hardwood Classics Throwback · Silver & Black',
    brand: 'San Antonio Spurs',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Authentic San Antonio Spurs Mitchell & Ness jersey honoring 5-time NBA champion Tim Duncan. Features "The Big Fundamental\'s" iconic silver and white tackle-twill SPURS 21 and DUNCAN 21 block lettering on deep San Antonio road black mesh.',
    details: [
      'Original photography from the official sports collection (Front & Back Views)',
      'Front: Silver SPURS chest script with spur graphic and tackle-twill #21',
      'Back: Silver tackle-twill DUNCAN nameplate with white stitched outline and oversized #21',
      'Sides: Pure silver and white side ventilation stripe columns',
      'Collar: Clean black and white rib knit trim on retro mesh body',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Heavyweight Breathable Court Mesh Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Mitchell & Ness NBA Merchandise',
    primaryImage: spursDuncanFrontImg,
    alternateImages: [
      spursDuncanFrontImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Hardwood Classics Championship Throwback'
  },
  {
    id: 'basketball-knicks-brunson',
    name: 'New York Knicks #11 Jalen Brunson Nike Icon Edition Swingman Jersey',
    subtitle: 'Official NBA Court Jersey · Royal Blue Icon Edition',
    brand: 'New York Knicks',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'jersey',
    priceUSD: 450,
    description: 'Official New York Knicks Icon Edition Nike Swingman jersey celebrating franchise captain Jalen Brunson. Rendered in iconic Knicks royal blue with orange and white tackle-twill NEW YORK 11 on front and BRUNSON 11 on the back, Experience Abu Dhabi sponsor patch, and the exclusive "Once A Knick Always A Knick" tag.',
    details: [
      'Original photography direct from the official sports collection (Front & Back Views)',
      'Front: Stitched tackle-twill NEW YORK across chest with #11 numerals',
      'Back: Bold arched BRUNSON nameplate with vibrant orange #11 numerals',
      'Accents: Classic orange and white rib-knit collar and armhole trim',
      'Patches: Experience Abu Dhabi right chest sponsor and Nike authentic jock tag',
      'Tag: Official slogan "ONCE A KNICK ALWAYS A KNICK" embroidered above hem',
      'Guaranteed nationwide doorstep delivery direct to your address'
    ],
    material: '100% Nike Dri-FIT Moisture-Wicking Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: knicksBrunsonFrontImg,
    alternateImages: [
      knicksBrunsonFrontImg,
      knicksBrunsonBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Icon Player Series'
  },

  // --- BASKETBALL COURT SHORTS FROM GOOGLE DRIVE ---
  {
    id: 'basketball-lakers-split-bryant',
    name: 'LA Lakers Kobe Bryant #24 / #8 Split Hardwood Classics Shorts',
    subtitle: 'Official NBA Court Shorts · Dual-Tone Edition',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Iconic Los Angeles Lakers dual-tone split court shorts honoring Kobe Bryant. Features royal purple on the right (#24) and golden yellow on the left (#8), embroidered front Lakers script, official Hardwood Classics tags, and varsity Bryant 24 back lettering.',
    details: [
      'Original high-resolution photograph from the collection',
      'Front view: Embroidered Lakers wordmark, #24 and #8 numbers, and Hardwood Classics patch',
      'Back view: Arching BRYANT nameplate with oversized #24 varsity block numerals',
      'Heavyweight breathable poly mesh with Just Don gold-tipped drawstring',
      'Guaranteed nationwide delivery direct to your door'
    ],
    material: '100% Breathable Athletic Mesh Polyester',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: lakersSplitFrontImg,
    alternateImages: [
      lakersSplitFrontImg,
      lakersSplitBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Hardwood Classics Tribute Edition'
  },
  {
    id: 'basketball-bulls-1998-red',
    name: 'Chicago Bulls 1997-98 Just Don Heritage Court Shorts',
    subtitle: 'Official NBA Court Shorts · Scarlet Red',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Championship-era 1997-98 Chicago Bulls scarlet red court shorts. Features the bold tackle-twill front BULLS lettering, dual charging bull logos on white side diamond panels, official NBA logo badge, and embroidered Just Don back script with rear zip pockets.',
    details: [
      'Original high-resolution photography from the collection',
      'Front: Embroidered black and white tackle twill BULLS arch across front',
      'Side panels: Twin charging Chicago Bull emblems on contrast white diamonds',
      'Back: Signature Just Don embroidered cursive script with metallic gold zipper pulls',
      'Rib-knit striped elastic waistband with drawcord'
    ],
    material: '100% Heavyweight Breathable Pro Mesh Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: bullsRedFrontImg,
    alternateImages: [
      bullsRedFrontImg,
      bullsRedBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: '1997-98 Championship Edition'
  },
  {
    id: 'basketball-bulls-pinstripe',
    name: 'Chicago Bulls 90s Pinstripe Pro Hardwood Shorts',
    subtitle: 'Official NBA Court Shorts · Black & Red Pinstripe',
    brand: 'Chicago Bulls',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Legendary Chicago Bulls alternate black and red pinstripe hardwood shorts. Features prominent arched CHICAGO tackle-twill lettering, dual embroidered Bull head emblems on red angled side panels, and striped waistband.',
    details: [
      'Original photography from the official sports collection',
      'Classic 90s alternate court colorway in deep black with crimson pinstripes',
      'Embroidered CHICAGO front wordmark and three-star waistband tab',
      'Twin Bull crests on reinforced side ventilation gussets',
      'Zip rear pockets and premium gold aglets'
    ],
    material: '100% Performance Dri-Poly Athletic Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: bullsPinstripeFrontImg,
    alternateImages: [
      bullsPinstripeFrontImg,
      bullsPinstripeBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Alternate Pinstripe Edition'
  },
  {
    id: 'basketball-boston-tatum',
    name: 'Boston Celtics #0 Jayson Tatum Statement Court Shorts',
    subtitle: 'Official NBA Court Shorts · Kelly Green & Black',
    brand: 'Boston Celtics',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Boston Celtics statement edition black and kelly green court shorts featuring Jayson Tatum details. Displays the prominent BOSTON tackle twill arch, white shamrock clover embroidery, and #0 signature on front and back.',
    details: [
      'Original photography from the official sports collection',
      'Front: Embroidered BOSTON wordmark, Nike swoosh, clover badge, and #0 patch',
      'Back: Bold TATUM block lettering and oversized #0 numeral in optic green',
      'Ribbed kelly green and white striped waist and leg trims',
      'Heavyweight dual-layer court mesh with secure zip storage'
    ],
    material: '100% Dual-Layer Poly Court Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: bostonTatumFrontImg,
    alternateImages: [
      bostonTatumFrontImg,
      bostonTatumBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Statement Player Edition'
  },
  {
    id: 'basketball-brooklyn-nets',
    name: 'Brooklyn Nets #11 Hardwood Classics Pro Shorts',
    subtitle: 'Official NBA Court Shorts · Pitch Black & White',
    brand: 'Brooklyn Nets',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Monochromatic Brooklyn Nets Hardwood Classics court shorts in pitch black with white trim. Features bold BKLYN typography, #11 player numeral, Just Don back embroidery, and dual zip back pockets.',
    details: [
      'Original collection photography from Google Drive',
      'High-impact BKLYN graphic across front in layered 3D font',
      'Embroidered #11 player number and Hardwood Classics vintage badge',
      'Back view: Embroidered white Just Don cursive logo and hidden zips',
      'Durable dual-knit technical basketball mesh'
    ],
    material: '100% Technical Knit Mesh Polyester',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: brooklynNetsFrontImg,
    alternateImages: [
      brooklynNetsFrontImg,
      brooklynNetsBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Hardwood Classics Pro Edition'
  },
  {
    id: 'basketball-lakers-dragon',
    name: 'LA Lakers Asian Heritage Dragon Edition Imperial Shorts',
    subtitle: 'Special Edition Court Shorts · Royal Purple & Gold',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Stunning Asian Heritage Dragon Edition Los Angeles Lakers shorts. Crafted with intricate sublimated imperial dragon scales across rich royal purple mesh, vibrant golden side panels, and iconic Lakers wordmark.',
    details: [
      'Original photography direct from the collection',
      'Front: Stylized cursive LAKERS arch over dragon scales artwork',
      'Sides: Gold athletic mesh side columns with embroidered purple L-ball logos',
      'Back: Flowing dragon tail motif with high-contrast yellow waistband accents',
      'Quick-drying sweat-wicking technical fabric'
    ],
    material: '100% Sublimated Technical Performance Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Special Edition Licensed Apparel',
    primaryImage: lakersDragonFrontImg,
    alternateImages: [
      lakersDragonFrontImg,
      lakersDragonBackImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Imperial Dragon Series'
  },
  {
    id: 'basketball-lakers-gold-star',
    name: 'LA Lakers Gold Star Championship Court Shorts',
    subtitle: 'Official NBA Court Shorts · Championship Gold',
    brand: 'LA Lakers',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Signature Los Angeles Lakers championship gold court shorts. Embellished with purple Lakers tackle twill lettering, Nike Swoosh, and a column of championship stars along both side panels.',
    details: [
      'Original photography from the official sports collection',
      'Front: Classic Lakers script across rich golden-yellow fabric with NBA logo',
      'Sides: Multi-star embroidery sequence honoring Lakers championship banners',
      'Hems: Dual Lakers basketball emblems on both lower leg openings',
      'Breathable lightweight mesh with reinforced stretch waistband'
    ],
    material: '100% Breathable Performance Poly Mesh',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA Merchandise',
    primaryImage: lakersStarsFrontImg,
    alternateImages: [
      lakersStarsFrontImg,
      lakersKareemGoldFrontImg
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Championship Stars Edition'
  },
  {
    id: 'basketball-new-york-just-don',
    name: 'New York Just Don Streetwear Court Shorts',
    subtitle: 'Official Streetwear Court Shorts · Pure White',
    brand: 'New York Knicks',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Premium New York Just Don streetwear court shorts in pristine optic white. Features high-density interlocking NY monogram embroidery, NEIYORK curved front patch, baseball roundel badge, and navy contrast piping.',
    details: [
      'Original photograph from the collection',
      'Front: Embroidered NY monogram, NEIYORK typography, and Yankees roundel',
      'Clean navy blue and white sports-stripe ribbing on cuffs and sides',
      'Heavyweight drawstring with metallic aglets and Just Don label',
      'Dual zippered side and back pockets'
    ],
    material: '100% Premium Double-Knit Cotton-Poly Mesh',
    fit: 'Relaxed Streetwear Fit',
    origin: 'Authentic Streetwear Apparel',
    primaryImage: newYorkFrontImg,
    alternateImages: [
      newYorkFrontImg,
      knicksBrunsonFrontImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Streetwear Heritage Edition'
  },
  {
    id: 'basketball-air-jordan-flight',
    name: 'Air Jordan Jumpman Flight Dri-FIT Graphic Shorts',
    subtitle: 'Official Jordan Court Shorts · Neon Lightning & Infrared',
    brand: 'Air Jordan',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Electrifying Air Jordan Jumpman Flight court shorts. Designed in charcoal black with neon lime lightning splashes, classic infrared diamond side cuts, and dual Jumpman flight insignias on both legs.',
    details: [
      'Original photograph from the collection',
      'Infrared and white diamond side trims inspired by Michael Jordan game shorts',
      'Vibrant sublimated electric lightning graphics across ventilated body',
      'Twin Jumpman emblems: classic black silhouette and camo pattern flight logo',
      'Nike Dri-FIT moisture-management technology'
    ],
    material: '100% Nike Dri-FIT Performance Polyester',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed Jordan Merchandise',
    primaryImage: airJordanFrontImg,
    alternateImages: [
      airJordanFrontImg,
      allstarNavyFrontImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'Jumpman Flight Series'
  },
  {
    id: 'basketball-nba-allstar-stars',
    name: 'Jordan NBA All-Star Game Heritage Stars Shorts',
    subtitle: 'Official NBA All-Star Shorts · Royal Navy Pinstripe',
    brand: 'NBA All-Star',
    category: 'Kits & Jerseys',
    sport: 'basketball',
    apparelType: 'shorts',
    priceUSD: 450,
    description: 'Official commemorative NBA All-Star Game shorts in midnight royal navy with subtle pinstripes. Embellished with large circular All-Star patches surrounded by embroidered white stars and silver Jordan flight emblem.',
    details: [
      'Original photograph from the collection',
      'Dual round All-Star badges with NBA silhouettes ringed by 5 embroidered stars',
      'Silver metallic embroidered Jumpman on left leg',
      'Red, white, and blue striped rib trim along waist and hems',
      'Lightweight technical court mesh engineered for supreme airflow'
    ],
    material: '100% Technical Court Mesh Poly',
    fit: 'Standard Athletic Fit',
    origin: 'Official Licensed NBA All-Star Gear',
    primaryImage: allstarNavyFrontImg,
    alternateImages: [
      allstarNavyFrontImg,
      airJordanFrontImg,
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)'],
    inStock: true,
    releaseYear: '2026',
    edition: 'All-Star Weekend Commemorative'
  }
];

import { KIDS_FOOTBALL_PRODUCTS } from './kidsProducts';
import { NEW_DRIVE_FOLDER_SHIRTS } from './newDriveShirts';
import { INITIAL_TRACKSUITS } from './tracksuits';
import { INITIAL_SOCKS } from './socks';
export { KIDS_FOOTBALL_PRODUCTS, NEW_DRIVE_FOLDER_SHIRTS, INITIAL_TRACKSUITS, INITIAL_SOCKS };

export const INITIAL_FOOTBALL_PRODUCTS: Product[] = INITIAL_PRODUCTS.map(p => ({
  ...p,
  sport: 'football' as const
}));

export const COMBINED_INITIAL_PRODUCTS: Product[] = [
  ...NEW_DRIVE_FOLDER_SHIRTS,
  ...INITIAL_TRACKSUITS,
  ...INITIAL_SOCKS,
  ...KIDS_FOOTBALL_PRODUCTS,
  ...INITIAL_FOOTBALL_PRODUCTS,
  ...INITIAL_BASKETBALL_PRODUCTS
];

