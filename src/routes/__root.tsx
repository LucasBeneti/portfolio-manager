import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { AppProviders } from '@/providers/AppProviders';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    return (
      <AppProviders>
        <div key={location.pathname} className="animate-in fade-in duration-300">
          <Outlet />
        </div>
        <Toaster position='top-right' />
      </AppProviders>
    );
  },
});