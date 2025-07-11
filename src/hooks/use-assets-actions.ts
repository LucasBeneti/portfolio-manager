export function useAssetsActions() {
  function handleDeleteAsset() {
    console.log('delete asset');
  }

  function handleEditAsset() {
    console.log('delete asset');
  }

  return {
    handleDeleteAsset,
    handleEditAsset,
  };
}
