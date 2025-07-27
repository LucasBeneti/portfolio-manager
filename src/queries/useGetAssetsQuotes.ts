import { useQueries } from '@tanstack/react-query';
import type { Asset } from '@/interfaces';

export function useGetAssetsQuotes(assets?: Array<Asset>) {
  return useQueries({
    queries: (assets ?? []).map((asset) => {
      const isBRStock =
        asset.category === 'stocks-br' || asset.category === 'fii';
      return {
        queryKey: ['stock', asset.name], // Individual query key for each stock
        queryFn: isBRStock
          ? () => fetchBRQuote(asset.name)
          : () => fetchUSQuote(asset.name),
        staleTime: 21600000, // Long stale time for each
        gcTime: 21600000,
      };
    }),
  });
}

async function fetchBRQuote(ticker: string) {
  const response = await fetch(
    `https://brapi.dev/api/quote/${ticker}?token=${import.meta.env.VITE_BRAPI_API_TOKEN}`
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok for ${ticker}`);
  }
  const data = await response.json();

  return {
    currency: data.results[0].currency,
    price: data.results[0].regularMarketPrice,
    ticker: data.results[0].symbol,
  };
}

async function fetchUSQuote(ticker: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=qualquercoisa`
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok for ${ticker}`);
  }
  const data = await response.json();
  return data.results[0];
}
