import type { PropsWithChildren } from 'react';
import { LayoutWrapper } from '@/components/Layout';
import { UserInformationProvider } from '@/context/user-information';
import { DialogProvider } from '@/context/dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWrapper>
        <UserInformationProvider>
          <DialogProvider>{children}</DialogProvider>
        </UserInformationProvider>
      </LayoutWrapper>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
