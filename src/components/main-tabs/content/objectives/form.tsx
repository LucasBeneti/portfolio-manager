import { useForm, Controller } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CATEGORY_BADGE_COLOR } from '@/contants/category';
import type { Category } from '@/components/interfaces/category';

type SubmitData = {
  'fixed-income-br': Array<number>;
  'fixed-income-us': Array<number>;
  'stocks-br': Array<number>;
  'stocks-us': Array<number>;
  fii: Array<number>;
  crypto: Array<number>;
};

export function ObjectivesForm() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      'fixed-income-br': [0],
      'fixed-income-us': [0],
      'stocks-br': [0],
      'stocks-us': [0],
      fii: [0],
      crypto: [0],
    },
  });

  function onSubmit(data: SubmitData) {
    console.log('onSubmit', data);
  }

  const watchedValues = watch();

  function handleResetObjectives() {
    console.log('resetting to prev objectives');
  }

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='dark:text-white'>Minhas metas</h2>
      <p className='dark:text-white'>
        O objetivo aqui é setar as % de quanto e do que ela será composta.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {Object.entries(CATEGORY_BADGE_COLOR).map((el, index) => {
          const [key, value] = el;
          return (
            <div className='space-y-2 dark:text-white' key={`${key}_${index}`}>
              <Label htmlFor={key}>
                {value.title}: %{watchedValues[key as Category][0]}
              </Label>
              <Controller
                name={key as Category}
                control={control}
                render={({ field }) => (
                  <Slider
                    id={key}
                    min={0}
                    max={100}
                    step={1}
                    value={field.value}
                    onValueChange={field.onChange}
                    className='w-full dark'
                  />
                )}
              />
            </div>
          );
        })}

        <section className='flex gap-4 items-center w-full justify-end'>
          <Button onClick={handleResetObjectives} variant='secondary'>
            Cancelar
          </Button>
          <Button type='submit'>Confirmar</Button>
        </section>
      </form>
    </section>
  );
}
