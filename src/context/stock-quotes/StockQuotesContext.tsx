import { createContext } from 'react';
import type { StockQuote } from '@/interfaces/stock-quotes';

type StockQuotesContextValue = {
  quotes: Record<string, StockQuote>;
  isLoading: boolean;
  refreshQuotes: () => void;
};

export const StockQuotesContext = createContext<StockQuotesContextValue | null>(
  null
);
