import { useUserInformation } from '@/context/user-information';
import { InvestmentTable } from '@/components/tables/new-investiment/data-table';
import { NewInvestimentForm } from './form';

export function NewInvestimentContent() {
  const { investmentSuggestion } = useUserInformation();

  return (
    <section className='mb-6 max-w-5xl mx-auto'>
      <h3 className='text-2xl text-foreground font-extrabold'>
        Sugestões para um novo aporte.
      </h3>

      <section className='flex flex-col gap-4'>
        <NewInvestimentForm />
        <InvestmentTable data={investmentSuggestion} />
      </section>
    </section>
  );
}
