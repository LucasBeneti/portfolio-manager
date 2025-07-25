import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppProviders } from '@/providers/AppProviders';
import { Toaster } from '@/components/ui/sonner';
export const Route = createRootRoute({
  component: () => (
    <AppProviders>
      <Outlet />
      <Toaster position='top-right' />
      <TanStackRouterDevtools />
    </AppProviders>
  ),
});
