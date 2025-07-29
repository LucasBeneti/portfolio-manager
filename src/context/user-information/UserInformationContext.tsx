import { createContext } from 'react';
import type {
  Asset,
  InvestmentData,
  Suggestion,
  UserObjectives,
} from '@/interfaces';

type UserInformationContextValue = {
  objectives?: UserObjectives;
  assets?: Array<Asset>;
  suggestions?: Array<Suggestion>;
  investmentSuggestion?: Array<InvestmentData>;
  usdBrlQuote?: number;
  handleSetUSDBRLQuote: (v: { usdbrlQuote: number }) => void;
  handleAddUserObjectives: (d: UserObjectives) => void;
  handleAddUserAsset: (d: Asset) => void;
  handleEditUserAsset: (d: Asset) => void;
  handleRemoveUserAsset: (id: string) => void;
  handleAddUserSuggestions: (values: { amount: number }) => void;
};

export const UserInformationContext = createContext<
  UserInformationContextValue | undefined
>(undefined);
