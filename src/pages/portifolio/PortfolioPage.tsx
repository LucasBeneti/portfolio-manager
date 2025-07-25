import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { MainTabs } from '@/components/main-tabs';
import { ExportUserData } from '@/components/export-user-data';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';

export function PortfolioPage() {
  const { handleOpenExportUserDataDialog } = useDialogContext();
  return (
    <ContentLayout>
      <MainTabs />
      <ExportUserData />
      <Button onClick={handleOpenExportUserDataDialog}>Gerenciar dados</Button>
    </ContentLayout>
  );
}
