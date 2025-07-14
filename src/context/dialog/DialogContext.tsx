import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { AssetDialog } from '@/components/main-tabs/content/assets/asset-dialog';
import type { Asset } from '@/interfaces/assets';

type HandleOpenNewAssetDialogParams = {
  assetData?: Asset;
};

type DialogContextValue = {
  openDialog: boolean;
  handleOpenNewAssetDialog: (d?: any) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: PropsWithChildren) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Asset>();

  function handleOpenNewAssetDialog(params?: HandleOpenNewAssetDialogParams) {
    if (params?.assetData) {
      setEditingData(params?.assetData);
    }
    setOpenDialog(true);
  }

  function closeAssetDialog() {
    setOpenDialog(false);
    setEditingData(undefined);
  }

  const value = {
    handleOpenNewAssetDialog,
    openDialog,
  };
  return (
    <DialogContext.Provider value={value}>
      {children}
      <AssetDialog
        isOpen={openDialog}
        onClose={closeAssetDialog}
        initialData={editingData}
      />
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      'To use this hook, the component should be children of the DialogProvider.'
    );

  return context;
}
