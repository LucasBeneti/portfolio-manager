import { useState } from 'react';
import { type ColumnFiltersState } from '@tanstack/react-table';
import { ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useAssetsActions } from '@/hooks/use-assets-actions';
import { useUserInformation } from '@/context/user-information';

const CATEGORY_LABELS: Record<string, string> = {
  'fixed-income-br': 'Renda Fixa',
  'stocks-br': 'Ações Brasileiras',
  'stocks-us': 'Ações Americanas',
  fii: 'Fundos Imobiliários',
  crypto: 'Criptomoedas',
};

export default function AssetsTable() {
  const { assets } = useUserInformation();
  const { handleEditAsset } = useAssetsActions();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const categoryFilter =
    (columnFilters.find((f) => f.id === 'category')?.value as string) || 'all';

  return (
    <div className='text-foreground w-full py-4 space-y-3'>
      <div className='flex items-center gap-2'>
        <ListFilter className='size-4 text-muted-foreground' />
        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            setColumnFilters(
              value === 'all' ? [] : [{ id: 'category', value }]
            );
          }}
        >
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Filtrar por categoria' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>Todas categorias</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={columns}
        data={assets || []}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        onRowDoubleClick={handleEditAsset}
      />
    </div>
  );
}
