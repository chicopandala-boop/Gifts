import React, { useState, useEffect } from 'react';
import { X, Check, Truck, RotateCcw, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    quantity: number,
    customization?: { isCustomized?: boolean; customName?: string; customNumber?: string; unitPriceUSD?: number }
  ) => void;
  initialCustomized?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  initialCustomized = false
}) => {
  if (!product) return null;

  return (
    <ProductDetailContent
      key={product.id}
      product={product}
      currency={currency}
      onClose={onClose}
      onAddToCart={onAddToCart}
      initialCustomized={initialCustomized}
    />
  );
};

interface ProductDetailContentProps {
  product: Product;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    quantity: number,
    customization?: { isCustomized?: boolean; customName?: string; customNumber?: string; unitPriceUSD?: number }
  ) => void;
  initialCustomized?: boolean;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  initialCustomized = false
}) => {
  const displayImage = product.customImage || product.primaryImage;
  const [selectedImage, setSelectedImage] = useState(displayImage);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Age 4-5');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isTracksuit =
    product.apparelType === 'tracksuit' ||
    product.category === 'Tracksuits' ||
    product.id.startsWith('tracksuit-');

  const isSocks =
    product.apparelType === 'socks' ||
    product.category === 'Socks' ||
    product.id.startsWith('socks-');

  const isYouthKit =
    !isTracksuit &&
    !isSocks &&
    (product.category === 'Official Youth and Football Kits' ||
      product.sport === 'kids_football' ||
      product.ageGroup === 'kids' ||
      (product.sizes.length > 0 && product.sizes[0].toLowerCase().includes('age')));

  const [isCustomized, setIsCustomized] = useState(initialCustomized);

  useEffect(() => {
    setIsCustomized(initialCustomized);
    setSelectedSize(product.sizes[0] || (isTracksuit ? 'M' : isSocks ? 'One Size (UK 4-12)' : isYouthKit ? 'Age 4-5' : 'Standard'));
    setSelectedImage(product.customImage || product.primaryImage);
  }, [product, initialCustomized, isYouthKit, isTracksuit, isSocks]);

  const isSoccer = !isTracksuit && !isYouthKit && !isSocks && (product.sport === 'football' || product.sport === 'soccer');
  const isBasketball = product.sport === 'basketball';
  const rawImages = isSoccer || isYouthKit || isTracksuit || isSocks
    ? [displayImage]
    : [
        displayImage,
        ...(product.alternateImages || []).filter((img) => img !== displayImage)
      ];
  // Basketball jerseys strictly have Front & Back only (never View 3)
  const allImages = isBasketball ? rawImages.slice(0, 2) : rawImages;

  const currentUnitPrice = isYouthKit && isCustomized
    ? (product.customizablePriceUSD ?? 600)
    : product.priceUSD;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, {
      isCustomized: isYouthKit && isCustomized,
      unitPriceUSD: currentUnitPrice
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-emerald-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-500 hover:text-zinc-900 bg-white/90 backdrop-blur-sm rounded-full border border-zinc-200 transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery & Viewport */}
        <div className="md:w-1/2 p-6 flex flex-col bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-100">
          {/* Main Visual Frame */}
          <div className={`relative aspect-[4/5] rounded-xl overflow-hidden bg-white border-2 border-zinc-200 hover:border-emerald-700 shadow-xs flex items-center justify-center transition-colors ${
            isTracksuit ? 'p-0' : 'p-3'
          }`}>
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className={
                isTracksuit
                  ? "w-full h-full object-cover object-center drop-shadow-xs"
                  : "w-full h-full max-h-full max-w-full object-contain object-center drop-shadow-xs"
              }
            />
            {/* Brand overlay tag */}
            <div className="absolute top-3 left-3 bg-white/95 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md border border-emerald-200 shadow-xs">
              {product.brand}
            </div>

            {isSocks && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs flex items-center font-sans border border-blue-500">
                <span>R60 · Matchday Socks</span>
              </div>
            )}

            {isTracksuit && (
              <div className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs flex items-center font-sans border border-emerald-600">
                <span>Full Set · Jacket + Pants</span>
              </div>
            )}

            {isYouthKit && (
              <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs flex items-center font-sans">
                <span>Sizes 4-14</span>
              </div>
            )}

            {isBasketball && (
              <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs flex items-center font-sans">
                <span>R450 · Sizes 46-54</span>
              </div>
            )}

            {/* Quick Flip View Toggle - only for basketball items with front & back views */}
            {!isSoccer && !isYouthKit && allImages.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const nextIndex = (allImages.indexOf(selectedImage) + 1) % allImages.length;
                  setSelectedImage(allImages[nextIndex]);
                }}
                className="absolute bottom-3 right-3 bg-zinc-900/85 hover:bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Flip View ({allImages.indexOf(selectedImage) === 0 ? 'Back' : 'Front'})</span>
              </button>
            )}
          </div>

          {/* Alternate Thumbnail Strip with Front / Back badges only (no View 3) */}
          {!isSoccer && !isYouthKit && allImages.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-emerald-600 shadow-sm ring-2 ring-emerald-500/50'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail view ${idx === 0 ? 'Front' : 'Back'}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-zinc-950/75 text-[9px] font-bold text-white text-center py-0.5 backdrop-blur-2xs uppercase tracking-wider">
                    {idx === 0 ? 'Front' : 'Back'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Nationwide Dispatch Banner inside Gallery */}
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              We Deliver Nationwide to all addresses.
            </span>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1.5">
                <span>{product.brand}</span>
                <span aria-hidden="true" className="text-zinc-300">·</span>
                <span className="text-zinc-500 font-normal">
                  {isYouthKit ? 'Kids Football Kits' : isSocks ? 'Matchday Grip Socks' : isTracksuit ? 'Official Training Tracksuit' : product.category}
                </span>
              </div>

              {/* Product Title in Green */}
              <h2 className="text-2xl font-black tracking-tight text-emerald-700 font-display">
                {product.name}
              </h2>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 mt-2">
                <p className="text-3xl font-black text-emerald-700 font-display tracking-wide">
                  {formatPrice(currentUnitPrice, currency)}
                </p>
                {isYouthKit && (
                  <span className="text-xs font-semibold text-zinc-500">
                    {isCustomized ? '(Customizable R600)' : '(Standard Kit R500)'}
                  </span>
                )}
              </div>
            </div>

            {/* Customization Selector for Youth Kits (R500 Standard vs Customizable R600) */}
            {isYouthKit && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider font-sans">
                    Kit Edition Options
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800">
                    Ages 4-14
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCustomized(false)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left cursor-pointer ${
                      !isCustomized
                        ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs ring-2 ring-emerald-500/30'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-white'
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500 uppercase font-semibold">Standard Kit</div>
                    <div className="text-sm font-black font-display text-emerald-800">
                      {formatPrice(500, currency)}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCustomized(true)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border text-left cursor-pointer ${
                      isCustomized
                        ? 'bg-amber-400 border-amber-500 text-emerald-950 shadow-xs ring-2 ring-amber-400/40'
                        : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-[10px] text-emerald-950 uppercase font-bold">Customizable</div>
                    <div className="text-sm font-black font-display text-emerald-950">
                      {formatPrice(600, currency)}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Size Selector on sizes 4-14 or Basketball adult sizes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-950 uppercase tracking-wider font-sans">
                  {isYouthKit
                    ? 'Select Youth Size (Ages 4-14)'
                    : isBasketball
                    ? 'Adult Size: 46(S) 48(M) 50(L) 52(XL) 54(2XL)'
                    : 'Select Size'}
                </span>
                <span className="text-emerald-700 font-semibold">
                  {isBasketball ? 'Adult Athletic Vest Fit' : product.fit}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-900 hover:border-emerald-500 hover:text-emerald-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-sans">
                Quantity
              </span>
              <div className="flex items-center border border-zinc-200 bg-zinc-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono tabular-nums font-bold text-zinc-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Buy & WhatsApp CTA */}
          <div className="pt-6 border-t border-zinc-100 mt-6 space-y-2.5">
            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={justAdded}
              className={`w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                isYouthKit && isCustomized
                  ? 'bg-amber-400 hover:bg-amber-300 text-emerald-950'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>
                    {isYouthKit && isCustomized
                      ? 'Add Customizable Kit'
                      : 'Add to Bag'}
                  </span>
                  <span className="font-display font-bold text-sm tracking-wide">
                    ({formatPrice(currentUnitPrice * quantity, currency)})
                  </span>
                </span>
              )}
            </button>


            {/* Quick toggle to customizable if currently standard on youth kits */}
            {isYouthKit && !isCustomized && (
              <button
                type="button"
                onClick={() => setIsCustomized(true)}
                className="w-full py-2 px-4 text-xs font-bold uppercase tracking-wider text-emerald-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
              >
                <span>Personalise Player Name & Number ({formatPrice(product.customizablePriceUSD ?? 600, currency)})</span>
              </button>
            )}

            {/* Nationwide Delivery guarantee */}
            <div className="flex items-center justify-center gap-2 text-center text-xs text-emerald-800 font-semibold pt-1">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>We Deliver Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
