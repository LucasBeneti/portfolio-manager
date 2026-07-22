import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssetsContent } from './content/assets/assets-content';
import { ObjectivesContent } from './content/objectives/content';
import { NewInvestimentContent } from './content/new-investiment/content';

export function MainTabs() {
  const [activeTab, setActiveTab] = useState('assets');

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className='w-full md:w-[80%] mx-auto max-w-5xl flex flex-col gap-4 mt-4'
    >
      <TabsList className='w-full md:max-w-[400px]'>
        <TabsTrigger value='assets'>Ativos</TabsTrigger>
        <TabsTrigger value='objectives'>Metas</TabsTrigger>
        <TabsTrigger value='new-investment'>Novo aporte</TabsTrigger>
      </TabsList>
      <TabsContent value='assets'>
        <div key={`assets-${activeTab}`} className="animate-in fade-in zoom-in-95 duration-300">
          <AssetsContent />
        </div>
      </TabsContent>
      <TabsContent value='objectives'>
        <div key={`objectives-${activeTab}`} className="animate-in fade-in zoom-in-95 duration-300">
          <ObjectivesContent />
        </div>
      </TabsContent>
      <TabsContent value='new-investment'>
        <div key={`new-investment-${activeTab}`} className="animate-in fade-in zoom-in-95 duration-300">
          <NewInvestimentContent />
        </div>
      </TabsContent>
    </Tabs>
  );
}
