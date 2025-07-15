import { useDialogContext } from '@/context/dialog/DialogContext';
import { useUserInformation } from '@/context/user-information';
import type { Asset } from '@/interfaces/assets';

export function useAssetsActions() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  const { handleRemoveUserAsset } = useUserInformation();

  function handleDeleteAsset(id: string) {
    handleRemoveUserAsset(id);
  }

  function handleEditAsset(data: Asset) {
    handleOpenNewAssetDialog({ assetData: data, isEdit: true });
  }

  return {
    handleDeleteAsset,
    handleEditAsset,
  };
}
