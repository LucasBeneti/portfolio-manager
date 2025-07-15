import { createContext } from 'react';
import type { UserObjectives } from '@/interfaces/objectives';
import type { Asset } from '@/interfaces/assets';

type UserInformationContextValue = {
  objectives?: UserObjectives;
  assets?: Array<Asset>;
  handleAddUserObjectives: (d: UserObjectives) => void;
  handleAddUserAsset: (d: Omit<Asset, 'id'>) => void;
  handleEditUserAsset: (d: Asset) => void;
  handleRemoveUserAsset: (id: string) => void;
};

export const UserInformationContext = createContext<
  UserInformationContextValue | undefined
>(undefined);
