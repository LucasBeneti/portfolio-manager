import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DemoPage from '../assets-table/page';
import { AssetsForm } from '../forms/test-form';
export function MainTabs() {
  return (
    <Tabs defaultValue='assets' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='assets'>Ativos</TabsTrigger>
        <TabsTrigger value='objectives'>Metas</TabsTrigger>
        <TabsTrigger value='new-investment'>Novo aporte</TabsTrigger>
      </TabsList>
      <TabsContent value='assets'>
        <p>Adicionar novo ativo:</p>
        <AssetsForm />
        <p className='dark:text-white'>Seus ativos:</p>
        <DemoPage />
      </TabsContent>
      <TabsContent value='objectives'>aqui vai a parte de metas</TabsContent>
      <TabsContent value='new-investment'>
        aqui vai a parte de metas
      </TabsContent>
    </Tabs>
  );
}
