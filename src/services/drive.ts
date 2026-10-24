import { Product } from '../types/store';

export const DEFAULT_DRIVE_FOLDER_ID = '1QPL77AnKYQKe0fZU50z9WoqiUbuj3o3Y';
export const PREVIOUS_DRIVE_FOLDER_ID = '19vyY6FuRDBMIC5_d910N840zRPzoFyMT';
export const LEGACY_DRIVE_FOLDER_ID = '1bvEr66N9tSA74k60UzX_chpiXlvpKw5G';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  size?: string;
  createdTime?: string;
}

/**
 * Extracts a folder ID from either a Google Drive folder URL or raw ID.
 */
export function extractFolderId(input: string): string {
  if (!input) return DEFAULT_DRIVE_FOLDER_ID;
  const match = input.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  return input.trim();
}

/**
 * Convert a Blob to a base64 Data URL so it persists indefinitely in IndexedDB/state
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Cleans file name into a polished luxury sports product title
 */
export function cleanProductName(fileName: string): string {
  const lower = fileName.toLowerCase();

  // Kids Football Wear (Google Drive folder 19vyY6FuRDBMIC5_d910N840zRPzoFyMT)
  if (lower === '32.png') return 'Manchester United 2025/26 Kids Home & Away Twin Kit Set';
  if (lower === '56.png') return 'AC Milan 2025/26 Kids Third Kit Set';
  if (lower === 'q.png') return 'FC Bayern Munich 2025/26 Kids Home Kit Set';
  if (lower === 'sy.png') return 'Manchester City 2025/26 Kids Home & Away Twin Kit Set';
  if (lower.includes('1.41.png')) return 'Argentina 3-Star World Champions Kids Twin Kit Set';
  if (lower.includes('14.41.png')) return 'England Three Lions National Team Kids Kit Set';
  if (lower.includes('14.41_0.png') || lower.includes('14.41 0.png')) return 'FC Barcelona 2025/26 Kids Trio Collector Kit Set';
  if (lower.includes('14.41_1.png') || lower.includes('14.41 1.png')) return 'Manchester City 2025/26 Kids White Sash Away Kit Set';
  if (lower.includes('14.41_2.png') || lower.includes('14.41 2.png')) return 'Spain RFEF National Team Kids Kit Set';
  if (lower.includes('14.41_67.png') || lower.includes('14.41 67.png')) return 'World Champions Junior Showcase: Argentina & Spain Kids Set';
  if (lower.includes('14.41_asd.png') || lower.includes('14.41 asd.png')) return 'Cristiano Ronaldo CR7 Legend Career Mashup Kids Kit Set';
  if (lower.includes('14.41_az.png') || lower.includes('14.41 az.png')) return 'Al-Nassr FC Cristiano Ronaldo #7 Kids Home Kit Set';
  if (lower.includes('14.41_d.png') || lower.includes('14.41 d.png')) return 'France FFF National Team Kids Home Kit Set';
  if (lower.includes('14.41_i.png') || lower.includes('14.41 i.png')) return 'Mexico National Team Aztec Calendar Kids Twin Kit Set';
  if (lower.includes('14.41_j.png') || lower.includes('14.41 j.png')) return 'Arsenal FC 2025/26 Kids Complete Trio Kit Set';
  if (lower.includes('14.41_t.png') || lower.includes('14.41 t.png')) return 'Liverpool FC 2025/26 Kids Home Kit Set';
  if (lower.includes('14.41_w.png') || lower.includes('14.41 w.png')) return 'Arsenal FC 2025/26 Kids Pale Gold Away Kit Set';
  if (lower.includes('14.41_y.png') || lower.includes('14.41 y.png')) return 'Arsenal FC 2025/26 Kids Retro Navy & Yellow Third Kit Set';
  if (lower.includes('14.41s.png')) return 'Brazil CBF National Team Kids Twin Kit Set';
  if (lower.includes('14.419.png')) return 'Senegal National Team Lions of Teranga Kids Kit Set';
  if (lower.includes('14.q.png')) return 'Inter Milan 2-Stars Nerazzurri Kids Home Kit Set';
  if (lower.includes('fd.png')) return 'Real Madrid 2025/26 Kids Home & Away Twin Kit Set';

  // Boston Celtics Larry Bird #33
  if (lower.includes('15.05_tg') || (lower.includes('bird') && !lower.includes('back'))) {
    return 'Boston Celtics Larry Bird #33 1985-86 Hardwood Classics Green Jersey';
  }
  if (lower.includes('15.05_wk') || (lower.includes('bird') && lower.includes('back'))) {
    return 'Boston Celtics Larry Bird #33 1985-86 Green Jersey (Back View)';
  }

  // LA Lakers Shaquille O'Neal #34
  if (lower.includes('15.05_s.png') || lower.includes('shaq') || lower.includes('o\'neal')) {
    return 'LA Lakers Shaquille O\'Neal #34 1999-00 Hardwood Classics Gold Jersey';
  }
  if (lower.includes('15.05_aq') || (lower.includes('shaq') && lower.includes('back'))) {
    return 'LA Lakers Shaquille O\'Neal #34 1999-00 Gold Jersey (Back View)';
  }

  // LA Lakers Kobe Bryant #24 Black Mamba
  if (lower.includes('dx.png') || (lower.includes('mamba') && !lower.includes('back'))) {
    return 'LA Lakers Kobe Bryant #24 Black Mamba City Edition Snakeskin Jersey';
  }
  if (lower.includes('15.05t') || (lower.includes('mamba') && lower.includes('back'))) {
    return 'LA Lakers Kobe Bryant #24 Black Mamba Jersey (Back View)';
  }

  // LA Lakers LeBron James #23 White Association
  if (lower.includes('15.05_666') || (lower.includes('lebron') && !lower.includes('back'))) {
    return 'LA Lakers LeBron James #23 White Association Edition Jersey';
  }
  if (lower.includes('39_') || (lower.includes('lebron') && lower.includes('back'))) {
    return 'LA Lakers LeBron James #23 White Association Edition Jersey (Back View)';
  }

  // LA Lakers Kareem Abdul-Jabbar #33
  if (lower.includes('hkjne.png') || (lower.includes('kareem') && !lower.includes('back') && !lower.includes('blue'))) {
    return 'LA Lakers 1984-85 Kareem Abdul-Jabbar #33 Mitchell & Ness Hardwood Classics Jersey';
  }
  if (lower.includes('15.05_sq.png') || lower.includes('abdul-jabbar') || lower.includes('kareem_33_back')) {
    return 'LA Lakers Kareem Abdul-Jabbar #33 Royal Blue Throwback Jersey (Back View)';
  }

  // Chicago Bulls Michael Jordan #23 - White Home
  if (lower.includes('15.05hl.png') || lower.includes('bulls_jordan_white_front')) {
    return 'Chicago Bulls 1997-98 Michael Jordan #23 Mitchell & Ness White Home Jersey';
  }
  if (lower.includes('15.05_00') || lower.includes('white_jordan_back') || lower.includes('bulls_jordan_white_back')) {
    return 'Chicago Bulls Michael Jordan #23 White Home Jersey (Back View)';
  }

  // Chicago Bulls Michael Jordan #23 - Red Road
  if (lower.includes('15.05l.png') || lower.includes('bulls_jordan_red_front')) {
    return 'Chicago Bulls Michael Jordan #23 Classic Scarlet Red Road Jersey';
  }
  if (lower.includes('15.05_ww') || lower.includes('bulls_jordan_red_back')) {
    return 'Chicago Bulls Michael Jordan #23 Scarlet Red Road Jersey (Back View)';
  }

  // Chicago Bulls Michael Jordan #23 - Black Alternate
  if (lower.includes('ku03') || lower.includes('bulls_jordan_black_front')) {
    return 'Chicago Bulls Michael Jordan #23 1997-98 Black Alternate Road Jersey';
  }
  if (lower.includes('15.05_x') || lower.includes('bulls_jordan_black_back')) {
    return 'Chicago Bulls Michael Jordan #23 Black Alternate Jersey (Back View)';
  }

  // Chicago Bulls Michael Jordan #23 - Split Red & White
  if (lower.includes('15.05_9') || lower.includes('bulls_jordan_split_front')) {
    return 'Chicago Bulls Michael Jordan #23 1997-98 Split Red & White Jersey';
  }
  if (lower.includes('4sr') || lower.includes('bulls_jordan_split_back')) {
    return 'Chicago Bulls Michael Jordan #23 Split Red & White Jersey (Back View)';
  }

  // Golden State Warriors Stephen Curry #30 - Royal Blue Icon
  if (lower.includes('15.05_44') || (lower.includes('curry') && lower.includes('blue') && !lower.includes('back'))) {
    return 'Golden State Warriors Stephen Curry #30 Icon Edition Royal Blue Jersey';
  }
  if (lower.includes('15.05_h.png') || (lower.includes('curry') && lower.includes('blue') && lower.includes('back'))) {
    return 'Golden State Warriors Stephen Curry #30 Icon Blue Jersey (Back View)';
  }

  // Golden State Warriors Stephen Curry #30 - White 'The Town' / Hardwood
  if (lower.includes('15.05_ez') || (lower.includes('curry') && !lower.includes('blue') && !lower.includes('back'))) {
    return 'Golden State Warriors Stephen Curry #30 \'The Town\' White Swingman Jersey';
  }
  if (lower.includes('z2') || (lower.includes('curry') && lower.includes('back'))) {
    return 'Golden State Warriors Stephen Curry #30 White Jersey (Back View)';
  }

  // Philadelphia 76ers Joel Embiid #21 Classic Retro Black
  if (lower.includes('ghgsf') || (lower.includes('embiid') && !lower.includes('back'))) {
    return 'Philadelphia 76ers #21 Joel Embiid Classic Retro Black Jersey';
  }
  if (lower.includes('15.05_j.png') || (lower.includes('embiid') && lower.includes('back'))) {
    return 'Philadelphia 76ers #21 Joel Embiid Classic Retro Black Jersey (Back View)';
  }

  // San Antonio Spurs Tim Duncan #21 Black Hardwood
  if (lower.includes('15.05_hl') || (lower.includes('duncan') && !lower.includes('back'))) {
    return 'San Antonio Spurs Tim Duncan #21 Mitchell & Ness Hardwood Classics Jersey';
  }
  if (lower.includes('15.05_rf') || (lower.includes('duncan') && lower.includes('back'))) {
    return 'San Antonio Spurs Tim Duncan #21 Mitchell & Ness Jersey (Back View)';
  }

  // New York Knicks Jalen Brunson #11 Icon Blue
  if (lower.includes('15.05.png') || (lower.includes('brunson') && !lower.includes('back'))) {
    return 'New York Knicks #11 Jalen Brunson Nike Icon Edition Swingman Jersey';
  }
  if (lower.includes('at__j.png') || (lower.includes('brunson') && lower.includes('back'))) {
    return 'New York Knicks #11 Jalen Brunson Nike Icon Edition Jersey (Back View)';
  }

  // Football & National Team kits from Drive
  if (lower === 'u.png' || lower.includes('france')) return 'France FFF Away Kit 2026';
  if (lower.includes('highlight blue shirt')) return 'Argentina 3-Star World Champions Edition Kit';
  if (lower.includes('shirt.jpeg') || lower.includes('psg')) return 'Paris Saint-Germain (PSG) Home Kit 2026';
  if (lower.includes('man.png') || lower.includes('manchester')) return 'Manchester United Home Kit 2026';
  if (lower.includes('22.21 o') || lower.includes('liverpool')) return 'Liverpool FC Home Kit 2026';
  if (lower.includes('22.21') || lower.includes('bayern')) return 'FC Bayern Munich Home Kit 2026';
  if (lower === 'real_madrid.png' || lower.includes('germany') || lower.includes('dfb')) {
    return 'Germany DFB 1990 World Champions Retro Long-Sleeve Home Jersey';
  }
  if (lower.includes('real madrid 2') || lower.includes('real_madrid_2')) return 'Real Madrid 2026 Home Long-Sleeve Jersey';
  if (lower.includes('real madrid') || lower.includes('madrid')) return 'Real Madrid Home Match Kit 2026';
  if (lower.includes('aresenal') || lower.includes('arsenal')) return 'Arsenal FC 2026 Home Long-Sleeve Jersey';

  // Court Shorts from Drive
  if (lower.includes('boston') || lower.includes('tatum')) {
    return 'Boston Celtics #0 Jayson Tatum Statement Court Shorts';
  }
  if (lower.includes('booklyn') || lower.includes('brooklyn')) {
    return 'Brooklyn Nets #11 Hardwood Classics Pro Shorts';
  }
  if (lower.includes('red_blak') || lower.includes('pinstripe')) {
    return 'Chicago Bulls 90s Pinstripe Pro Hardwood Shorts';
  }
  if (lower.includes('chicago_bull') || lower === 'red.png') {
    return 'Chicago Bulls 1997-98 Just Don Heritage Court Shorts';
  }
  if (lower.includes('new_york') || lower.includes('neiyork')) {
    return 'New York Just Don Streetwear Court Shorts';
  }
  if (lower.includes('air_joran') || lower.includes('jumpman')) {
    return 'Air Jordan Jumpman Flight Dri-FIT Graphic Shorts';
  }
  if (lower.includes('lakers_stars') || lower.includes('lakers_2')) {
    return 'LA Lakers Gold Star Championship Court Shorts';
  }
  if (lower.includes('lakers_dragon') || lower.includes('lakers_0')) {
    return 'LA Lakers Asian Heritage Dragon Edition Imperial Shorts';
  }
  if (lower.includes('lakers_split') || lower.includes('lakers_main')) {
    return 'LA Lakers Kobe Bryant #24 / #8 Split Hardwood Classics Shorts';
  }
  if (lower.includes('shorts_9') || lower.includes('allstar')) {
    return 'Jordan NBA All-Star Game Heritage Stars Shorts';
  }

  let name = fileName.replace(/\.[a-zA-Z0-9]+$/i, ''); // remove extension
  name = name.replace(/\.[a-zA-Z0-9]+$/i, ''); // remove double extension
  name = name.replace(/[-_]+/g, ' '); // replace dashes & underscores
  name = name.replace(/\s+/g, ' ').trim();

  // If name is purely generic
  if (/^whatsapp image/i.test(name) || /^[0-9]+$/.test(name) || /^image/i.test(name)) {
    return 'Gifts Boutique Pro Edition Sports Kit';
  }

  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function detectBrand(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('knick') || (lower.includes('15.05') && !lower.includes('_') && !lower.includes('hl') && !lower.includes('l.')) || lower.includes('at__j')) return 'New York Knicks';
  if (lower.includes('ghgsf') || lower.includes('sixer') || lower.includes('76er') || lower.includes('embiid') || lower.includes('15.05_j')) return 'Philadelphia 76ers';
  if (lower.includes('z2') || lower.includes('curry') || lower.includes('warrior') || lower.includes('15.05_44') || lower.includes('15.05_ez') || lower.includes('15.05_h')) return 'Golden State Warriors';
  if (lower.includes('15.05_hl') || lower.includes('15.05_rf') || lower.includes('duncan') || lower.includes('spurs')) return 'San Antonio Spurs';
  if (lower.includes('15.05_tg') || lower.includes('15.05_wk') || lower.includes('bird') || lower.includes('boston') || lower.includes('tatum')) return 'Boston Celtics';
  if (
    lower.includes('dx.png') ||
    lower.includes('mamba') ||
    lower.includes('hkjne') ||
    lower.includes('laker') ||
    lower.includes('lebron') ||
    lower.includes('kareem') ||
    lower.includes('shaq') ||
    lower.includes('o\'neal') ||
    lower.includes('15.05_666') ||
    lower.includes('15.05_s.png') ||
    lower.includes('15.05_aq') ||
    lower.includes('15.05t') ||
    lower.includes('39_') ||
    lower.includes('sq.png')
  ) {
    return 'LA Lakers';
  }
  if (
    lower.includes('bull') ||
    lower.includes('15.05hl') ||
    lower.includes('15.05l') ||
    lower.includes('15.05_x') ||
    lower.includes('15.05_ww') ||
    lower.includes('15.05_00') ||
    lower.includes('15.05_9') ||
    lower.includes('4sr') ||
    lower.includes('ku03') ||
    lower.includes('white_jordan') ||
    lower.includes('red_blak') ||
    lower === 'red.png'
  ) {
    return 'Chicago Bulls';
  }
  if (lower.includes('booklyn') || lower.includes('brooklyn')) return 'Brooklyn Nets';
  if (lower.includes('new_york') || lower.includes('neiyork')) return 'New York';
  if (lower.includes('air_joran') || lower.includes('jumpman')) return 'Air Jordan';
  if (lower.includes('shorts_9') || lower.includes('allstar')) return 'NBA All-Star';
  if (lower === 'real_madrid.png' || lower.includes('germany') || lower.includes('dfb')) return 'Germany DFB';
  if (lower.includes('real madrid') || lower.includes('madrid')) return 'Real Madrid';
  if (lower.includes('arsenal') || lower.includes('aresenal')) return 'Arsenal';
  if (lower === 'u.png' || lower.includes('france')) return 'France FFF';
  if (lower.includes('highlight blue shirt') || lower.includes('argentina') || lower.includes('afa')) return 'Argentina AFA';
  if (lower.includes('shirt.jpeg') || lower.includes('psg') || lower.includes('paris')) return 'Paris Saint-Germain';
  if (lower.includes('man.png') || lower.includes('manchester') || lower.includes('united')) return 'Manchester United';
  if (lower.includes('22.21 o') || lower.includes('liverpool')) return 'Liverpool FC';
  if (lower.includes('22.21') || lower.includes('bayern')) return 'Bayern Munich';
  if (lower.includes('adidas')) return 'Adidas';
  if (lower.includes('nike')) return 'Nike';
  if (lower.includes('puma')) return 'Puma';
  return 'Gifts Boutique';
}

export function isKidsFootballFile(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return (
    lower === '32.png' ||
    lower === '56.png' ||
    lower === 'q.png' ||
    lower === 'sy.png' ||
    lower.includes('1.41') ||
    lower.includes('14.41') ||
    lower.includes('14.q.png') ||
    lower.includes('fd.png') ||
    lower.includes('kid') ||
    lower.includes('junior')
  );
}

export function detectSport(name: string): Product['sport'] {
  if (isKidsFootballFile(name)) return 'kids_football';
  const lower = name.toLowerCase();
  if (
    lower.includes('laker') ||
    lower.includes('bull') ||
    lower.includes('jordan') ||
    lower.includes('boston') ||
    lower.includes('celtic') ||
    lower.includes('brooklyn') ||
    lower.includes('knick') ||
    lower.includes('sixer') ||
    lower.includes('76er') ||
    lower.includes('spurs') ||
    lower.includes('duncan') ||
    lower.includes('curry') ||
    lower.includes('warrior') ||
    lower.includes('lebron') ||
    lower.includes('kobe') ||
    lower.includes('kareem') ||
    lower.includes('nba') ||
    lower.includes('allstar') ||
    lower.includes('basketball') ||
    lower.includes('short') ||
    lower.includes('dx.png') ||
    lower.includes('hkjne.png') ||
    lower.includes('ghgsf') ||
    lower.includes('4sr') ||
    lower.includes('15.05') ||
    lower.includes('bird') ||
    lower.includes('shaq') ||
    lower.includes('o\'neal') ||
    lower.includes('ku03')
  ) {
    return 'basketball';
  }
  return 'football';
}

export function detectApparelType(name: string): Product['apparelType'] {
  if (isKidsFootballFile(name)) return 'kids_kit';
  const lower = name.toLowerCase();
  if (lower.includes('ball')) return 'ball';
  if (
    lower.includes('short') ||
    lower.includes('red.png') ||
    lower.includes('red_blak') ||
    lower.includes('boston.png') ||
    lower.includes('booklyn') ||
    lower.includes('lakers_2')
  ) {
    return 'shorts';
  }
  return 'jersey';
}

export function detectCategory(name: string): Product['category'] {
  if (isKidsFootballFile(name)) return 'Kids Football Wear';
  const lower = name.toLowerCase();
  if (lower.includes('sneaker') || lower.includes('shoe') || lower.includes('boot') || lower.includes('trainer')) {
    return 'Footwear';
  }
  if (lower.includes('hoodie') || lower.includes('jacket') || lower.includes('parka') || lower.includes('pant') || lower.includes('tracksuit')) {
    return 'Training & Apparel';
  }
  if (lower.includes('shade') || lower.includes('glass') || lower.includes('cap') || lower.includes('bag') || lower.includes('glove')) {
    return 'Accessories';
  }
  return 'Kits & Jerseys';
}

/**
 * Fetch files from a Google Drive folder using the Drive v3 API
 * Recursively inspects subfolders if any exist.
 */
export async function fetchDriveImagesFromFolder(
  folderInput: string,
  accessToken: string
): Promise<{ products: Product[]; rawCount: number }> {
  const rootFolderId = extractFolderId(folderInput);
  const allImageFiles: DriveFileItem[] = [];

  async function crawlFolder(folderId: string, depth = 0) {
    if (depth > 2) return; // Prevent excessive deep recursion

    const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const fields = encodeURIComponent('files(id,name,mimeType,thumbnailLink,webContentLink,size,createdTime)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let message = `Google Drive API error (${response.status})`;
      try {
        const parsed = JSON.parse(errorBody);
        if (parsed.error?.message) {
          message = parsed.error.message;
        }
      } catch {
        // ignore
      }
      throw new Error(message);
    }

    const data = await response.json();
    const items: DriveFileItem[] = data.files || [];

    for (const item of items) {
      if (
        item.mimeType?.startsWith('image/') ||
        /\.(png|jpe?g|webp|gif|avif)$/i.test(item.name)
      ) {
        allImageFiles.push(item);
      } else if (item.mimeType === 'application/vnd.google-apps.folder') {
        await crawlFolder(item.id, depth + 1);
      }
    }
  }

  await crawlFolder(rootFolderId, 0);

  // 2. Fetch each image blob and convert to persistent base64 data URLs
  const products: Product[] = await Promise.all(
    allImageFiles.map(async (file) => {
      let imageUrl = '';

      try {
        const mediaRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (mediaRes.ok) {
          const blob = await mediaRes.blob();
          imageUrl = await blobToDataUrl(blob);
        } else if (file.thumbnailLink) {
          imageUrl = file.thumbnailLink.replace(/=s\d+/, '=s1200');
        }
      } catch (err) {
        console.warn(`Failed to fetch media for file ${file.name}, using fallback:`, err);
        if (file.thumbnailLink) {
          imageUrl = file.thumbnailLink.replace(/=s\d+/, '=s1200');
        }
      }

      if (!imageUrl && file.webContentLink) {
        imageUrl = file.webContentLink;
      }

      const cleanedName = cleanProductName(file.name);
      const brand = detectBrand(file.name);
      const category = detectCategory(file.name);
      const sport = detectSport(file.name);
      const isFootwear = category === 'Footwear';
      const isKids = category === 'Kids Football Wear' || sport === 'kids_football';
      const isBasketball = sport === 'basketball';

      return {
        id: `drive-${file.id}`,
        name: cleanedName,
        subtitle: isKids ? 'Google Drive Kids Football Wear Collection' : isBasketball ? 'Google Drive Basketball Collection' : 'Google Drive Sports Collection',
        brand,
        category,
        priceUSD: isKids ? 500 : isBasketball ? 450 : 850,
        description: `Imported directly from Google Drive folder (${file.name}). Official premium ${isKids ? 'kids football kit with matching shorts' : isBasketball ? 'basketball vest / court shorts (R450)' : 'sports kit'} with guaranteed doorstep delivery.`,
        details: [
          `Original Google Drive asset: ${file.name}`,
          isKids ? 'Complete kids kit set: Jersey + matching elastic shorts' : isBasketball ? 'Official adult basketball apparel: 46(S) to 54(2XL)' : 'Official matchday standard athletic construction',
          'Delivered nationwide in secure packaging',
          'Official Gifts Boutique sports apparel standard',
          'Authentic club cut & breathable performance weave'
        ],
        material: '100% Breathable Performance Poly',
        fit: isFootwear ? 'True to Size' : isKids ? 'Junior Athletic Fit' : isBasketball ? 'Adult Athletic Vest Fit' : 'Standard Athletic Fit',
        origin: 'Imported via Google Drive',
        primaryImage: imageUrl,
        alternateImages: imageUrl ? [imageUrl] : [],
        sizes: isFootwear
          ? ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
          : isKids
          ? ['Age 4-5 (XS)', 'Age 6-7 (S)', 'Age 8-9 (M)', 'Age 10-11 (L)', 'Age 12-13 (XL)', 'Age 14-15 (Youth XXL)']
          : isBasketball
          ? ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', '54 (2XL)']
          : ['S', 'M', 'L', 'XL', '2XL'],
        inStock: true,
        releaseYear: '2026',
        edition: isKids ? 'Kids Football Collection' : isBasketball ? 'Basketball Hardwood Collection' : 'Google Drive Collection',
        sport,
        apparelType: detectApparelType(file.name),
        ageGroup: isKids ? 'kids' : 'adult'
      };
    })
  );

  return { products, rawCount: allImageFiles.length };
}
