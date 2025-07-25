import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { MainTabs } from '@/components/main-tabs';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';

export function PortfolioPage() {
  const { handleOpenExportUserDataDialog } = useDialogContext();
  return (
    <ContentLayout>
      <MainTabs />
      <Button
        onClick={handleOpenExportUserDataDialog}
        className='dark dark:bg-teal-950 dark:text-white font-bold absolute right-6 bottom-6'
      >
        Gerenciar dados
      </Button>
    </ContentLayout>
  );
}
