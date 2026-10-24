import React from 'react';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const STORE_WHATSAPP_PHONE = '27786382015'; // +27 78 638 2015
export const STORE_WHATSAPP_DISPLAY = '+27 78 638 2015';

export function buildProductWhatsAppUrl(
  productName: string,
  size: string,
  isCustomized: boolean,
  priceFormatted: string,
  customerEmail?: string
): string {
  const lines = [
    `*GIFTS BOUTIQUE · ORDER ENQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🛍️ *Product:* ${productName}`,
    `• Size: ${size}`,
    `• Edition: ${isCustomized ? 'Customizable R600' : 'Standard Kit (R500)'}`,
    `• Price: ${priceFormatted}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`
  ];

  if (customerEmail && customerEmail.trim()) {
    lines.push(`📧 *Customer Email:* ${customerEmail.trim()}`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  }

  lines.push(`I would like to order this item with nationwide delivery. Please assist.`);

  return `https://api.whatsapp.com/send?phone=${STORE_WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join('\n'))}`;
}

export interface WhatsAppCustomerInfo {
  orderNumber?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  deliveryInstructions?: string;
  subtotalFormatted?: string;
  deliveryFormatted?: string;
}

export interface WhatsAppCartItem {
  name: string;
  size: string;
  quantity: number;
  isCustomized?: boolean;
  customName?: string;
  customNumber?: string;
  priceFormatted: string;
}

export function buildCartWhatsAppUrl(
  items: WhatsAppCartItem[],
  totalFormatted: string,
  customerInfo?: WhatsAppCustomerInfo
): string {
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const lines: string[] = [
    `*GIFTS BOUTIQUE · CHECKOUT ORDER DETAILS*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`
  ];

  lines.push(`🛍️ *DETAILS OF ITEMS ORDERED IN CHECKOUT (${totalCount} Items):*`);
  if (items.length === 0) {
    lines.push(`(No items currently selected)`);
  } else {
    items.forEach((item, idx) => {
      const editionText = item.isCustomized ? 'Customizable R600' : 'Standard Kit';
      let itemLine = `${idx + 1}. *${item.name}*\n   • Size: ${item.size} | Qty: ${item.quantity}\n   • Edition: ${editionText}`;
      if (item.customName || item.customNumber) {
        itemLine += `\n   • Custom Print: ${item.customName || ''} #${item.customNumber || ''}`;
      }
      itemLine += `\n   • Line Total: ${item.priceFormatted}`;
      lines.push(itemLine);
    });
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`💰 *PRICING & DELIVERY:*`);
  if (customerInfo?.subtotalFormatted) {
    lines.push(`• Subtotal: ${customerInfo.subtotalFormatted}`);
  }
  lines.push(`• Delivery: ${customerInfo?.deliveryFormatted || 'Doorstep Delivery'}`);
  lines.push(`• *Grand Total: ${totalFormatted}*`);

  // Include customer contact & email details from checkout
  if (
    customerInfo?.name ||
    customerInfo?.email ||
    customerInfo?.phone ||
    customerInfo?.address
  ) {
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`👤 *CUSTOMER CHECKOUT DETAILS:*`);
    if (customerInfo.email) {
      lines.push(`• 📧 Email: ${customerInfo.email}`);
    }
    if (customerInfo.name) {
      lines.push(`• 👤 Full Name: ${customerInfo.name}`);
    }
    if (customerInfo.phone) {
      lines.push(`• 📱 Phone: ${customerInfo.phone}`);
    }
    if (customerInfo.address) {
      const cityPart = customerInfo.city ? `, ${customerInfo.city}` : '';
      const zipPart = customerInfo.postalCode ? ` (${customerInfo.postalCode})` : '';
      lines.push(`• 📍 Shipping Address: ${customerInfo.address}${cityPart}${zipPart}`);
    }
    if (customerInfo.deliveryInstructions) {
      lines.push(`• 📝 Delivery Notes: ${customerInfo.deliveryInstructions}`);
    }
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🚚 Please confirm this checkout order and assist with nationwide dispatch.`);

  return `https://api.whatsapp.com/send?phone=${STORE_WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join('\n'))}`;
}

