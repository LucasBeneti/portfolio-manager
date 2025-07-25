import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { AssetDialog } from '@/components/main-tabs/content/assets/asset-dialog';
import type { Asset } from '@/interfaces/assets';
import { CustomDialog } from '@/components/custom-dialog/custom-dialog';
import { Button } from '@/components/ui/button';
import { exportUserData } from '@/utils/export-data/export-user-data';
import { ImportUserData } from '@/components/forms/import-user-data';

type HandleOpenNewAssetDialogParams = {
  assetData?: Asset;
  isEdit?: boolean;
};

type DialogContextValue = {
  openAssetDialog: boolean;
  handleOpenNewAssetDialog: (d?: any) => void;
  handleOpenExportUserDataDialog: () => void;
  closeAssetDialog: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

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

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      'To use this hook, the component should be children of the DialogProvider.'
    );

  return context;
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
      <ImportUserData />
      <section className=''>
        <Button
          className='dark dark:bg-teal-950 dark:text-white font-bold absolute right-6 bottom-6'
          onClick={exportUserData}
        >
          Exportar dados armazenados
        </Button>
      </section>
    </CustomDialog>
  );
}
