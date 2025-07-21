import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';

export function AppSidebar() {
  return (
    <Sidebar className='dark'>
      <SidebarHeader className='dark' />
      <SidebarContent className='dark flex flex-col gap-8'>
        <SidebarGroup>
          <div className='p-2 flex gap-2'>
            <Link to='/' className='[&.active]:font-bold'>
              Home
            </Link>{' '}
            <Link to='/about' className='[&.active]:font-bold'>
              About
            </Link>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
