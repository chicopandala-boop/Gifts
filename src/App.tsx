/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import { Product, CartItem, Currency } from './types/store';
import { INITIAL_PRODUCTS, COMBINED_INITIAL_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { AddImagesModal } from './components/AddImagesModal';
import { initAuth, googleSignIn, logout } from './services/auth';
import { fetchDriveImagesFromFolder, DEFAULT_DRIVE_FOLDER_ID } from './services/drive';
import { loadPersistedProducts, persistProducts } from './services/productStorage';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [activeSection, setActiveSection] = useState<string>('collection');
  const [catalogTab, setCatalogTab] = useState<'all' | 'kids' | 'soccer' | 'football' | 'tracksuits' | 'basketball' | 'shorts' | 'socks'>('all');

  // Google Drive & custom products state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [driveProducts, setDriveProducts] = useState<Product[]>([]);
  const [isSyncingDrive, setIsSyncingDrive] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewCustomize, setQuickViewCustomize] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAddImagesOpen, setIsAddImagesOpen] = useState(false);

  const handleOpenQuickView = (product: Product, options?: { customize?: boolean }) => {
    setQuickViewProduct(product);
    setQuickViewCustomize(Boolean(options?.customize));
  };

  // Load any previously persisted products from IndexedDB on startup
  useEffect(() => {
    async function loadSaved() {
      try {
        const saved = await loadPersistedProducts();
        if (saved && saved.length > 0) {
          const legacyKidsIds = new Set([
            'drive-new-real-madrid-mbappe-kids',
            'drive-new-arsenal-saka-kids',
            'drive-new-man-united-home-bruno-kids',
            'drive-new-man-united-third-bruno-kids',
            'drive-new-man-city-haaland-home-kids',
            'drive-new-man-city-haaland-third-kids'
          ]);
          setDriveProducts(saved.filter((p) => !legacyKidsIds.has(p.id)));
        }
      } catch (err) {
        console.warn('Could not load stored products:', err);
      }
    }
    loadSaved();
  }, []);

  // Combined product catalog: custom uploaded items placed first, then COMBINED_INITIAL_PRODUCTS
  const allProducts = useMemo(() => {
    const customIds = new Set(driveProducts.map((p) => p.id));
    const nonDuplicatedInitial = COMBINED_INITIAL_PRODUCTS.filter((p) => !customIds.has(p.id));
    return [...driveProducts, ...nonDuplicatedInitial];
  }, [driveProducts]);

  const totalDriveProductsCount = useMemo(() => {
    return allProducts.filter((p) => p.id.startsWith('drive-') || p.edition.includes('Drive')).length;
  }, [allProducts]);

  // Sync Google Drive images from specified folder
  const handleSyncDrive = async (folderInput?: string, activeToken?: string) => {
    const targetFolder = folderInput || DEFAULT_DRIVE_FOLDER_ID;
    const effectiveToken = activeToken || token;
    if (!effectiveToken) {
      await handleLogin();
      return;
    }

    setIsSyncingDrive(true);
    setSyncError(null);
    try {
      const result = await fetchDriveImagesFromFolder(targetFolder, effectiveToken);
      if (result.products.length === 0) {
        setSyncError(
          `No images found in folder (${result.rawCount} other items). Please ensure folder contains image files (JPG, PNG, WEBP).`
        );
      } else {
        setDriveProducts((prev) => {
          // Merge keeping non-duplicates
          const existingIds = new Set(result.products.map((p) => p.id));
          const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
          const updated = [...result.products, ...filteredPrev];
          persistProducts(updated);
          return updated;
        });
        setLastSyncedAt(new Date());
      }
    } catch (err: any) {
      console.error('Drive sync failed:', err);
      setSyncError(err?.message || 'Could not fetch images from Google Drive folder.');
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Google Sign-In with popup
  const handleLogin = async () => {
    setSyncError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        // Automatically sync the target folder once authenticated
        await handleSyncDrive(DEFAULT_DRIVE_FOLDER_ID, result.accessToken);
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err?.code !== 'auth/popup-closed-by-user') {
        setSyncError(err?.message || 'Google Sign-in was unsuccessful.');
      }
    }
  };

  // Google Sign-Out
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  // Add custom products (e.g. from file upload or Drive sync)
  const handleAddCustomProducts = (newProducts: Product[]) => {
    setDriveProducts((prev) => {
      const updated = [...newProducts, ...prev];
      persistProducts(updated);
      return updated;
    });
  };

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        if (currentToken) {
          handleSyncDrive(DEFAULT_DRIVE_FOLDER_ID, currentToken);
        }
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Cart operations with support for customized youth football kits
  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
    customization?: { isCustomized?: boolean; customName?: string; customNumber?: string; unitPriceUSD?: number }
  ) => {
    const isCustom = Boolean(customization?.isCustomized);
    const unitPriceUSD =
      customization?.unitPriceUSD ??
      (isCustom ? (product.customizablePriceUSD ?? 600) : product.priceUSD);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          Boolean(item.isCustomized) === isCustom &&
          (item.customName || '') === (customization?.customName || '') &&
          (item.customNumber || '') === (customization?.customNumber || '')
      );
      const activeImage = product.customImage || product.primaryImage;

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedSize: size,
            quantity,
            activeImage,
            isCustomized: isCustom,
            customName: customization?.customName,
            customNumber: customization?.customNumber,
            unitPriceUSD
          }
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    size: string,
    quantity: number,
    isCustomized?: boolean,
    customName?: string
  ) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, size, isCustomized, customName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        Boolean(item.isCustomized) === Boolean(isCustomized) &&
        (item.customName || '') === (customName || '')
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (
    productId: string,
    size: string,
    isCustomized?: boolean,
    customName?: string
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            Boolean(item.isCustomized) === Boolean(isCustomized) &&
            (item.customName || '') === (customName || '')
          )
      )
    );
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'kids-football' || sectionId === 'kids-football-wear' || sectionId === 'kids') {
      setCatalogTab('kids');
    } else if (sectionId === 'soccer-jerseys' || sectionId === 'football-catalogue' || sectionId === 'collection') {
      setCatalogTab('soccer');
    } else if (sectionId === 'club-tracksuits' || sectionId === 'tracksuits') {
      setCatalogTab('tracksuits');
    } else if (sectionId === 'matchday-socks' || sectionId === 'performance-socks' || sectionId === 'socks') {
      setCatalogTab('socks');
    } else if (sectionId === 'basketball-catalogue' || sectionId === 'basketball-jerseys') {
      setCatalogTab('basketball');
    } else if (sectionId === 'court-shorts') {
      setCatalogTab('shorts');
    } else if (sectionId === 'all-catalogues') {
      setCatalogTab('all');
    }

    if (sectionId === 'checkout' || sectionId === 'nationwide-checkout') {
      setIsCheckoutOpen(true);
      return;
    }

    let targetId = sectionId === 'collection' ? 'soccer-jerseys' : sectionId;
    if (targetId === 'football-catalogue') targetId = 'soccer-jerseys';
    if (targetId === 'kids' || targetId === 'kids-football-wear') targetId = 'kids-football';
    if (targetId === 'tracksuits') targetId = 'club-tracksuits';
    if (targetId === 'socks' || targetId === 'performance-socks') targetId = 'matchday-socks';
    if (targetId === 'all-catalogues') targetId = 'hero';
    const element = document.getElementById(targetId) || document.getElementById('soccer-jerseys');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* 3-Zone Strict Top Bar with Announcement Banner */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        user={user}
        driveCount={totalDriveProductsCount}
        onOpenDriveSync={() => setIsAddImagesOpen(true)}
      />

      <main className="flex-1">
        {/* Sports Brands & Matchday Hero */}
        <Hero
          onExploreKids={() => handleNavigate('kids-football')}
          onExploreCollection={() => handleNavigate('soccer-jerseys')}
          onExploreFootball={() => handleNavigate('soccer-jerseys')}
          onExploreTracksuits={() => handleNavigate('club-tracksuits')}
          onExploreSocks={() => handleNavigate('matchday-socks')}
          onExploreBasketball={() => handleNavigate('basketball-jerseys')}
          onExploreDelivery={() => handleNavigate('court-shorts')}
          driveProducts={allProducts.filter((p) => p.id.startsWith('drive-') || p.edition.includes('Drive'))}
          onQuickView={handleOpenQuickView}
          onSyncDrive={() => handleSyncDrive()}
          isSyncingDrive={isSyncingDrive}
          currency={currency}
        />

        {/* All Sports Brands Catalog */}
        <ProductCatalog
          products={allProducts}
          currency={currency}
          onCurrencyChange={setCurrency}
          onQuickView={handleOpenQuickView}
          onQuickAdd={(p, size) => handleAddToCart(p, size, 1)}
          user={user}
          token={token}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onSyncDrive={(folder) => handleSyncDrive(folder)}
          isSyncingDrive={isSyncingDrive}
          driveProductsCount={totalDriveProductsCount}
          lastSyncedAt={lastSyncedAt}
          syncError={syncError}
          onOpenAddImagesModal={() => setIsAddImagesOpen(true)}
          activeTab={catalogTab}
          onTabChange={setCatalogTab}
        />
      </main>

      {/* Deep Emerald Footer (Cleaned: no sports brands directory, no we deliver nationwide, alerts linked to separate tab) */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          currency={currency}
          onClose={() => {
            setQuickViewProduct(null);
            setQuickViewCustomize(false);
          }}
          onAddToCart={handleAddToCart}
          initialCustomized={quickViewCustomize}
        />
      )}

      {/* Direct Add / Upload Images to Catalogue Modal */}
      <AddImagesModal
        isOpen={isAddImagesOpen}
        onClose={() => setIsAddImagesOpen(false)}
        onAddProducts={handleAddCustomProducts}
        onSyncDrive={() => handleSyncDrive(DEFAULT_DRIVE_FOLDER_ID)}
        isSyncingDrive={isSyncingDrive}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Direct Nationwide Order Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onOrderCompleted={() => setCart([])}
      />
    </div>
  );
}
