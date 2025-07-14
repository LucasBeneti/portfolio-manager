import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetsContent } from './content/assets/assets-content';
import { DialogProvider } from '@/context/dialog/DialogContext';
import { ObjectivesContent } from './content/objectives/content';
import { NewInvestimentContent } from './content/new-investiment/content';
export function MainTabs() {
  return (
    <DialogProvider>
      <Tabs defaultValue='assets' className='w-[700px]'>
        <TabsList>
          <TabsTrigger value='assets'>Ativos</TabsTrigger>
          <TabsTrigger value='objectives'>Metas</TabsTrigger>
          <TabsTrigger value='new-investment'>Novo aporte</TabsTrigger>
        </TabsList>
        <TabsContent value='assets'>
          <AssetsContent />
        </TabsContent>
        <TabsContent value='objectives'>
          <ObjectivesContent />
        </TabsContent>
        <TabsContent value='new-investment'>
          <NewInvestimentContent />
        </TabsContent>
      </Tabs>
    </DialogProvider>
  );
}
