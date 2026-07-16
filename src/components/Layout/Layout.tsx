import * as React from 'react';
import { AppNav } from '../app-nav/app-nav';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-svh flex flex-col'>
      <AppNav />
      <main className='flex-1 w-full'>
        {children}
      </main>
    </div>
  );
}
