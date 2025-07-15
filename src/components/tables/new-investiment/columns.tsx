import type { ColumnDef } from '@tanstack/react-table';
import { CategoryBadge } from '@/components/category-badge/category-badge';
import type { Category } from '@/interfaces/assets';

// type NewInvestimentColumns

// Definindo o tipo de dados da tabela
export type InvestmentData = {
  category: string;
  ticker: string;
  currentAmount: number;
  currentPrice: number;
  grade: number;
  suggestedInvestimentAmount: number;
  suggestedAmountUnits: number;
};

// Configuração das colunas
export const columns: ColumnDef<InvestmentData>[] = [
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return <CategoryBadge name={category as Category} />;
    },
  },
  {
    accessorKey: 'ticker',
    header: 'Ticker',
    cell: ({ row }) => {
      const ticker = row.getValue('ticker') as string;
      return (
        <div className='font-mono uppercase max-w-24 overflow-hidden text-ellipsis'>
          {ticker}
        </div>
      );
    },
  },
  {
    accessorKey: 'currentAmount',
    header: () => (
      <div className='max-w-24 text-wrap text-center'>Atual ($)</div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue('currentAmount') as number;
      return (
        <div className='text-right'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'currentPrice',
    header: () => (
      <div className='max-w-24 text-wrap text-center'>Preço atual ($)</div>
    ),
    cell: ({ row }) => {
      const price = row.getValue('currentPrice') as number;
      return (
        <div className='text-right'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </div>
      );
    },
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => {
      const grade = row.getValue('grade') as number;
      return (
        <div className='text-center'>
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              grade >= 8
                ? 'bg-green-100 text-green-800'
                : grade >= 6
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {grade.toFixed(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'suggestedInvestimentAmount',
    header: () => (
      <div className='max-w-24 text-wrap text-center'>
        Sugestão de aporte ($)
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue('suggestedInvestimentAmount') as number;
      return (
        <div className='text-right'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'suggestedAmountUnits',
    header: () => (
      <div className='max-w-24 text-wrap text-center'>
        Sugestão de aporte (un.)
      </div>
    ),
    cell: ({ row }) => {
      const units = row.getValue('suggestedAmountUnits') as number;
      return (
        <div className='text-right'>
          {new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(units)}
        </div>
      );
    },
  },
];
