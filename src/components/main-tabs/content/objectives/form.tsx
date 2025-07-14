import { useForm, Controller } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CATEGORY_BADGE_COLOR } from '@/contants/category';
import type { Category } from '@/interfaces/category';
import { useEffect, useMemo } from 'react';
import { useUserInformation } from '@/context/UserInformationContext';
import { formatUserObjectivesToSlider } from '@/utils/data';
import type { UserObjectives } from '@/interfaces/objectives';

type SubmitData = {
  'fixed-income-br': Array<number>;
  'fixed-income-us': Array<number>;
  'stocks-br': Array<number>;
  'stocks-us': Array<number>;
  fii: Array<number>;
  crypto: Array<number>;
};

export function ObjectivesForm() {
  const { handleAddUserObjectives, objectives } = useUserInformation();
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      'fixed-income-br': [0],
      'fixed-income-us': [0],
      'stocks-br': [0],
      'stocks-us': [0],
      fii: [0],
      crypto: [0],
    },
  });

  useEffect(() => {
    if (objectives) {
      console.log('objectives', objectives);
      const formattedValues = formatUserObjectivesToSlider(objectives);
      reset(formattedValues);
    }
  }, [objectives, reset]);

  function onSubmit(data: SubmitData) {
    if (!isTotalAllocationInvalid) {
      const mappedAllocation = Object.entries(data).reduce((acc, curr) => {
        const key = curr[0];
        const value = curr[1];
        return {
          ...acc,
          [key]: value[0],
        };
      }, {} as UserObjectives);

      handleAddUserObjectives(mappedAllocation);
    }
  }

  const watchedValues = watch();

  const totalAllocation = useMemo(() => {
    const sum = Object.values(watchedValues).reduce((acc, curr) => {
      const currentValue = curr[0];
      return acc + currentValue;
    }, 0);

    return sum;
  }, [watchedValues]);

  const isTotalAllocationInvalid = totalAllocation > 100;

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
            isTotalAllocationInvalid ? 'text-red-400' : 'text-white'
          }`}
        >
          {totalAllocation}%
        </p>
        {isTotalAllocationInvalid && (
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
          <Button type='submit' disabled={isTotalAllocationInvalid}>
            Confirmar
          </Button>
        </section>
      </form>
    </section>
  );
}
