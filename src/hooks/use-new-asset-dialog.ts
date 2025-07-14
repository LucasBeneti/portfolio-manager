import * as React from 'react';
import type { Asset } from '@/interfaces/assets';

type OpenNewAssetDialogParams = {
  assetData?: Asset;
};

export function useNewAssetDialog() {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  function handleOpenNewAssetDialog(params?: OpenNewAssetDialogParams) {
    console.log('assetData', params?.assetData);
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
