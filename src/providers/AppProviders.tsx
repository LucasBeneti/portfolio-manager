import type { PropsWithChildren } from 'react';
import { LayoutWrapper } from '@/components/Layout';
import { UserInformationProvider } from '@/context/user-information';
import { DialogProvider } from '@/context/dialog';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <LayoutWrapper>
      <UserInformationProvider>
        <DialogProvider>{children}</DialogProvider>
      </UserInformationProvider>
    </LayoutWrapper>
  );
}
