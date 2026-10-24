export interface Product {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  category: 'Kits & Jerseys' | 'Footwear' | 'Training & Apparel' | 'Accessories' | 'Kids Football Wear' | 'Official Youth and Football Kits' | 'Tracksuits' | 'Socks';
  priceUSD: number;
  customizablePriceUSD?: number;
  description: string;
  details: string[];
  material: string;
  fit: string;
  origin: string;
  primaryImage: string;
  alternateImages?: string[];
  customImage?: string;
  sizes: string[];
  inStock: boolean;
  releaseYear: string;
  edition: string;
  sport?: 'football' | 'soccer' | 'basketball' | 'kids_football';
  apparelType?: 'jersey' | 'shorts' | 'ball' | 'gear' | 'kids_kit' | 'tracksuit' | 'socks';
  ageGroup?: 'kids' | 'adult';
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
  activeImage: string;
  isCustomized?: boolean;
  customName?: string;
  customNumber?: string;
  unitPriceUSD?: number;
}

export type Currency = 'ZAR' | 'USD' | 'EUR' | 'GBP';

export type FilterBrand = string;

export type FilterCategory = 'All' | 'Kits & Jerseys' | 'Footwear' | 'Training & Apparel' | 'Accessories' | 'Tracksuits';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export type StudioLightingPreset = 'neutral' | 'travertine' | 'brutalist' | 'warm-dusk' | 'high-contrast';
