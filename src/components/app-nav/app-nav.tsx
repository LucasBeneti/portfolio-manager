import { Link } from '@tanstack/react-router';
import { Menu, DollarSign, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialogContext } from '@/context/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Carteira' },
  { to: '/about', label: 'About' },
];

function NavLinks({ mobile }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? 'flex flex-col gap-2' : 'flex items-center gap-6'}>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className='text-sm font-medium text-foreground/70 hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-bold'
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppNav() {
  const isMobile = useIsMobile();
  const { handleOpenDollarQuoteDialog, handleOpenExportUserDataDialog } =
    useDialogContext();

  return (
    <header className='sticky top-0 z-40 w-full border-b-2 bg-background'>
      <div className='flex h-14 items-center justify-between px-4 md:px-6'>
        <div className='flex items-center gap-6'>
          <Link to='/' className='text-base font-bold text-foreground'>
            Portfolio Manager
          </Link>
          {!isMobile && <NavLinks />}
        </div>

        <div className='flex items-center gap-2'>
          <ThemeToggle />
          {!isMobile && (
            <>
              <Button
                variant='outline'
                size='sm'
                onClick={handleOpenDollarQuoteDialog}
              >
                <DollarSign className='size-4' />
                Cotação
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={handleOpenExportUserDataDialog}
              >
                <Database className='size-4' />
                Dados
              </Button>
            </>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-64'>
                <SheetHeader>
                  <SheetTitle className='text-left'>
                    Portfolio Manager
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 mt-6'>
                  <NavLinks mobile />
                  <div className='flex flex-col gap-2 pt-4 border-t-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleOpenDollarQuoteDialog}
                      className='justify-start'
                    >
                      <DollarSign className='size-4' />
                      Cotação do Dólar
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleOpenExportUserDataDialog}
                      className='justify-start'
                    >
                      <Database className='size-4' />
                      Gerenciar dados
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
