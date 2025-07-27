import { type ColumnDef } from '@tanstack/react-table';
import type { Asset } from '@/interfaces/assets';
import { CategoryBadge } from '../../category-badge/category-badge';
import type { Category } from '../../../interfaces/assets';
import { AssetsTableContextualMenu } from '@/components/assets-table-contextual-menu/contextual-menu';

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      const category = row.getValue('category') as Category;

      return <CategoryBadge name={category} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'currentValue',
    header: () => <div className='text-right'>Valor atual</div>,
    cell: ({ row }) => {
      const currentValue = parseFloat(row.getValue('currentValue'));
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(currentValue);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className='text-right'>Quantidade</div>,
    cell: ({ row }) => {
      const currentValue = parseFloat(row.getValue('quantity'));

      return <div className='text-right font-medium'>{currentValue}</div>;
    },
  },
  {
    accessorKey: 'grade',
    header: () => <div className='text-right'>Nota</div>,
    cell: ({ row }) => {
      const grade = parseFloat(row.getValue('grade'));

      return <div className='text-right font-medium'>{grade}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const asset = row.original;
      return <AssetsTableContextualMenu asset={asset} />;
    },
  },
];
