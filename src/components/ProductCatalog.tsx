import React, { useState, useMemo } from 'react';
import { Check } from 'lucide-react';
import { User } from 'firebase/auth';
import { Product, Currency, FilterBrand } from '../types/store';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onQuickView: (product: Product, options?: { customize?: boolean }) => void;
  onQuickAdd: (product: Product, size: string, options?: { isCustomized?: boolean }) => void;
  // Google Drive Integration
  user: User | null;
  token: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  onSyncDrive: (folderInput: string) => Promise<void>;
  isSyncingDrive: boolean;
  driveProductsCount: number;
  lastSyncedAt: Date | null;
  syncError: string | null;
  onOpenAddImagesModal: () => void;
  initialActiveSport?: 'all' | 'football' | 'basketball' | 'kids';
  activeTab?: 'all' | 'kids' | 'soccer' | 'football' | 'tracksuits' | 'basketball' | 'shorts' | 'socks';
  onTabChange?: (tab: 'all' | 'kids' | 'soccer' | 'football' | 'tracksuits' | 'basketball' | 'shorts' | 'socks') => void;
}

const KIDS_BASE_BRANDS: FilterBrand[] = [
  'All Kids Football Kits',
  'Real Madrid',
  'FC Barcelona',
  'Arsenal',
  'Manchester United',
  'Manchester City',
  'Argentina AFA',
  'Brazil CBF',
  'England FA',
  'Spain RFEF',
  'France FFF',
  'Mexico FMF',
  'Senegal FSF',
  'Inter Milan',
  'Bayern Munich',
  'AC Milan',
  'Al-Nassr FC',
  'CR7 Collection',
  'Liverpool FC'
];

const SOCCER_BASE_BRANDS: FilterBrand[] = [
  'All Soccer Clubs',
  'Germany DFB',
  'Real Madrid',
  'Arsenal',
  'France FFF',
  'Argentina AFA',
  'Manchester United',
  'Manchester City',
  'Liverpool FC',
  'Paris Saint-Germain',
  'Bayern Munich'
];

const BASKETBALL_BASE_BRANDS: FilterBrand[] = [
  'All Basketball Gear',
  'Chicago Bulls',
  'LA Lakers',
  'New York Knicks',
  'Philadelphia 76ers',
  'Golden State Warriors',
  'San Antonio Spurs',
  'Boston Celtics',
  'Brooklyn Nets',
  'Air Jordan',
  'NBA All-Star'
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  onCurrencyChange: _onCurrencyChange,
  onQuickView,
  onQuickAdd,
  user: _user,
  token: _token,
  onLogin: _onLogin,
  onLogout: _onLogout,
  onSyncDrive: _onSyncDrive,
  isSyncingDrive: _isSyncingDrive,
  driveProductsCount: _driveProductsCount,
  lastSyncedAt: _lastSyncedAt,
  syncError: _syncError,
  onOpenAddImagesModal: _onOpenAddImagesModal,
  initialActiveSport = 'all',
  activeTab: activeTabProp,
  onTabChange
}) => {
  const [internalTab, setInternalTab] = useState<'all' | 'kids' | 'soccer' | 'football' | 'tracksuits' | 'basketball' | 'shorts' | 'socks'>(
    initialActiveSport === 'football' ? 'soccer' : initialActiveSport
  );
  const activeCatalogTab = activeTabProp !== undefined ? activeTabProp : internalTab;
  const setActiveCatalogTab = (tab: 'all' | 'kids' | 'soccer' | 'football' | 'tracksuits' | 'basketball' | 'shorts' | 'socks') => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };
  const [selectedKidsBrand, setSelectedKidsBrand] = useState<string>('All Kids Football Kits');
  const [selectedSoccerBrand, setSelectedSoccerBrand] = useState<string>('All Soccer Clubs');
  const [selectedTracksuitBrand, setSelectedTracksuitBrand] = useState<string>('All Tracksuits');
  const [selectedSocksBrand, setSelectedSocksBrand] = useState<string>('All Grip Socks');
  const [selectedBasketballBrand, setSelectedBasketballBrand] = useState<string>('All Basketball Gear');
  const [selectedShortsBrand, setSelectedShortsBrand] = useState<string>('All Court Shorts');
  const [selectedBasketballType, setSelectedBasketballType] = useState<'all' | 'jersey' | 'shorts'>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Filter out any tournament balls and accessories
  const activeProducts = useMemo(() => {
    return products.filter((p) => p.apparelType !== 'ball' && p.apparelType !== 'gear');
  }, [products]);

  // Segregate products into Official Youth & Football Kits, Adult Soccer Jerseys, Official Tracksuits, Performance Grip Socks, Basketball Jerseys, and Court Shorts
  const allKidsFootballProducts = useMemo(() => {
    return activeProducts.filter(
      (p) =>
        p.category === 'Official Youth and Football Kits' ||
        p.category === 'Kids Football Wear' ||
        p.sport === 'kids_football' ||
        p.apparelType === 'kids_kit' ||
        p.ageGroup === 'kids' ||
        p.id.startsWith('kids-')
    );
  }, [activeProducts]);

  const allTracksuits = useMemo(() => {
    return activeProducts.filter(
      (p) =>
        p.apparelType === 'tracksuit' ||
        p.category === 'Tracksuits' ||
        p.id.startsWith('tracksuit-')
    );
  }, [activeProducts]);

  const allSocksProducts = useMemo(() => {
    return activeProducts.filter(
      (p) =>
        p.apparelType === 'socks' ||
        p.category === 'Socks' ||
        p.id.startsWith('socks-')
    );
  }, [activeProducts]);

  const allSoccerProducts = useMemo(() => {
    return activeProducts.filter(
      (p) =>
        p.sport !== 'basketball' &&
        p.category !== 'Tracksuits' &&
        p.apparelType !== 'tracksuit' &&
        !p.id.startsWith('tracksuit-') &&
        p.category !== 'Socks' &&
        p.apparelType !== 'socks' &&
        !p.id.startsWith('socks-') &&
        p.category !== 'Official Youth and Football Kits' &&
        p.category !== 'Kids Football Wear' &&
        p.sport !== 'kids_football' &&
        p.apparelType !== 'kids_kit' &&
        p.ageGroup !== 'kids' &&
        !p.id.startsWith('kids-')
    );
  }, [activeProducts]);

  const allBasketballProducts = useMemo(() => {
    return activeProducts.filter((p) => p.sport === 'basketball');
  }, [activeProducts]);

  const allBasketballJerseys = useMemo(() => {
    return allBasketballProducts.filter((p) => p.apparelType === 'jersey');
  }, [allBasketballProducts]);

  const allBasketballShorts = useMemo(() => {
    return allBasketballProducts.filter(
      (p) => p.apparelType === 'shorts' || p.category?.toLowerCase().includes('short') || p.name?.toLowerCase().includes('short')
    );
  }, [allBasketballProducts]);

  const kidsFootballCount = allKidsFootballProducts.length;
  const soccerJerseysCount = allSoccerProducts.length;
  const tracksuitsCount = allTracksuits.length;
  const socksCount = allSocksProducts.length;
  const basketballJerseysCount = allBasketballJerseys.length;
  const basketballShortsCount = allBasketballShorts.length;

  // Compute available kids brand filters dynamically
  const availableKidsBrands = useMemo(() => {
    const brandsSet = new Set<string>(KIDS_BASE_BRANDS);
    allKidsFootballProducts.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allKidsFootballProducts]);

  // Compute available soccer brand filters dynamically
  const availableSoccerBrands = useMemo(() => {
    const brandsSet = new Set<string>(SOCCER_BASE_BRANDS);
    allSoccerProducts.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allSoccerProducts]);

  // Compute available tracksuit brand filters dynamically
  const availableTracksuitBrands = useMemo(() => {
    const brandsSet = new Set<string>(['All Tracksuits']);
    allTracksuits.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allTracksuits]);

  // Compute available socks brand filters dynamically
  const availableSocksBrands = useMemo(() => {
    const brandsSet = new Set<string>(['All Grip Socks']);
    allSocksProducts.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allSocksProducts]);

  // Compute available basketball jersey brand filters
  const availableJerseyBrands = useMemo(() => {
    const brandsSet = new Set<string>(['All Basketball Gear']);
    allBasketballJerseys.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allBasketballJerseys]);

  // Compute available court shorts brand filters
  const availableShortsBrands = useMemo(() => {
    const brandsSet = new Set<string>(['All Court Shorts']);
    allBasketballShorts.forEach((p) => {
      if (p.brand && !brandsSet.has(p.brand)) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet);
  }, [allBasketballShorts]);

  // Helper sorting function
  const applySort = (list: Product[]) => {
    const copy = [...list];
    switch (sortOption) {
      case 'price-asc':
        return copy.sort((a, b) => a.priceUSD - b.priceUSD);
      case 'price-desc':
        return copy.sort((a, b) => b.priceUSD - a.priceUSD);
      case 'newest':
        return copy.sort((a, b) => b.edition.localeCompare(a.edition));
      default:
        return copy;
    }
  };

  // Filtered Kids Products
  const filteredKidsProducts = useMemo(() => {
    let result = allKidsFootballProducts.filter((item) => {
      if (selectedKidsBrand === 'All Kids Football Kits') return true;
      return item.brand === selectedKidsBrand;
    });
    return applySort(result);
  }, [allKidsFootballProducts, selectedKidsBrand, sortOption]);

  // Filtered Soccer Products
  const filteredSoccerProducts = useMemo(() => {
    let result = allSoccerProducts.filter((item) => {
      if (selectedSoccerBrand === 'All Soccer Clubs') return true;
      return item.brand === selectedSoccerBrand;
    });
    return applySort(result);
  }, [allSoccerProducts, selectedSoccerBrand, sortOption]);

  // Filtered Tracksuit Products
  const filteredTracksuitProducts = useMemo(() => {
    let result = allTracksuits.filter((item) => {
      if (selectedTracksuitBrand === 'All Tracksuits') return true;
      return item.brand === selectedTracksuitBrand;
    });
    return applySort(result);
  }, [allTracksuits, selectedTracksuitBrand, sortOption]);

  // Filtered Socks Products
  const filteredSocksProducts = useMemo(() => {
    let result = allSocksProducts.filter((item) => {
      if (selectedSocksBrand === 'All Grip Socks') return true;
      return item.brand === selectedSocksBrand;
    });
    return applySort(result);
  }, [allSocksProducts, selectedSocksBrand, sortOption]);

  // Filtered Basketball Jerseys
  const filteredJerseyProducts = useMemo(() => {
    let result = allBasketballJerseys.filter((item) => {
      if (selectedBasketballBrand === 'All Basketball Gear') return true;
      return item.brand === selectedBasketballBrand;
    });
    return applySort(result);
  }, [allBasketballJerseys, selectedBasketballBrand, sortOption]);

  // Filtered Court Shorts
  const filteredShortsProducts = useMemo(() => {
    let result = allBasketballShorts.filter((item) => {
      if (selectedShortsBrand === 'All Court Shorts') {
        if (selectedBasketballBrand !== 'All Basketball Gear') {
          return item.brand === selectedBasketballBrand;
        }
        return true;
      }
      return item.brand === selectedShortsBrand;
    });
    return applySort(result);
  }, [allBasketballShorts, selectedShortsBrand, selectedBasketballBrand, sortOption]);

  return (
    <div className="bg-white border-b border-zinc-200">
      {/* Top Catalogue Nav & Filter Bar (All Grey Tabs) */}
      <div className="sticky top-16 z-30 bg-white border-b border-zinc-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Section Selection Tabs (All Grey) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-lg border border-zinc-300 shadow-2xs">
            <button
              onClick={() => {
                setActiveCatalogTab('all');
                setSelectedBasketballType('all');
                const el = document.getElementById('kids-football') || document.getElementById('soccer-jerseys') || document.getElementById('catalog-nav-bar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeCatalogTab === 'all'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              All Catalogues ({activeProducts.length})
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('kids');
                const el = document.getElementById('kids-football');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'kids'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Kids Football Kits</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'kids'
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-800 font-bold border border-zinc-300'
              }`}>
                {kidsFootballCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('soccer');
                const el = document.getElementById('soccer-jerseys') || document.getElementById('football-catalogue');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'soccer' || activeCatalogTab === 'football'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Soccer Jerseys</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'soccer' || activeCatalogTab === 'football'
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-700'
              }`}>
                {soccerJerseysCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('tracksuits');
                const el = document.getElementById('club-tracksuits');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'tracksuits'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Tracksuits</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'tracksuits'
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-700'
              }`}>
                {tracksuitsCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('socks');
                const el = document.getElementById('matchday-socks') || document.getElementById('performance-socks');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'socks'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Matchday Socks</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'socks'
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-700'
              }`}>
                {socksCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('basketball');
                setSelectedBasketballType('jersey');
                const el = document.getElementById('basketball-jerseys') || document.getElementById('basketball-catalogue');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'basketball' && selectedBasketballType === 'jersey'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Basketball Jerseys</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'basketball' && selectedBasketballType === 'jersey'
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-700'
              }`}>
                {basketballJerseysCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveCatalogTab('shorts');
                setSelectedBasketballType('shorts');
                const el = document.getElementById('court-shorts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCatalogTab === 'shorts' || (activeCatalogTab === 'basketball' && selectedBasketballType === 'shorts')
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              <span>Court Shorts</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCatalogTab === 'shorts' || (activeCatalogTab === 'basketball' && selectedBasketballType === 'shorts')
                  ? 'bg-zinc-700 text-zinc-100 font-bold'
                  : 'bg-zinc-200 text-zinc-700'
              }`}>
                {basketballShortsCount}
              </span>
            </button>
          </div>

          {/* Right Toolbar: Sort (Clean Grey Styling) */}
          <div className="flex items-center gap-3">
            <label htmlFor="catalog-sort" className="text-xs font-semibold text-zinc-600 shrink-0">
              Sort by:
            </label>
            <select
              id="catalog-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-800 font-semibold focus:outline-hidden focus:border-zinc-500 transition-colors cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">2026 Latest Releases</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: KIDS FOOTBALL WEAR (BANNER GREEN BACKGROUND)                  */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'kids') && (
        <section id="kids-football" className="py-14 border-b border-emerald-800 scroll-mt-28 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
          <div id="kids-football-wear" className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-emerald-800">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display flex flex-wrap items-center gap-2.5">
                  <span>Kids Football Kits</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-sans font-extrabold shadow-sm">
                    New Kids Sets (Player Personalised)
                  </span>
                </h2>
                <p className="text-xs text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
                  Official kids football kits. Each complete junior set includes the official club or national team jersey paired with matching elastic-waist shorts, with player personalised name & number styling.
                </p>
              </div>

              <div className="text-xs text-emerald-100 font-semibold bg-emerald-900 px-3.5 py-1.5 rounded-lg border border-emerald-700 self-start md:self-auto flex items-center gap-2 shadow-sm">
                <span>Showing {filteredKidsProducts.length} Kids Football Kits</span>
              </div>
            </div>

            {/* Kids Brand Filter Tabs (All Grey) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableKidsBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedKidsBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedKidsBrand === brand
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                        : 'bg-zinc-200 text-zinc-800 border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {selectedKidsBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kids Product Grid */}
            {filteredKidsProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredKidsProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-emerald-900 border border-emerald-700 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No kids football kits found for "{selectedKidsBrand}"
                </p>
                <button
                  onClick={() => setSelectedKidsBrand('All Kids Football Kits')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-200 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
                >
                  Reset Kids Football Kits Filter
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: SOCCER JERSEYS (BANNER GREEN BACKGROUND)                      */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'soccer' || activeCatalogTab === 'football') && (
        <section id="soccer-jerseys" className="py-14 border-b border-emerald-800 scroll-mt-28 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
          <div id="football-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-emerald-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  <span>Official Club & National Teams</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display flex flex-wrap items-center gap-2.5">
                  <span>Soccer Jerseys & Sets</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-sans font-extrabold border border-emerald-600 shadow-sm">
                    Adult Tops & Complete Sets
                  </span>
                </h2>
                <p className="text-xs text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
                  Official club & national team matchday wear. Adult tops (plain with no names and numbers) and complete adult sets with matching shorts.
                </p>
              </div>

              <div className="text-xs text-emerald-100 font-semibold bg-emerald-900 px-3.5 py-1.5 rounded-lg border border-emerald-700 self-start md:self-auto shadow-sm">
                Showing {filteredSoccerProducts.length} Soccer Jerseys
              </div>
            </div>

            {/* Soccer Brand Filter Tabs Row (All Grey Tabs) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableSoccerBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedSoccerBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedSoccerBrand === brand
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                        : 'bg-zinc-200 text-zinc-800 border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {selectedSoccerBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Soccer Product Grid */}
            {filteredSoccerProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredSoccerProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-emerald-900 border border-emerald-700 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No soccer jerseys found for "{selectedSoccerBrand}"
                </p>
                <button
                  onClick={() => setSelectedSoccerBrand('All Soccer Clubs')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-200 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
                >
                  Reset Soccer Clubs
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: OFFICIAL CLUB TRACKSUITS (PREMIUM EMERALD SECTION)             */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'tracksuits') && (
        <section id="club-tracksuits" className="py-14 border-b border-emerald-900 scroll-mt-28 bg-gradient-to-b from-emerald-950 via-zinc-900 to-emerald-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-emerald-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  <span>Official Club & National Teams</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display flex flex-wrap items-center gap-2.5">
                  <span>Official Club Tracksuits</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-sans font-extrabold border border-emerald-600 shadow-sm">
                    Full Sets · Jacket + Tapered Pants
                  </span>
                </h2>
                <p className="text-xs text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
                  Official club and national team training tracksuits. Complete two-piece sets featuring full-zip performance jacket, matching tapered pants with secure zip pockets, and high-density embroidered club crests.
                </p>
              </div>

              <div className="text-xs text-emerald-100 font-semibold bg-emerald-900 px-3.5 py-1.5 rounded-lg border border-emerald-700 self-start md:self-auto flex items-center gap-2 shadow-sm">
                <span>Showing {filteredTracksuitProducts.length} Official Tracksuits</span>
              </div>
            </div>

            {/* Tracksuit Brand Filter Tabs Row */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableTracksuitBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedTracksuitBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedTracksuitBrand === brand
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                        : 'bg-zinc-200 text-zinc-800 border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {selectedTracksuitBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tracksuits Grid: All cards render tracksuits bigger with edge-to-edge frame fill */}
            {filteredTracksuitProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredTracksuitProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-emerald-900 border border-emerald-700 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No tracksuits found for "{selectedTracksuitBrand}"
                </p>
                <button
                  onClick={() => setSelectedTracksuitBrand('All Tracksuits')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-200 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
                >
                  Reset Tracksuits Filter
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION: PERFORMANCE GRIP SOCKS (TECH NAVY/BLUE SECTION)                  */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'socks') && (
        <section id="matchday-socks" className="py-14 border-b border-blue-900 scroll-mt-28 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
          <div id="performance-socks" className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-blue-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">
                  <span>Matchday & Court Performance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display flex flex-wrap items-center gap-2.5">
                  <span>Matchday Socks</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-sans font-extrabold border border-blue-500 shadow-sm">
                    Anti-Slip Cushion Grip
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-1.5 max-w-2xl leading-relaxed">
                  Professional anti slip cushion grip socks engineered for football, rugby, basketball. Universal adult size (UK 4-12).
                </p>
              </div>

              <div className="text-xs text-blue-100 font-semibold bg-blue-900/80 px-3.5 py-1.5 rounded-lg border border-blue-700 self-start md:self-auto flex items-center gap-2 shadow-sm">
                <span>Showing {filteredSocksProducts.length} Matchday Socks</span>
              </div>
            </div>

            {/* Socks Filter Tabs Row */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableSocksBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedSocksBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedSocksBrand === brand
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                        : 'bg-zinc-200 text-zinc-800 border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {selectedSocksBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Socks Product Grid */}
            {filteredSocksProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                {filteredSocksProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-blue-950 border border-blue-800 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No grip socks found for "{selectedSocksBrand}"
                </p>
                <button
                  onClick={() => setSelectedSocksBrand('All Grip Socks')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-200 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
                >
                  Reset Grip Socks Filter
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: BASKETBALL JERSEYS (ORANGE BACKGROUND)                         */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'basketball') &&
        (selectedBasketballType === 'all' || selectedBasketballType === 'jersey') && (
        <section id="basketball-jerseys" className="py-14 border-b border-orange-700 scroll-mt-28 bg-gradient-to-b from-[#ea580c] via-[#d97706] to-[#c2410c] text-white">
          <div id="basketball-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-orange-500">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100 mb-1">
                  <span>Hardwood & Court Collection</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display drop-shadow-xs flex flex-wrap items-center gap-2.5">
                  <span>Basketball Jerseys</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-sans font-extrabold shadow-sm">
                    Adult Sizes: 46(S) 48(M) 50(L) 52(XL) 54(2XL)
                  </span>
                </h2>
                <p className="text-xs text-amber-50 mt-1.5 max-w-2xl leading-relaxed">
                  Authentic NBA court jerseys and Mitchell & Ness Hardwood Classics vests with front & back photography. Adult sizes 46(S), 48(M), 50(L), 52(XL), and 54(2XL).
                </p>
              </div>

              <div className="text-xs text-white font-semibold bg-orange-950 px-3.5 py-1.5 rounded-lg border border-orange-500 self-start md:self-auto flex items-center gap-2 shadow-sm">
                <span>Showing {filteredJerseyProducts.length} Basketball Jerseys</span>
              </div>
            </div>

            {/* Sub-Category Type Toggle (All Grey Tabs) */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white mr-1">Apparel View:</span>
              <button
                onClick={() => setSelectedBasketballType('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  (selectedBasketballType as string) === 'all'
                    ? 'bg-zinc-900 text-white shadow-xs border border-zinc-800'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-white'
                }`}
              >
                All Basketball ({allBasketballProducts.length})
              </button>
              <button
                onClick={() => setSelectedBasketballType('jersey')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  (selectedBasketballType as string) === 'jersey'
                    ? 'bg-zinc-900 text-white shadow-xs border border-zinc-800'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-white'
                }`}
              >
                <span>Basketball Jerseys</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-zinc-700 text-zinc-100 rounded-full font-mono">
                  {basketballJerseysCount}
                </span>
              </button>
              <button
                onClick={() => {
                  setSelectedBasketballType('shorts');
                  const el = document.getElementById('court-shorts');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  (selectedBasketballType as string) === 'shorts'
                    ? 'bg-zinc-900 text-white shadow-xs border border-zinc-800'
                    : 'bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-white'
                }`}
              >
                <span>Court Shorts</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-zinc-700 text-zinc-100 rounded-full font-mono">
                  {basketballShortsCount}
                </span>
              </button>
            </div>

            {/* Basketball Jersey Brand Filter Tabs Row (All Grey Tabs) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableJerseyBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBasketballBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedBasketballBrand === brand
                        ? 'bg-zinc-900 text-white shadow-xs border border-zinc-800'
                        : 'bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-white'
                    }`}
                  >
                    {selectedBasketballBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basketball Jerseys Product Grid */}
            {filteredJerseyProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredJerseyProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-orange-950 border border-orange-500 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No jerseys found for "{selectedBasketballBrand}"
                </p>
                <button
                  onClick={() => setSelectedBasketballBrand('All Basketball Gear')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-100 hover:bg-white rounded-md transition-colors cursor-pointer"
                >
                  Reset Jersey Teams
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: COURT SHORTS (ORANGE BASKETBALL SUBSECTION)                     */}
      {/* ========================================================================= */}
      {(activeCatalogTab === 'all' || activeCatalogTab === 'basketball' || activeCatalogTab === 'shorts') &&
        (selectedBasketballType === 'all' || selectedBasketballType === 'shorts') && (
        <section id="court-shorts" className="py-14 border-b border-orange-700 scroll-mt-28 bg-gradient-to-b from-[#c2410c] via-[#ea580c] to-[#b45309] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Dedicated Shorts Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-orange-500">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-100 mb-1">
                  <span>Pro Hardwood & Statement Editions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display drop-shadow-xs flex flex-wrap items-center gap-2.5">
                  <span>Court Shorts</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-sans font-extrabold shadow-sm">
                    Adult Sizes: 46(S) 48(M) 50(L) 52(XL) 54(2XL)
                  </span>
                </h2>
                <p className="text-xs text-amber-50 mt-1.5 max-w-2xl leading-relaxed">
                  Authentic heavyweight pro basketball shorts. Adult sizes 46(S), 48(M), 50(L), 52(XL), and 54(2XL).
                </p>
              </div>

              <div className="text-xs text-white font-semibold bg-orange-950 px-3.5 py-1.5 rounded-lg border border-orange-500 self-start md:self-auto flex items-center gap-2 shadow-sm">
                <span>Showing {filteredShortsProducts.length} Court Shorts</span>
              </div>
            </div>

            {/* Shorts Brand / Team Filter Tabs Row (All Grey Tabs) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableShortsBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedShortsBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedShortsBrand === brand
                        ? 'bg-zinc-900 text-white shadow-xs border border-zinc-800'
                        : 'bg-zinc-100 text-zinc-800 border border-zinc-300 hover:bg-white'
                    }`}
                  >
                    {selectedShortsBrand === brand && <Check className="w-3.5 h-3.5 text-zinc-300" />}
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Court Shorts Product Grid */}
            {filteredShortsProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filteredShortsProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-orange-950 border border-orange-500 rounded-xl p-8 shadow-sm text-white">
                <p className="text-base text-white font-bold">
                  No court shorts found for "{selectedShortsBrand}"
                </p>
                <button
                  onClick={() => setSelectedShortsBrand('All Court Shorts')}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-zinc-100 hover:bg-white rounded-md transition-colors cursor-pointer"
                >
                  Reset Court Shorts
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
