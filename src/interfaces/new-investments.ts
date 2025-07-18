export type Suggestion = {
  assetId: string;
  assetName: string;
  assetCategory: string;
  suggestedAmount: { quantity: number; amountToInvest: number };
};

export type InvestmentData = {
  category: string;
  ticker: string;
  currentAmount: number;
  currentPrice: number;
  grade: number;
  suggestedInvestimentAmount: number;
  suggestedUnitsAmount: number;
};
