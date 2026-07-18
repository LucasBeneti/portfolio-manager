import { useRef } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (
    updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
  ) => void;
  onRowDoubleClick?: (data: TData) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange: externalOnColumnFiltersChange,
  onRowDoubleClick,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const lastTouchRef = useRef(0);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters: externalColumnFilters,
    },
    onColumnFiltersChange: externalOnColumnFiltersChange,
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='rounded-sm border-2'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onDoubleClick={
                  onRowDoubleClick && !isMobile
                    ? () => onRowDoubleClick(row.original)
                    : undefined
                }
                onTouchStart={
                  onRowDoubleClick && isMobile
                    ? (e) => {
                        const now = Date.now();
                        if (now - lastTouchRef.current < 300) {
                          e.preventDefault();
                          onRowDoubleClick(row.original);
                          lastTouchRef.current = 0;
                        } else {
                          lastTouchRef.current = now;
                        }
                      }
                    : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Nenhum resultado encotrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
