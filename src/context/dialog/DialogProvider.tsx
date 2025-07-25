import { useState, type PropsWithChildren } from 'react';
import { AssetDialog } from '@/components/main-tabs/content/assets/asset-dialog';
import type { Asset } from '@/interfaces/assets';
import { CustomDialog } from '@/components/custom-dialog/custom-dialog';
import { ImportExportUserDataForm } from '@/components/forms/import-user-data';
import type { HandleOpenNewAssetDialogParams } from './DialogContext';
import { DialogContext } from './DialogContext';

export function DialogProvider({ children }: PropsWithChildren) {
  const [openAssetDialog, setOpenDialog] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Asset>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openExportUserDataDialog, setOpenExportUserDataDialog] =
    useState<boolean>(false);

  function handleOpenNewAssetDialog(params?: HandleOpenNewAssetDialogParams) {
    if (params?.assetData) {
      setEditingData(params?.assetData);
    }
    setIsEditing(params?.isEdit || false);
    setOpenDialog(true);
  }

  function handleOpenExportUserDataDialog() {
    setOpenExportUserDataDialog(true);
  }

  function closeAssetDialog() {
    setIsEditing(false);
    setOpenDialog(false);
    setEditingData(undefined);
  }

  function closeExportUserDataDialog() {
    setOpenExportUserDataDialog(false);
  }

  const value = {
    handleOpenNewAssetDialog,
    handleOpenExportUserDataDialog,
    closeAssetDialog,
    openAssetDialog,
  };
  return (
    <DialogContext.Provider value={value}>
      {children}
      <AssetDialog
        isOpen={openAssetDialog}
        onClose={closeAssetDialog}
        initialData={editingData}
        isEdit={isEditing}
      />
      <ExportImportUserDataDialog
        isOpen={openExportUserDataDialog}
        onClose={closeExportUserDataDialog}
      />
    </DialogContext.Provider>
  );
}
function ExportImportUserDataDialog(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose } = props;

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title='Exportar dados'
      description='Exporta os dados armazenados no localStorage aqui do browser para ser utilizado em outro navegador.'
    >
      <ImportExportUserDataForm />
    </CustomDialog>
  );
}
