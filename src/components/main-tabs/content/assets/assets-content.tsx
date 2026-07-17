import { PortfolioAllocationChart } from '@/components/portfolio-allocation-chart/PortfolioAllocationChart';
import AssetsTable from '@/components/tables/assets/page';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';
import { Plus } from 'lucide-react';

export function AssetsContent() {
  const { handleOpenNewAssetDialog } = useDialogContext();
  return (
    <section className='flex flex-col md:flex-row gap-4'>
      <section className='flex-1 min-w-0'>
        <section className='flex justify-between items-center'>
          <p className='text-foreground text-2xl font-black'>Seus ativos:</p>
          <Button onClick={() => handleOpenNewAssetDialog()}>
            <Plus />
            Adicionar ativo
          </Button>
        </section>
        <AssetsTable />
      </section>
      <section className='flex justify-between items-center self-baseline'>
        <PortfolioAllocationChart />
      </section>
    </section>
  );
}
