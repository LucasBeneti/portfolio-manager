import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { type InvestmentData, columns } from './columns';
// Dados de exemplo
const sampleData: InvestmentData[] = [
  {
    category: 'fixed-income-br',
    ticker: 'TESOURO SELIC',
    currentAmount: 10000.0,
    currentPrice: 100.5,
    grade: 8.5,
    suggestedInvestimentAmount: 5000.0,
    suggestedAmountUnits: 49.75,
  },
  {
    category: 'stocks-br',
    ticker: 'PETR4',
    currentAmount: 2500.0,
    currentPrice: 25.8,
    grade: 7.2,
    suggestedInvestimentAmount: 1000.0,
    suggestedAmountUnits: 38.76,
  },
  {
    category: 'crypto',
    ticker: 'BTC',
    currentAmount: 15000.0,
    currentPrice: 45000.0,
    grade: 6.8,
    suggestedInvestimentAmount: 2000.0,
    suggestedAmountUnits: 0.044,
  },
  {
    category: 'stocks-br',
    ticker: 'VALE3',
    currentAmount: 3200.0,
    currentPrice: 68.5,
    grade: 8.1,
    suggestedInvestimentAmount: 1500.0,
    suggestedAmountUnits: 21.9,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
  {
    category: 'crypto',
    ticker: 'ETH',
    currentAmount: 8000.0,
    currentPrice: 2500.0,
    grade: 5.5,
    suggestedInvestimentAmount: 800.0,
    suggestedAmountUnits: 0.32,
  },
];

export function InvestmentTable() {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='space-y-4'>
      {/* Filtro Global */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Buscar investimentos...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='pl-10 max-w-sm'
        />
      </div>

      <div className='rounded-md border dark'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='font-semibold h-20'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='dark'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='dark hover:bg-muted/50 dark:text-white'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between text-sm text-muted-foreground'>
        <div>
          {table.getFilteredRowModel().rows.length} de{' '}
          {table.getCoreRowModel().rows.length} linha(s)
        </div>
        <div>
          {table.getFilteredRowModel().rows.length > 0 && (
            <span>
              Total investido:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(
                table
                  .getFilteredRowModel()
                  .rows.reduce(
                    (sum, row) =>
                      sum + (row.getValue('currentAmount') as number),
                    0
                  )
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
