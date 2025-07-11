import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  assetName: z.string().min(2).max(40),
  quantity: z.number(),
});

export function AssetsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetName: '',
      quantity: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='assetName'
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Ativo</FormLabel>
              <FormControl>
                <Input placeholder='AAPL' {...field} />
              </FormControl>
              <FormDescription>Nome do ativo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem className='dark:text-white'>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  {...form.register('quantity', { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription>
                Quantidade que possui desse ativo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
