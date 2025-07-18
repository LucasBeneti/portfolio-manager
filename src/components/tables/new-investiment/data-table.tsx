'use client';

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
import { columns } from './columns';
import type { InvestmentData } from '@/interfaces';

export function InvestmentTable({ data }: { data?: Array<InvestmentData> }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: data || [],
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
              <TableRow className='dark'>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center dark:text-white'
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
                      sum +
                      (row.getValue('suggestedInvestimentAmount') as number),
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
