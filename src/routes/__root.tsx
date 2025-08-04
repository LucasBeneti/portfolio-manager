import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppProviders } from '@/providers/AppProviders';
import { Toaster } from '@/components/ui/sonner';
export const Route = createRootRoute({
  component: () => (
    <AppProviders>
      <Outlet />
      <Toaster position='top-right' />
    </AppProviders>
  ),
});
