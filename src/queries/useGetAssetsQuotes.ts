import { useQueries } from '@tanstack/react-query';
import type { Asset } from '@/interfaces';
import type { StockQuote } from '@/interfaces/stock-quotes';
import {
  getCachedQuote,
  setCachedQuote,
} from '@/utils/quote-cache';

export function useGetAssetsQuotes(assets?: Array<Asset>) {
  return useQueries({
    queries: (assets ?? []).map((asset) => {
      const isBRStock =
        asset.category === 'stocks-br' || asset.category === 'fii';
      return {
        queryKey: ['stock', asset.name],
        queryFn: async () => {
          const fetcher = isBRStock ? fetchBRQuote : fetchUSQuote;
          try {
            const quote = await fetcher(asset.name);
            setCachedQuote(asset.name, quote);
            return quote;
          } catch (error) {
            const cached = getCachedQuote(asset.name);
            if (cached) {
              return cached;
            }
            throw error;
          }
        },
        initialData: getCachedQuote(asset.name) ?? undefined,
        initialDataUpdatedAt: 0,
        staleTime: 21600000,
        gcTime: 21600000,
      };
    }),
  });
}

async function fetchBRQuote(ticker: string): Promise<StockQuote> {
  const response = await fetch(
    `https://brapi.dev/api/quote/${ticker}?token=${import.meta.env.VITE_BRAPI_API_TOKEN}`
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok for ${ticker}`);
  }
  const data = await response.json();

  return {
    currency: data.results[0].currency,
    price: parseFloat(data.results[0].regularMarketPrice),
    ticker: data.results[0].symbol,
  };
}

async function fetchUSQuote(ticker: string): Promise<StockQuote> {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok for ${ticker}`);
  }
  const data = await response.json();
  return {
    currency: 'USD',
    price: parseFloat(data['Global Quote']['05. price']),
    ticker: data['Global Quote']['01. symbol'],
  };
}
