import AssetsTable from '@/components/tables/assets/page';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';
import { Plus } from 'lucide-react';

export function AssetsContent() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  return (
    <>
      <section className='flex justify-between items-center'>
        <p className='dark:text-white text-2xl font-black'>Seus ativos:</p>
        <Button onClick={() => handleOpenNewAssetDialog()}>
          <Plus />
          Adicionar ativo
        </Button>
      </section>
      <AssetsTable />
    </>
  );
}
