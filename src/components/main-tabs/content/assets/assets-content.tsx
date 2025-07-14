import DemoPage from '@/components/assets-table/page';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog/DialogContext';

export function AssetsContent() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  return (
    <>
      <section className='flex justify-between items-center'>
        <p className='dark:text-white'>Seus ativos:</p>
        <Button onClick={handleOpenNewAssetDialog}>Adicionar ativo</Button>
      </section>
      <DemoPage />
    </>
  );
}
