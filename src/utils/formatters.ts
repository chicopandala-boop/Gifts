import { Currency } from '../types/store';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; decimals: number }> = {
  ZAR: { symbol: 'R', rate: 1.0, decimals: 0 },
  USD: { symbol: '$', rate: 0.055, decimals: 0 },
  EUR: { symbol: '€', rate: 0.051, decimals: 0 },
  GBP: { symbol: '£', rate: 0.043, decimals: 0 }
};

export function formatPrice(amount: number, currency: Currency): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.ZAR;
  const converted = amount * info.rate;
  if (info.decimals === 0) {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toFixed(info.decimals)}`;
}
