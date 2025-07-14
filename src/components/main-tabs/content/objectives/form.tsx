import { useForm, Controller } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CATEGORY_BADGE_COLOR } from '@/contants/category';
import type { Category } from '@/components/interfaces/category';
import { useMemo } from 'react';

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

  const totalAllocation = useMemo(() => {
    const sum = Object.values(watchedValues).reduce((acc, curr) => {
      const currentValue = curr[0];
      return acc + currentValue;
    }, 0);

    return sum;
  }, [watchedValues]);

  function handleResetObjectives() {
    console.log('resetting to prev objectives');
  }

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='dark:text-white'>Minhas metas</h2>
      <p className='dark:text-white'>
        O objetivo aqui é setar as % de quanto e do que ela será composta.
      </p>

      <section className='flex gap-6'>
        <p className='text-xl font-bold dark:text-white'>Total alocado</p>
        <p
          className={`text-xl font-bold ${
            totalAllocation <= 100 ? 'text-white' : 'text-red-400'
          }`}
        >
          {totalAllocation}%
        </p>
        {totalAllocation > 100 && (
          <p className='text-red-400'>Alocação não deve ultrapassar 100%.</p>
        )}
      </section>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {Object.entries(CATEGORY_BADGE_COLOR).map((el, index) => {
          const [key, value] = el;
          return (
            <div
              className='dark:text-white flex justify-between w-full'
              key={`${key}_${index}`}
            >
              <Label htmlFor={key}>
                {value.title}: {watchedValues[key as Category][0]}%
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
                    className='max-w-[500px] dark'
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
