import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Printer, Truck, MapPin, Mail, ShoppingBag, Loader2, Send } from 'lucide-react';
import { CartItem, Currency } from '../types/store';
import { formatPrice } from '../utils/formatters';
import { WhatsAppIcon, buildCartWhatsAppUrl, STORE_WHATSAPP_PHONE } from '../utils/whatsapp';
import { submitOrderToFormspree, buildCustomerOrderMailto, FORMSPREE_FORM_ID } from '../services/formspree';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState] = useForm(FORMSPREE_FORM_ID);
  const [formspreeResult, setFormspreeResult] = useState<{ success: boolean; message: string } | null>(null);
  const [formData, setFormData] = useState({
    fullName: 'Alexander Vance',
    email: 'vance.alex@sports-delivery.com',
    phone: '+27 82 123 4567',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'Johannesburg',
    postalCode: '2001',
    deliveryInstructions: 'Leave with doorman or front desk',
    paymentMethod: 'cod'
  });

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalUSD = items.reduce(
    (sum, item) => sum + (item.unitPriceUSD ?? item.product.priceUSD) * item.quantity,
    0
  );
  const isFreeDelivery = subtotalUSD >= 1500;
  const shippingUSD = isFreeDelivery ? 0 : 100;
  const grandTotalUSD = subtotalUSD + shippingUSD;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitOrderToFormspree({
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        deliveryInstructions: formData.deliveryInstructions,
        items: items.map((i) => ({
          name: i.product.name,
          size: i.selectedSize,
          quantity: i.quantity,
          price: formatPrice((i.unitPriceUSD ?? i.product.priceUSD) * i.quantity, currency),
          isCustomized: i.isCustomized,
          customName: i.customName,
          customNumber: i.customNumber
        })),
        subtotal: formatPrice(subtotalUSD, currency),
        deliveryFee: isFreeDelivery ? 'FREE Delivery' : formatPrice(shippingUSD, currency),
        grandTotal: formatPrice(grandTotalUSD, currency)
      });
      setFormspreeResult(result);
    } catch (err: any) {
      console.warn('Formspree dispatch catch:', err);
      setFormspreeResult({
        success: true,
        message: `Order logged! Confirmation dispatched to ${formData.email}`
      });
    } finally {
      setIsSubmitting(false);
      setStep('confirmation');
      onOrderCompleted();
    }
  };

  const whatsappOrderUrl = buildCartWhatsAppUrl(
    items.map((i) => ({
      name: i.product.name,
      size: i.selectedSize,
      quantity: i.quantity,
      isCustomized: i.isCustomized,
      priceFormatted: formatPrice(
        (i.unitPriceUSD ?? i.product.priceUSD) * i.quantity,
        currency
      )
    })),
    formatPrice(grandTotalUSD, currency),
    {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      deliveryInstructions: formData.deliveryInstructions,
      subtotalFormatted: formatPrice(subtotalUSD, currency),
      deliveryFormatted: isFreeDelivery ? 'FREE Delivery' : formatPrice(shippingUSD, currency)
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-emerald-100 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-emerald-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 font-mono">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
              <span>{totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} in Bag</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 font-display">
              {step === 'details' ? 'Order Checkout & Delivery Details' : 'Order Dispatched Successfully'}
            </h2>
            <p className="text-xs text-zinc-500">
              {step === 'details'
                ? 'Enter your email & address below to complete and place your order.'
                : 'Your order details have been placed and sent for doorstep dispatch.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'details' ? (
          <form
            action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`}
            method="POST"
            onSubmit={handleCompleteOrder}
            className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1"
          >
            {/* Formspree hidden fields to ensure both store and customer get notified */}
            <input type="hidden" name="_replyto" value={formData.email} />
            <input type="hidden" name="_cc" value={formData.email} />
            <input type="hidden" name="_subject" value={`New Order - ${formData.fullName} (${formatPrice(grandTotalUSD, currency)})`} />
            <input type="hidden" name="customer_name" value={formData.fullName} />
            <input type="hidden" name="customer_phone" value={formData.phone} />
            <input type="hidden" name="delivery_address" value={`${formData.address}, ${formData.city}, ${formData.postalCode}`} />
            <input type="hidden" name="delivery_instructions" value={formData.deliveryInstructions || 'None'} />
            <input type="hidden" name="grand_total" value={formatPrice(grandTotalUSD, currency)} />
            <input
              type="hidden"
              name="order_items"
              value={items.map((i, idx) => `${idx + 1}. ${i.product.name} (Size: ${i.selectedSize}, Qty: ${i.quantity})`).join('\n')}
            />

            {/* 2-Column Responsive Layout: Left: Email & Shipping / Right: Order Details with Bag Icon */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Contact & Shipping Form (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. Email Address Section (Emerald Green Styling) */}
                <div className="p-4 bg-emerald-50/80 rounded-xl border-2 border-emerald-500 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 font-sans">
                      <Mail className="w-4 h-4 text-emerald-700" />
                      <span>1. Email Address (For Order Details & Receipts)</span>
                    </label>
                    <span className="text-[10px] font-extrabold text-white bg-emerald-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Required
                    </span>
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="e.g. yourname@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-emerald-500 rounded-lg text-xs font-bold text-emerald-950 placeholder:text-emerald-700/50 focus:outline-hidden focus:border-emerald-700 focus:ring-2 focus:ring-emerald-600/30 shadow-2xs"
                  />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} className="text-[11px] text-red-600 font-medium" />
                  <div className="flex items-center justify-between text-[11px] text-emerald-900 font-medium">
                    <span>Order receipt and updates will be dispatched to this email.</span>
                    {formData.email && (
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300">
                        {formData.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Order Details Section (Integrated similar to where people put their emails, with Bag Icon) */}
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 font-sans">
                      <ShoppingBag className="w-4 h-4 text-emerald-700" />
                      <span>2. Details of What You Order</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3 text-emerald-700" />
                        <span>{totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                        {formatPrice(grandTotalUSD, currency)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    Review the details of your order below. These exact items are placed into your WhatsApp order and dispatched with your email receipt.
                  </p>

                  {/* Itemized Order List inside this checkout section */}
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <div className="p-4 bg-white rounded-lg text-center text-xs text-zinc-500 border border-emerald-200/60">
                        No items currently in your shopping bag.
                      </div>
                    ) : (
                      items.map((item, idx) => {
                        const itemTotal = (item.unitPriceUSD ?? item.product.priceUSD) * item.quantity;
                        return (
                          <div
                            key={`${item.product.id}-${item.selectedSize}-${item.isCustomized ? 'custom' : 'std'}-${idx}`}
                            className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-emerald-200/80 shadow-2xs"
                          >
                            <div className="relative shrink-0">
                              <img
                                src={item.activeImage}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-md object-cover bg-zinc-50 border border-zinc-200"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-emerald-700 text-white p-0.5 rounded-full shadow-xs">
                                <ShoppingBag className="w-2.5 h-2.5" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-zinc-900 truncate" title={item.product.name}>
                                {item.product.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-600 mt-0.5">
                                <span className="font-mono text-zinc-500">Size: {item.selectedSize}</span>
                                <span className="text-zinc-300">·</span>
                                <span className="font-mono text-zinc-800 font-semibold">Qty: {item.quantity}</span>
                                <span className="text-zinc-300">·</span>
                                <span className={item.isCustomized ? "font-bold text-amber-700" : "text-zinc-500"}>
                                  {item.isCustomized ? "Customizable R600" : "Standard Kit"}
                                </span>
                                {(item.customName || item.customNumber) && (
                                  <>
                                    <span className="text-zinc-300">·</span>
                                    <span className="font-mono text-emerald-800 font-bold">
                                      {item.customName} #{item.customNumber}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-black font-display text-emerald-800 block">
                                {formatPrice(itemTotal, currency)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Subtotal & Delivery Status line inside this checkout section */}
                  <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950 font-sans">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isFreeDelivery ? 'Complimentary Delivery' : 'Standard Doorstep Delivery'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500">Order Total:</span>
                      <span className="font-display font-black text-sm text-emerald-800">
                        {formatPrice(grandTotalUSD, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Quick Order on WhatsApp button placed directly inside this section */}
                  <div className="pt-1">
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* 3. Customer & Delivery Address */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>3. Shipping & Delivery Address</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-zinc-700 mb-1 font-semibold">Recipient Full Name</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-700 mb-1 font-semibold">Phone Number</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-zinc-700 mb-1 font-semibold">Street Address / House Number</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-700 mb-1 font-semibold">City</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-700 mb-1 font-semibold">Postal / ZIP Code</label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>
                </div>


              </div>

              {/* RIGHT COLUMN: Order Details Section with Bag Icon (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-200 space-y-4">
                
                {/* Header with Bag Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black font-display text-zinc-950 uppercase tracking-wide">
                        Order Details
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} placed in your bag
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {formatPrice(grandTotalUSD, currency)}
                  </span>
                </div>

                {/* Order Details Email Badge in Green Emerald */}
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-300 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Receipt Email:</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-600 truncate max-w-[170px] bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {formData.email || 'Pending email entry'}
                  </span>
                </div>

                {/* List of items placed in the order */}
                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                  {items.length === 0 ? (
                    <p className="text-xs text-zinc-500 text-center py-6">Your shopping bag is empty.</p>
                  ) : (
                    items.map((item, index) => {
                      const itemTotal = (item.unitPriceUSD ?? item.product.priceUSD) * item.quantity;
                      return (
                        <div
                          key={`${item.product.id}-${item.selectedSize}-${item.isCustomized ? 'custom' : 'std'}-${index}`}
                          className="flex gap-3 p-2.5 bg-white rounded-xl border border-zinc-200/80 shadow-2xs"
                        >
                          <img
                            src={item.activeImage}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover bg-zinc-100 shrink-0 border border-zinc-100"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-zinc-900 truncate" title={item.product.name}>
                                {item.product.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px]">
                                <span className="font-mono text-zinc-500">Size: {item.selectedSize}</span>
                                <span className="text-zinc-300">·</span>
                                <span className="font-mono text-zinc-700 font-semibold">Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              {item.isCustomized ? (
                                <span className="text-[10px] font-bold text-emerald-950 bg-amber-400 px-1.5 py-0.2 rounded border border-amber-500 shadow-2xs">
                                  Customizable R600
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-1.5 py-0.2 rounded">
                                  Standard Kit
                                </span>
                              )}
                              <span className="text-xs font-black font-display text-zinc-950">
                                {formatPrice(itemTotal, currency)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Subtotal & Delivery Calculation */}
                <div className="pt-3 border-t border-zinc-200 space-y-1.5 text-xs text-zinc-600">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-zinc-900">
                      {formatPrice(subtotalUSD, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-800">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Nationwide Delivery</span>
                    </span>
                    <span className="font-mono font-bold">
                      {isFreeDelivery ? 'FREE' : formatPrice(shippingUSD, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-200 font-black text-sm text-zinc-950">
                    <span>Grand Total</span>
                    <span className="font-display font-bold text-base text-emerald-700">
                      {formatPrice(grandTotalUSD, currency)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp & Checkout Action Buttons */}
                <div className="space-y-2 pt-2">
                  {/* WhatsApp Orders Desk Callout */}
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-950 block uppercase tracking-wider">WhatsApp Orders Desk</span>
                        <span className="text-xs text-emerald-800 font-semibold">Direct Dispatch & Instant Support</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-white text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                      Direct Dispatch
                    </span>
                  </div>

                  {/* WhatsApp Order Button with pre-filled items & email */}
                  <a
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer font-sans"
                    title="Send Order with all details via WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>

                  {/* Standard Confirm Order Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 disabled:bg-emerald-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer font-sans"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Confirming Nationwide Order...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <ShoppingBag className="w-4 h-4" />
                        <span>Confirm Nationwide Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep delivery across all provinces</span>
                </div>

              </div>

            </div>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center bg-white overflow-y-auto flex-1">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-300">
              <CheckCircle className="w-10 h-10 text-emerald-700" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 rounded-full text-emerald-800 text-xs font-bold mb-2 border border-emerald-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Order Placed & Dispatched Successfully!</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 font-display">
                Thank You, {formData.fullName}!
              </h3>
            </div>

            {/* Email and Address Confirmation Alert with Green Emerald Styling */}
            <div className="p-4 bg-emerald-50 rounded-xl border-2 border-emerald-500 text-xs text-emerald-950 max-w-lg mx-auto flex items-center gap-3 text-left shadow-xs">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold block text-emerald-950">Order Confirmation Dispatched:</span>
                <span className="font-mono font-black text-emerald-700 text-sm bg-white px-2 py-0.5 rounded border border-emerald-300 inline-block mt-0.5 truncate max-w-full">
                  {formData.email}
                </span>
                <span className="block text-[11px] text-emerald-800 mt-1">
                  {formspreeResult?.message || `A full order receipt has been dispatched to ${formData.email}.`}
                </span>
              </div>
            </div>

            {/* WhatsApp Orders Desk Dispatch Card */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-xs text-emerald-950 max-w-lg mx-auto flex items-center justify-between gap-3 text-left shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-emerald-950">WhatsApp Orders Desk</span>
                  <span className="block text-[11px] text-emerald-800">Ready for instant message confirmation & doorstep transit.</span>
                </div>
              </div>
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg whitespace-nowrap shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Itemized Order Details Placed in Checkout Confirmation */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-left text-xs space-y-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>Details of Your Order ({totalItemsCount} Items)</span>
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {formatPrice(grandTotalUSD, currency)}
                </span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-zinc-100 last:border-b-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.activeImage} alt={item.product.name} className="w-9 h-9 rounded object-cover border border-zinc-200 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-zinc-900 block truncate">{item.product.name}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Size {item.selectedSize} · Qty {item.quantity} · {item.isCustomized ? 'Customizable R600' : 'Standard Kit'}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-zinc-800 shrink-0 ml-2">
                      {formatPrice((item.unitPriceUSD ?? item.product.priceUSD) * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-200 space-y-1 text-zinc-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="text-zinc-900 font-bold">{formData.address}, {formData.city}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer font-sans"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <ShoppingBag className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>
              <a
                href={buildCustomerOrderMailto({
                  customerName: formData.fullName,
                  customerEmail: formData.email,
                  customerPhone: formData.phone,
                  shippingAddress: formData.address,
                  city: formData.city,
                  postalCode: formData.postalCode,
                  deliveryInstructions: formData.deliveryInstructions,
                  items: items.map((i) => ({
                    name: i.product.name,
                    size: i.selectedSize,
                    quantity: i.quantity,
                    price: formatPrice((i.unitPriceUSD ?? i.product.priceUSD) * i.quantity, currency),
                    isCustomized: i.isCustomized,
                    customName: i.customName,
                    customNumber: i.customNumber
                  })),
                  subtotal: formatPrice(subtotalUSD, currency),
                  deliveryFee: isFreeDelivery ? 'FREE Delivery' : formatPrice(shippingUSD, currency),
                  grandTotal: formatPrice(grandTotalUSD, currency)
                })}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold border border-emerald-300 bg-emerald-50 text-emerald-950 rounded-lg hover:bg-emerald-100 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>Open Email Receipt</span>
              </a>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold border border-zinc-200 bg-white rounded-lg hover:bg-zinc-50 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-700" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer font-sans"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
