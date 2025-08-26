import { useState, type PropsWithChildren } from 'react';
import { AssetDialog } from '@/components/main-tabs/content/assets/asset-dialog';
import type { Asset } from '@/interfaces/assets';
import { CustomDialog } from '@/components/custom-dialog/custom-dialog';
import { ImportExportUserDataForm } from '@/components/forms/import-user-data';
import type { HandleOpenNewAssetDialogParams } from './DialogContext';
import { DialogContext } from './DialogContext';
import { USDQuoteForm } from '@/components/USDQuotesForm/USDQuoteForm';
import { useAssetsActions } from '@/hooks/use-assets-actions';

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
  const [openConfirmDeleteAssetDialog, setOpenConfirmDeleteAssetDialog] =
    useState<boolean>(false);
  const [assetIdToDelete, setAssetIdToDelete] = useState<string>('');

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

  function handleOpenConfirmDeleteAssetDialog(id: string) {
    setOpenConfirmDeleteAssetDialog(true);
    setAssetIdToDelete(id);
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

  function closeConfirmDeleteAssetDialog() {
    setOpenConfirmDeleteAssetDialog(false);
  }

  const value = {
    handleOpenNewAssetDialog,
    handleOpenExportUserDataDialog,
    handleOpenDollarQuoteDialog,
    handleOpenConfirmDeleteAssetDialog,
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
      <ConfirmDeleteAssetDialog
        isOpen={openConfirmDeleteAssetDialog}
        onClose={closeConfirmDeleteAssetDialog}
        deletingAssetId={assetIdToDelete}
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

type ConfirmDeleteAssetDialogProps = CommonDialogProps & {
  deletingAssetId: string;
};

function ConfirmDeleteAssetDialog(props: ConfirmDeleteAssetDialogProps) {
  const { isOpen, onClose, deletingAssetId } = props;
  const { handleDeleteAsset } = useAssetsActions();

  function handleConfirmDelete() {
    handleDeleteAsset(deletingAssetId);
    onClose();
  }

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title='Confirmar exclusão'
      description='Tem certeza que deseja excluir esse ativo? Essa ação não pode ser desfeita.'
    >
      <div className='flex gap-4 justify-end'>
        <button
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          onClick={handleConfirmDelete}
        >
          Excluir
        </button>
      </div>
    </CustomDialog>
  );
}
