import { createContext } from 'react';
import type { Asset } from '@/interfaces/assets';

export type HandleOpenNewAssetDialogParams = {
  assetData?: Asset;
  isEdit?: boolean;
};

type DialogContextValue = {
  openAssetDialog: boolean;
  handleOpenNewAssetDialog: (d?: HandleOpenNewAssetDialogParams) => void;
  handleOpenExportUserDataDialog: () => void;
  closeAssetDialog: () => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);
