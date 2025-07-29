import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { MainTabs } from '@/components/main-tabs';
import { Button } from '@/components/ui/button';
import { USDQuoteForm } from '@/components/USDQuotesForm/USDQuoteForm';
import { useDialogContext } from '@/context/dialog';

export function PortfolioPage() {
  const { handleOpenExportUserDataDialog } = useDialogContext();
  return (
    <ContentLayout>
      <USDQuoteForm />
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
