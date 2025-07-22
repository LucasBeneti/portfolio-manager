import * as React from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../app-sidebar/app-sidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='dark' defaultOpen>
      <AppSidebar />
      <main className='dark:bg-gray-900 w-full'>
        <SidebarTrigger
          className='text-gray-900 dark:text-gray-50 size-12'
          variant='ghost'
        />
        {children}
      </main>
    </SidebarProvider>
  );
}
