import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { CartItem, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { WhatsAppIcon, buildCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, size: string, quantity: number, isCustomized?: boolean, customName?: string) => void;
  onRemoveItem: (productId: string, size: string, isCustomized?: boolean, customName?: string) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD_USD = 1500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotalUSD = items.reduce(
    (sum, item) => sum + (item.unitPriceUSD ?? item.product.priceUSD) * item.quantity,
    0
  );

  const isFreeShipping = subtotalUSD >= FREE_SHIPPING_THRESHOLD_USD || subtotalUSD === 0;
  const shippingUSD = isFreeShipping ? 0 : 100;
  const grandTotalUSD = subtotalUSD + shippingUSD;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100)
  );
  const amountToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD_USD - subtotalUSD
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-emerald-100 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-emerald-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-950 font-display">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nationwide Free Shipping Progress */}
          <div className="px-6 py-3.5 bg-emerald-50 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs text-emerald-950 mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                {isFreeShipping ? (
                  <span className="font-bold text-emerald-800">
                    Complimentary Nationwide Delivery Unlocked
                  </span>
                ) : (
                  <span>
                    Add <span className="font-display font-bold text-emerald-800">{formatPrice(amountToFreeShipping, currency)}</span> for Free Nationwide Shipping
                  </span>
                )}
              </span>
              <span className="font-mono tabular-nums text-[11px] font-bold text-emerald-800">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-zinc-50">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-zinc-900">Your bag is currently empty</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Browse our sports brands collection. We deliver nationwide to your location.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Shop Sports Brands
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.isCustomized ? 'custom' : 'std'}-${item.customName || ''}`}
                  className="flex gap-4 p-3.5 bg-white rounded-xl border border-zinc-200 shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-zinc-50 overflow-hidden shrink-0 border border-zinc-100">
                    <img
                      src={item.activeImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-zinc-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.isCustomized, item.customName)}
                          className="text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Remove item from bag"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {item.product.brand}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Size: {item.selectedSize}
                        </span>
                        {item.isCustomized && (
                          <span className="text-[10px] font-bold text-emerald-950 bg-amber-400 border border-amber-500 px-1.5 py-0.2 rounded shadow-2xs">
                            Customizable R600
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-200 bg-zinc-50 rounded-md text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1,
                              item.isCustomized,
                              item.customName
                            )
                          }
                          className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono tabular-nums font-bold text-zinc-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity + 1,
                              item.isCustomized,
                              item.customName
                            )
                          }
                          className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-zinc-950 font-display tracking-wide">
                        {formatPrice((item.unitPriceUSD ?? item.product.priceUSD) * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-6 border-t border-emerald-100 bg-white space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-display font-bold text-sm text-zinc-900">
                    {formatPrice(subtotalUSD, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nationwide Delivery</span>
                  <span className="font-display font-bold text-sm text-emerald-700">
                    {isFreeShipping ? 'Free Delivery' : formatPrice(shippingUSD, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-black text-sm text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Total</span>
                  <span className="font-display font-bold text-base text-emerald-700">
                    {formatPrice(grandTotalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* WhatsApp Direct Order Button with Bag Icon */}
              <a
                href={buildCartWhatsAppUrl(
                  items.map((i) => ({
                    name: i.product.name,
                    size: i.selectedSize,
                    quantity: i.quantity,
                    isCustomized: i.isCustomized,
                    customName: i.customName,
                    customNumber: i.customNumber,
                    priceFormatted: formatPrice(
                      (i.unitPriceUSD ?? i.product.priceUSD) * i.quantity,
                      currency
                    )
                  })),
                  formatPrice(grandTotalUSD, currency)
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer font-sans"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <ShoppingBag className="w-4 h-4" />
                <span>Order on WhatsApp · {formatPrice(grandTotalUSD, currency)}</span>
              </a>

              {/* Proceed Action with Bag Icon */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 px-6 text-xs font-bold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-800" />
                <span>Proceed to Nationwide Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
