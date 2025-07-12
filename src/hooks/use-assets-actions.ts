import { useNewAssetDialog } from "./use-new-asset-dialog";
import { useDialogContext } from "@/context/DialogContext";

export function useAssetsActions() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  // const { handleOpenNewAssetDialog } = useNewAssetDialog();
  function handleDeleteAsset() {
    console.log("delete asset");
  }

  function handleEditAsset(data: any) {
    handleOpenNewAssetDialog({ assetData: data });
  }

  return {
    handleDeleteAsset,
    handleEditAsset,
  };
}
