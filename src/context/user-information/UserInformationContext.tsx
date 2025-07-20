import { createContext } from 'react';
import type {
  Asset,
  InvestmentData,
  Suggestion,
  UserObjectives,
} from '@/interfaces';
import type { InvestmentSuggestion } from '@/utils/suggestionsv2/test';

type UserInformationContextValue = {
  objectives?: UserObjectives;
  assets?: Array<Asset>;
  suggestions?: Array<InvestmentSuggestion>;
  investmentSuggestion?: Array<InvestmentData>;
  handleAddUserObjectives: (d: UserObjectives) => void;
  handleAddUserAsset: (d: Asset) => void;
  handleEditUserAsset: (d: Asset) => void;
  handleRemoveUserAsset: (id: string) => void;
  handleAddUserSuggestions: (values: { amount: number }) => void;
};

export const UserInformationContext = createContext<
  UserInformationContextValue | undefined
>(undefined);
