import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ControllerRenderProps } from 'react-hook-form';

export function CategorySelect({
  field,
}: {
  field: ControllerRenderProps<
    {
      id: string;
      category: string;
      name: string;
      quantity: number;
      currentValue: number;
      grade: number;
    },
    'category'
  >;
}) {
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className='w-[180px] dark:text-white'>
        <SelectValue placeholder='Categiria do investimento' />
      </SelectTrigger>
      <SelectContent className='dark'>
        <SelectGroup>
          <SelectLabel>Categoria</SelectLabel>
          <SelectItem value='fixed-income-br'>Renda Fixa</SelectItem>
          <SelectItem value='fixed-income-us'>
            Renda Fixa Internacional
          </SelectItem>
          <SelectItem value='stocks-br'>Ações Brasileiras</SelectItem>
          <SelectItem value='stocks-us'>Ações Americanas</SelectItem>
          <SelectItem value='fii'>FII</SelectItem>
          <SelectItem value='crypto'>Criptomoedas</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
