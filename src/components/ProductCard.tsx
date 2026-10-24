import React, { useState } from 'react';
import { Eye, Plus, Check, Truck, Image as ImageIcon } from 'lucide-react';
import { Product, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onQuickView: (product: Product, options?: { customize?: boolean }) => void;
  onQuickAdd: (product: Product, size: string, options?: { isCustomized?: boolean }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onQuickAdd
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);

  const allImages = React.useMemo(() => {
    const list = [product.customImage || product.primaryImage];
    if (product.alternateImages) {
      product.alternateImages.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [product]);

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
  const isSoccer = !isTracksuit && !isYouthKit && !isSocks && (product.sport === 'football' || product.sport === 'soccer');
  const showFrontBackSwitcher = !isSoccer && !isYouthKit && !isTracksuit && !isSocks && allImages.length > 1;
  const displayImage = isSoccer ? (product.customImage || product.primaryImage) : (allImages[viewIndex] || allImages[0]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || (isTracksuit ? 'M' : isSocks ? 'One Size (UK 4-12)' : 'Age 4-5');
    onQuickAdd(product, defaultSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      className={`group relative flex flex-col bg-white border-2 border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
        isSocks
          ? 'hover:border-blue-600 hover:ring-2 hover:ring-blue-600'
          : isTracksuit
          ? 'hover:border-emerald-700 hover:ring-2 hover:ring-emerald-700'
          : isSoccer
          ? 'hover:border-[#d97706] hover:ring-2 hover:ring-[#d97706]'
          : 'hover:border-emerald-800 hover:ring-2 hover:ring-emerald-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Top Image Container: standardized equal size for all thumbnails; edge-to-edge frame fill for tracksuits */}
      <div
        className={`relative aspect-[1/1] overflow-hidden border-b-2 border-zinc-100 transition-all duration-300 flex items-center justify-center ${
          isTracksuit ? 'p-0 bg-white' : 'p-3 sm:p-4 bg-zinc-50/80'
        } ${
          isTracksuit
            ? 'group-hover:border-emerald-700'
            : isSoccer
            ? 'group-hover:border-[#d97706] group-hover:bg-amber-50/50'
            : 'group-hover:border-emerald-800 group-hover:bg-emerald-50/50'
        }`}
      >
        {!imageError ? (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={displayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className={
                isTracksuit
                  ? "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  : "max-h-[88%] max-w-[88%] w-auto h-auto object-contain object-center transition-transform duration-500 group-hover:scale-105 drop-shadow-xs"
              }
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-500 p-6 text-center">
            <ImageIcon className={`w-8 h-8 mb-2 opacity-50 ${isSoccer ? 'text-[#d97706]' : 'text-emerald-700'}`} />
            <span className="text-xs font-mono">{product.name}</span>
            <span className="text-[10px] text-zinc-400 mt-1">Official Licensed Product</span>
          </div>
        )}

        {/* Front / Back View Switcher Pill - only shown for basketball gear with authentic front & back photography, never on soccer */}
        {showFrontBackSwitcher && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center bg-white rounded-full p-0.5 border border-zinc-200 shadow-xs">
            {allImages.slice(0, 2).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewIndex(idx);
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                  viewIndex === idx
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {idx === 0 ? 'Front' : 'Back'}
              </button>
            ))}
          </div>
        )}

        {/* Brand Tag Top Left */}
        <div
          className={`absolute top-3 left-3 bg-white text-zinc-900 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-zinc-200 shadow-xs flex items-center gap-1.5 transition-colors ${
            isSoccer ? 'group-hover:border-[#d97706]' : 'group-hover:border-emerald-800'
          }`}
        >
          <span>{product.brand}</span>
        </div>

        {/* Nationwide Delivery Indicator Top Right */}
        <div
          className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs ${
            isSocks
              ? 'bg-blue-600'
              : isSoccer
              ? 'bg-[#ea580c]'
              : 'bg-emerald-800'
          }`}
        >
          <Truck className="w-3 h-3" />
          <span>{isSocks ? 'Matchday' : 'Nationwide'}</span>
        </div>

        {/* Floating Quick Action Overlay on hover */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center justify-end gap-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label="Quick inspect product details"
            className={`px-3 py-1.5 bg-white text-zinc-900 rounded-md border border-zinc-200 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              isSocks
                ? 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500/40'
                : isSoccer
                ? 'hover:bg-amber-50 hover:text-[#ea580c] hover:border-[#ea580c]/40'
                : 'hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-700/40'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {isYouthKit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product, { customize: true });
              }}
              aria-label={`Personalise ${formatPrice(product.customizablePriceUSD ?? 600, currency)}`}
              className="px-3 py-1.5 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>Personalise ({formatPrice(product.customizablePriceUSD ?? 600, currency)})</span>
            </button>
          )}


          <button
            onClick={handleAdd}
            aria-label="Quick add to shopping bag"
            disabled={justAdded}
            className={`px-3.5 py-1.5 text-xs font-bold text-white rounded-md transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isSocks
                ? 'bg-blue-600 hover:bg-blue-700'
                : isSoccer
                ? 'bg-[#ea580c] hover:bg-[#c2410c]'
                : 'bg-emerald-800 hover:bg-emerald-900'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Info Details: Orange background on football jerseys, Green background on tracksuits & basketball jerseys, Navy background on grip socks when hovering */}
      <div
        className={`p-5 flex flex-col justify-between flex-1 space-y-3 bg-white transition-colors duration-200 ${
          isSocks
            ? 'group-hover:bg-blue-950'
            : isTracksuit
            ? 'group-hover:bg-emerald-950'
            : isSoccer
            ? 'group-hover:bg-[#ea580c]'
            : isYouthKit
            ? 'group-hover:bg-emerald-50/50'
            : 'group-hover:bg-emerald-900'
        }`}
      >
        <div>
          {/* Metadata */}
          <div
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${
              isSocks
                ? 'text-blue-700 group-hover:text-blue-200'
                : isTracksuit
                ? 'text-emerald-700 group-hover:text-emerald-300'
                : isSoccer
                ? 'text-[#ea580c] group-hover:text-zinc-950'
                : isYouthKit
                ? 'text-emerald-700'
                : 'text-emerald-700 group-hover:text-emerald-200'
            }`}
          >
            <span>{isSocks ? 'Performance Grip Socks' : isYouthKit ? 'Kids Football Kits' : isTracksuit ? 'Official Training Tracksuit' : product.category}</span>
          </div>

          {/* Product Title */}
          <h3
            className={`text-base font-bold tracking-tight transition-colors font-display ${
              isSocks
                ? 'text-zinc-950 group-hover:text-white group-hover:drop-shadow-xs'
                : isTracksuit
                ? 'text-zinc-950 group-hover:text-white group-hover:drop-shadow-xs'
                : isSoccer
                ? 'text-zinc-950 group-hover:text-zinc-950 group-hover:drop-shadow-2xs'
                : isYouthKit
                ? 'text-zinc-950'
                : 'text-zinc-950 group-hover:text-white group-hover:drop-shadow-xs'
            }`}
          >
            {product.name}
          </h3>
        </div>

        {/* Baseline: Delivery guarantee & Price */}
        <div
          className={`pt-3 border-t flex items-center justify-between transition-colors ${
            isSocks
              ? 'border-zinc-100 group-hover:border-white/20'
              : isTracksuit
              ? 'border-zinc-100 group-hover:border-white/20'
              : isSoccer
              ? 'border-zinc-100 group-hover:border-zinc-950/20'
              : isYouthKit
              ? 'border-zinc-100'
              : 'border-zinc-100 group-hover:border-white/20'
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                isSocks
                  ? 'text-zinc-600 group-hover:text-blue-200'
                  : isTracksuit
                  ? 'text-zinc-600 group-hover:text-emerald-200'
                  : isSoccer
                  ? 'text-zinc-600 group-hover:text-zinc-950'
                  : isYouthKit
                  ? 'text-zinc-600'
                  : 'text-zinc-600 group-hover:text-emerald-200'
              }`}
            >
              <Truck className={`w-3 h-3 transition-colors ${
                isSocks
                  ? 'text-blue-600 group-hover:text-blue-300'
                  : isTracksuit
                  ? 'text-emerald-700 group-hover:text-emerald-300'
                  : isSoccer
                  ? 'text-[#ea580c] group-hover:text-zinc-950'
                  : 'text-emerald-700'
              }`} />
              <span>Delivers Nationwide</span>
            </span>
            {isSocks && (
              <span className="text-[10px] font-bold text-blue-950 bg-blue-100 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-blue-300">
                Matchday Socks · One Size (UK 4-12)
              </span>
            )}
            {isTracksuit && (
              <span className="text-[10px] font-bold text-emerald-950 bg-emerald-100 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-emerald-300">
                Full Tracksuit (Jacket + Pants)
              </span>
            )}
            {isYouthKit && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-amber-300">
                Sizes 4-14 · Kids Kit Set
              </span>
            )}
            {product.subtitle?.includes('Adults Set') && (
              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-emerald-300">
                Adults Set (Top + Shorts)
              </span>
            )}
            {product.subtitle?.includes('Adults Top') && (
              <span className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-zinc-200">
                Adults Top (Plain)
              </span>
            )}
            {product.sport === 'basketball' && (
              <span className="text-[10px] font-bold text-emerald-950 bg-amber-300 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-amber-400">
                Sizes 46-54
              </span>
            )}
          </div>
          <span
            className={`text-lg font-black font-display tracking-wide transition-colors ${
              isSocks
                ? 'text-blue-700 group-hover:text-cyan-300'
                : isTracksuit
                ? 'text-emerald-800 group-hover:text-amber-300'
                : isSoccer
                ? 'text-[#ea580c] group-hover:text-zinc-950'
                : isYouthKit
                ? 'text-emerald-800'
                : 'text-emerald-800 group-hover:text-white'
            }`}
          >
            {formatPrice(product.priceUSD, currency)}
          </span>
        </div>

        {/* Dedicated Customizable R600 button on sizes 4-14 */}
        {isYouthKit && (
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product, { customize: true });
              }}
              className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 flex items-center justify-center shadow-xs transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>
                {product.customizablePriceUSD === product.priceUSD
                  ? `Player Personalised (${formatPrice(product.priceUSD, currency)})`
                  : `Customizable (${formatPrice(product.customizablePriceUSD ?? 600, currency)})`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
