import { useDialogContext } from '@/context/dialog/DialogContext';

export function useAssetsActions() {
  const { handleOpenNewAssetDialog } = useDialogContext();

  function handleDeleteAsset() {
    console.log('delete asset');
  }

  function handleEditAsset(data: any) {
    handleOpenNewAssetDialog({ assetData: data });
  }

  return {
    handleDeleteAsset,
    handleEditAsset,
  };
}
