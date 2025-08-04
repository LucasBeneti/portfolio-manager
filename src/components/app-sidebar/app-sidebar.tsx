import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { useDialogContext } from '@/context/dialog';

export function AppSidebar() {
  const { handleOpenExportUserDataDialog, handleOpenDollarQuoteDialog } =
    useDialogContext();
  return (
    <Sidebar className='dark'>
      <SidebarHeader className='dark' />
      <SidebarContent className='dark flex flex-col gap-8'>
        <SidebarGroup>
          <div className='p-2 flex flex-col gap-4'>
            <Link to='/' className='[&.active]:font-bold'>
              Home
            </Link>
            <Link to='/portfolio' className='[&.active]:font-bold'>
              Carteira
            </Link>
            <Link to='/about' className='[&.active]:font-bold'>
              About
            </Link>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <Button
          onClick={handleOpenDollarQuoteDialog}
          className='dark dark:bg-green-600 dark:text-white font-bold'
        >
          Cotação do Dólar
        </Button>
        <Button
          onClick={handleOpenExportUserDataDialog}
          className='dark dark:bg-gray-600 dark:text-white font-bold'
        >
          Gerenciar dados
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
