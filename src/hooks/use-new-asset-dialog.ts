import * as React from "react";

export function useNewAssetDialog() {
  const [openDialog, setOpenDialog] = React.useState<boolean>();

  function handleOpenNewAssetDialog() {
    console.log("openDialog", openDialog);
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
