import { useState, type PropsWithChildren } from 'react';
import { AssetDialog } from '@/components/main-tabs/content/assets/asset-dialog';
import type { Asset } from '@/interfaces/assets';
import { CustomDialog } from '@/components/custom-dialog/custom-dialog';
import { ImportExportUserDataForm } from '@/components/forms/import-user-data';
import type { HandleOpenNewAssetDialogParams } from './DialogContext';
import { DialogContext } from './DialogContext';
import { USDQuoteForm } from '@/components/USDQuotesForm/USDQuoteForm';

/**
 *
 * TODO: implementar um refactor aqui nos modais para ter de uma maneira mais simples
 * qual modal que deve ser aberto de acordo com o botão clicado. Esse monte de useState
 * não tá legal.
 *
 */

export function DialogProvider({ children }: PropsWithChildren) {
  const [openAssetDialog, setOpenDialog] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Asset>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openExportUserDataDialog, setOpenExportUserDataDialog] =
    useState<boolean>(false);
  const [openDollarQuoteDialog, setOpenDollarQuoteDialog] =
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

  function handleOpenDollarQuoteDialog() {
    setOpenDollarQuoteDialog(true);
  }

  function closeAssetDialog() {
    setIsEditing(false);
    setOpenDialog(false);
    setEditingData(undefined);
  }

  function closeExportUserDataDialog() {
    setOpenExportUserDataDialog(false);
  }
  function closeDollarQuoteDialog() {
    setOpenDollarQuoteDialog(false);
  }

  const value = {
    handleOpenNewAssetDialog,
    handleOpenExportUserDataDialog,
    handleOpenDollarQuoteDialog,
    closeDollarQuoteDialog,
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
      <DollarQuoteDialog
        isOpen={openDollarQuoteDialog}
        onClose={closeDollarQuoteDialog}
      />
    </DialogContext.Provider>
  );
}
type CommonDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ExportImportUserDataDialog(props: CommonDialogProps) {
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

function DollarQuoteDialog(props: CommonDialogProps) {
  const { isOpen, onClose } = props;
  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title='Cotação do dólar atual:'
      description='Esse valor é utilizado para alguns cálculos aqui, como nas sugestões de investimento.'
    >
      <USDQuoteForm />
    </CustomDialog>
  );
}
