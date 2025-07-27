import AssetsTable from '@/components/tables/assets/page';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';
import { getCurrentAssetsState } from '@/utils/suggestions/current-state';
import { useUserInformation } from '@/context/user-information';

export function AssetsContent() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  const { assets } = useUserInformation();
  const currentAssetState = getCurrentAssetsState(assets);
  console.log('currentAssetState', currentAssetState);
  return (
    <>
      <section className='flex justify-between items-center'>
        <p className='dark:text-white'>Seus ativos:</p>
        <Button onClick={handleOpenNewAssetDialog}>Adicionar ativo</Button>
      </section>
      <AssetsTable />
    </>
  );
}
