import * as React from 'react';

export function useNewAssetDialog() {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  function handleOpenNewAssetDialog() {
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
