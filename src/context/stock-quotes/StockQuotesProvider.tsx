import { type PropsWithChildren } from 'react';
import { StockQuotesContext } from './StockQuotesContext';
import type { StockQuote } from '@/interfaces/stock-quotes';
import { useUserInformation } from '../user-information';
import { useGetAssetsQuotes } from '@/queries/useGetAssetsQuotes';

type StockQuotesProviderProps = PropsWithChildren<{
  symbols: string[]; // List of stock symbols to track
  onQuotesUpdate?: (quotes: Record<string, StockQuote>) => void; // Callback for updates
}>;
export function StockQuotesProvider(props: StockQuotesProviderProps) {
  const { children, symbols, onQuotesUpdate } = props;
  const { assets } = useUserInformation();
  const quotableAssets = assets?.filter((a) => {
    if (
      a.category === 'stocks-br' ||
      a.category === 'fii' ||
      a.category === 'stocks-us'
    ) {
      return a;
    }
  });

  const queries = useGetAssetsQuotes(quotableAssets);

  const quotes = queries.reduce(
    (acc, query, index) => {
      const currentTicker = quotableAssets ? quotableAssets[index]?.name : '';
      if (query.data) {
        acc[currentTicker] = query.data;
      }
      return acc;
    },
    {} as Record<string, StockQuote>
  );
  /**
   * quotes é um array de resultados das quotes encontracas levando
   * em consideracao os assets do usuário
   */

  const value = { quotes };
  return (
    <StockQuotesContext.Provider value={value}>
      {children}
    </StockQuotesContext.Provider>
  );
}
