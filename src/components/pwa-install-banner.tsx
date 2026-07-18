import { usePWAInstall } from '@/hooks/use-pwa-install';
import { usePWAAlertDismiss } from '@/hooks/use-pwa-alert-dismiss';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

export function PWAInstallBanner() {
  const { canInstall, isStandalone, installApp } = usePWAInstall();
  const { isDismissed, dismiss } = usePWAAlertDismiss();

  console.log('PWAInstallBanner', { canInstall, isStandalone, isDismissed });
  if (isStandalone || !canInstall || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    await installApp();
  };

  console.log('estamos mostrando ese cara');

  return (
    <div className='rounded-sm border bg-card text-card-foreground p-4 md:p-5 mb-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-start gap-3'>
          <Smartphone className='size-5 shrink-0 mt-0.5' />
          <div className='min-w-0'>
            <p className='font-medium text-sm'>Use como aplicativo</p>
            <p className='text-sm text-muted-foreground mt-1'>
              Instale o Organizador de Carteira na tela inicial do seu celular
              ou computador. Tudo funciona igual — seus dados continuam salvos
              só aqui no dispositivo.
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm' onClick={handleInstall}>
            Instalar agora
          </Button>
          <Button variant='ghost' size='sm' onClick={dismiss}>
            Dispensar
          </Button>
        </div>
      </div>
    </div>
  );
}
