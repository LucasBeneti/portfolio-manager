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
  isEdit?: boolean;
};

type DialogContextValue = {
  openDialog: boolean;
  handleOpenNewAssetDialog: (d?: any) => void;
  closeAssetDialog: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: PropsWithChildren) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Asset>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleOpenNewAssetDialog(params?: HandleOpenNewAssetDialogParams) {
    if (params?.assetData) {
      setEditingData(params?.assetData);
    }
    setIsEditing(params?.isEdit || false);
    setOpenDialog(true);
  }

  function closeAssetDialog() {
    setIsEditing(false);
    setOpenDialog(false);
    setEditingData(undefined);
  }

  const value = {
    handleOpenNewAssetDialog,
    closeAssetDialog,
    openDialog,
  };
  return (
    <DialogContext.Provider value={value}>
      {children}
      <AssetDialog
        isOpen={openDialog}
        onClose={closeAssetDialog}
        initialData={editingData}
        isEdit={isEditing}
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
