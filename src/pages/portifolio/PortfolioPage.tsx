import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { MainTabs } from '@/components/main-tabs';
import { Button } from '@/components/ui/button';
import { USDQuoteForm } from '@/components/USDQuotesForm/USDQuoteForm';
import { useDialogContext } from '@/context/dialog';

export function PortfolioPage() {
  const { handleOpenExportUserDataDialog } = useDialogContext();
  /**
   * TODO: passar o botão de Gerenciar dados para o menu, como uma opção mesmo ou até
   * lá em baixo, no footer do drawer, como se fosse uma opção de configuração. Pois está atrapalhando
   * bastante na UI de mobile.
   */
  return (
    <ContentLayout>
      <section className='flex flex-col gap-2 mb-6 w-[80%]'>
        <h3 className='font-bold dark:text-white'>Cotação do dolar atual:</h3>
        <p className='text-gray-400'>
          Esse valor é utilizado para alguns cálculos aqui, como nas sugestões
          de investimento.
        </p>
        <USDQuoteForm />
      </section>
      <MainTabs />
      <Button
        onClick={handleOpenExportUserDataDialog}
        className='dark dark:bg-teal-950 dark:text-white font-bold absolute right-6 bottom-6'
      >
        Gerenciar dados
      </Button>
    </ContentLayout>
  );
}
