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
  const quotes = useGetAssetsQuotes(assets);

  const value = {};
  return (
    <StockQuotesContext.Provider value={value}>
      {children}
    </StockQuotesContext.Provider>
  );
}
