import type { PropsWithChildren } from 'react';
import { LayoutWrapper } from '@/components/Layout';
import { UserInformationProvider } from '@/context/user-information';
import { DialogProvider } from '@/context/dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInformationProvider>
        <DialogProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </DialogProvider>
      </UserInformationProvider>
    </QueryClientProvider>
  );
}
