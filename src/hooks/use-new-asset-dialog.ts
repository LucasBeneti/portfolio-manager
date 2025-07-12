import * as React from "react";
import type { AssetData } from "@/components/main-tabs/content/assets/asset-dialog";

type OpenNewAssetDialogParams = {
  assetData?: AssetData;
};

export function useNewAssetDialog() {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  function handleOpenNewAssetDialog(params?: OpenNewAssetDialogParams) {
    console.log("assetData", params?.assetData);
    setOpenDialog(true);
  }

  function closeAssetDialog() {
    setOpenDialog(false);
  }
  return {
    openDialog,
    handleOpenNewAssetDialog,
    closeAssetDialog,
    setOpenDialog,
  };
}
