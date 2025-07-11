import * as React from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../app-sidebar/app-sidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='dark' defaultOpen={false}>
      <AppSidebar />
      <main className='dark:bg-gray-900 w-full'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
