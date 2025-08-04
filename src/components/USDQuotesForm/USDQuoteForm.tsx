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
import { useEffect, useState } from 'react';
import { useUserInformation } from '@/context/user-information';
import { useDialogContext } from '@/context/dialog';

const formSchema = z.object({
  usdBrlQuote: z.number().positive('Amount must be a positive number.'),
});

export function USDQuoteForm() {
  const { closeDollarQuoteDialog } = useDialogContext();
  const [displayValue, setDisplayValue] = useState('');
  const { usdBrlQuote, handleSetUSDBRLQuote } = useUserInformation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usdBrlQuote: usdBrlQuote,
    },
  });

  useEffect(() => {
    if (usdBrlQuote) {
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(usdBrlQuote);
      setDisplayValue(formattedValue);
    }
  }, [usdBrlQuote]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;

    form.setValue('usdBrlQuote', numericValue, { shouldValidate: true });

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);

    setDisplayValue(formattedValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSetUSDBRLQuote)}
        className='dark flex items-end justify-between mt-4'
      >
        <FormField
          control={form.control}
          name='usdBrlQuote'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='dark:text-white font-bold'>
                Valor (BRL)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='R$ 0,00'
                  {...field}
                  onChange={handleValueChange}
                  value={displayValue}
                  className='dark:text-white w-32 max-w-32'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          onClick={() => closeDollarQuoteDialog()}
          className='w-32 max-w-32'
        >
          Submeter
        </Button>
      </form>
    </Form>
  );
}
