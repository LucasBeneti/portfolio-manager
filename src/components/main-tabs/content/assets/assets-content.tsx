import AssetsTable from '@/components/tables/assets/page';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';
import { getCurrentAssetsState } from '@/utils/suggestions/current-state';
import { useUserInformation } from '@/context/user-information';
import { Plus } from 'lucide-react';

export function AssetsContent() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  const { assets } = useUserInformation();
  const currentAssetState = getCurrentAssetsState(assets);
  console.log('currentAssetState', currentAssetState);
  return (
    <>
      <section className='flex justify-between items-center'>
        <p className='dark:text-white text-lg font-black'>Seus ativos:</p>
        <Button onClick={() => handleOpenNewAssetDialog()}>
          <Plus />
          Adicionar ativo
        </Button>
      </section>
      <AssetsTable />
    </>
  );
}
