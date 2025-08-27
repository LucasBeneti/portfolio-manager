import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useUserInformation } from '@/context/user-information';

const formSchema = z.object({
  amount: z.number().positive('Amount must be a positive number.'),
});

export function NewInvestimentForm() {
  const [displayValue, setDisplayValue] = useState('');
  const { handleAddUserSuggestions } = useUserInformation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const numericValue = Number(rawValue) / 100;

    form.setValue('amount', numericValue, { shouldValidate: true });

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);

    setDisplayValue(formattedValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddUserSuggestions)}
        className='dark flex gap-4 items-end  mt-4 w-full'
      >
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='dark:text-white font-bold'>
                Amount (BRL)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='R$ 0,00'
                  {...field}
                  onChange={handleValueChange}
                  value={displayValue}
                  className='dark:text-white max-w-32'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-32'>
          Calcular
        </Button>
      </form>
    </Form>
  );
}
