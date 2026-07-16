import type { StockQuote } from '@/interfaces/stock-quotes';
import { LOCAL_STORAGE_PREFIX } from '@/contants/user-data';

type CachedQuote = StockQuote & {
  cachedAt: number;
};

const STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}quotesCache`;

function readCache(): Record<string, CachedQuote> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, CachedQuote>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
}

export function getCachedQuote(ticker: string): StockQuote | null {
  const cache = readCache();
  const entry = cache[ticker.toUpperCase()];
  if (!entry) return null;
  return { currency: entry.currency, price: entry.price, ticker: entry.ticker };
}

export function setCachedQuote(ticker: string, quote: StockQuote) {
  const cache = readCache();
  cache[ticker.toUpperCase()] = { ...quote, cachedAt: Date.now() };
  writeCache(cache);
}

export function getCachedQuoteAge(ticker: string): number | null {
  const cache = readCache();
  const entry = cache[ticker.toUpperCase()];
  return entry ? Date.now() - entry.cachedAt : null;
}
