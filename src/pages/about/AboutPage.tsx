import { ContentLayout } from '@/components/Layout/content/ContentLayout';
import { useConvertMarkDownToText } from '@/hooks/use-convert-markdown-to-text';
import Markdown from 'react-markdown';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export function AboutPage() {
  const { text } = useConvertMarkDownToText('/about-page-content.md');
  return (
    <ContentLayout>
      <section className='max-w-prose self-center story-markdown-content'>
        {text ? <Markdown>{text}</Markdown> : null}
      </section>

      <section className='dark w-full max-w-prose mt-12'>
        <h3 className='text-2xl font-bold dark:text-gray-200'>
          Perguntas frequentes:
        </h3>
        <Accordion
          type='single'
          collapsible
          className='w-full'
          defaultValue='item-1'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger className='font-bold dark:text-gray-200'>
              O que é "Buy and Hold" e "Value investing"?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance dark:bg-blak text-[16px]'>
              <p>
                São estratégias de investimento para investidores que se
                entendem mais conservadores, cujo objetivo é manter o patrimônio
                e ir aumentando ele com investimentos estudados e de confiança
                para ele.
              </p>
              <p>
                Alguns links interessantes para entender essa estratégia, são os
                seguintes:
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='font-bold dark:text-gray-200'>
              Tenho um ativo na minha carteira, como faço para ele não ser mais
              sugerido?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-[16px]'>
              <p>
                Quando estamos adicionando ou editando um novo ativo na nossa
                carteira, podemos colocar uma nota de 0 a 10 para ele. Essa nota
                que faria ele ser considerado ou não em um novo aporte. Se a
                nota dele for 0, ele nem entra na distribuição de investimento
                para aquela categoria, então esse seria o caminho para não ter
                sugestões de um ativo específico, deixando ele com uma nota 0.
              </p>
              <p>
                Lembrando que quanto maior a nota, maior é o peso daquele ativo
                em sua categoria e receberá maiores aportes, sempre considerando
                uma média ponderada entre os ativos daquela categoria e suas
                respectivas notas.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='font-bold dark:text-gray-200'>
              Devo confiar cegamente no que a tabela de "Novo investimento" me
              diz?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-[16px]'>
              <p>
                Não, como a própria tabela diz, aquelas são sugestões de
                investimento em um novo aporte no valor fornecido. É esperado
                que o investidor analise o que lhe foi sugerido e pondere se faz
                sentido para aquele momento. Por exemplo, podemos sugerir
                diversos aportes de ações internacionais (que claro, já estejam
                cadastradas e validadas pelo investidor), mas pode ser que o
                investidor não queira, num primeiro momento, investir nessas
                ações, apenas quer comprar ativos de renda fixa.
              </p>
              <p>
                E até aí tudo bem, a palavra final sempre fica com o investidor,
                afinal, ele que vai tomar o risco e o dinheiro investido é dele.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </ContentLayout>
  );
}
