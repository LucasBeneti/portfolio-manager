import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { MainTabs } from '@/components/main-tabs';
import { ExportUserData } from '@/components/export-user-data';

export function PortfolioPage() {
  return (
    <ContentLayout>
      <MainTabs />
      <ExportUserData />
    </ContentLayout>
  );
}
