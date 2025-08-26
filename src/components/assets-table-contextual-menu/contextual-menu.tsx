import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useAssetsActions } from '@/hooks/use-assets-actions';
import type { Asset } from '@/interfaces';
import { useDialogContext } from '@/context/dialog';

export function AssetsTableContextualMenu({ asset }: { asset: Asset }) {
  const { handleEditAsset } = useAssetsActions();
  const { handleOpenConfirmDeleteAssetDialog } = useDialogContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='dark'>
        <DropdownMenuItem
          onClick={() => handleEditAsset(asset)}
          className='dark:text-white'
        >
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleOpenConfirmDeleteAssetDialog(asset.id)}
          className='dark:text-red-400'
        >
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
