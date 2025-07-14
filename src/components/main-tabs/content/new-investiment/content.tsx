import { useUserInformation } from '@/context/user-information';

import { NewInvestimentForm } from './form';
import { InvestmentTable } from '@/components/tables/new-investiment/data-table';
export function NewInvestimentContent() {
  const { assets, objectives } = useUserInformation();

  console.log('assets', assets);
  console.log('objectives', objectives);

  return (
    <section className='dark mt-4'>
      <h3 className='text-2xl dark:text-white font-extrabold'>
        Sugestões para um novo aporte.
      </h3>

      <section className='flex flex-col gap-4'>
        <NewInvestimentForm />
        <InvestmentTable />
      </section>
    </section>
  );
}
