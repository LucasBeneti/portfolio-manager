export type StockQuote = {
  currency: string;
  price: number;
  ticker: string;
  positiveClosing?: boolean;
};
