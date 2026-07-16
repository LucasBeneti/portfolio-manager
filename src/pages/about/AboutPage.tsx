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

      <section className='w-full max-w-prose mt-12'>
        <h3 className='text-2xl font-bold text-foreground'>
          Perguntas frequentes:
        </h3>
        <Accordion
          type='single'
          collapsible
          className='w-full'
          defaultValue='item-1'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger className='font-bold text-foreground'>
              O que é "Buy and Hold" e "Value investing"?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-foreground'>
              <p>
                São estratégias de investimento para investidores que se
                entendem mais conservadores, cujo objetivo é manter o patrimônio
                e ir aumentando ele com investimentos estudados e de confiança
                para ele.
              </p>
              <ul className='list-disc pl-5 flex flex-col gap-2'>
                <li>
                  <a
                    href='https://en.wikipedia.org/wiki/Value_investing'
                    target='_blank'
                    rel='noreferrer'
                    className='underline'
                  >
                    Value investing — Wikipedia
                  </a>
                </li>
                <li>
                  <a
                    href='https://en.wikipedia.org/wiki/Buy_and_hold'
                    target='_blank'
                    rel='noreferrer'
                    className='underline'
                  >
                    Buy and hold — Wikipedia
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='font-bold text-foreground'>
              Tenho um ativo na minha carteira, como faço para ele não ser mais
              sugerido?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-base'>
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
            <AccordionTrigger className='font-bold text-foreground'>
              Devo confiar cegamente no que a tabela de "Novo investimento" me
              diz?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-base'>
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
          <AccordionItem value='item-4'>
            <AccordionTrigger className='font-bold text-foreground'>
              Meus dados estão seguros?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-base'>
              <p>
                Sim. Todos os dados que você adiciona aqui ficam armazenados
                apenas no seu navegador, no <code>localStorage</code>. Nada é
                enviado para servidores externos — seus dados não saem do seu
                computador.
              </p>
              <p>
                Se quiser fazer um backup ou migrar para outro dispositivo, use
                a opção de exportar dados disponível na aba lateral da aplicação.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-5'>
            <AccordionTrigger className='font-bold text-foreground'>
              Como faço para levar meus dados para outro dispositivo?
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance text-base'>
              <p>
                Na parte inferior da aba lateral da aplicação, há um botão para
                gerenciar seus dados. Por lá você pode exportar um arquivo com
                todas as informações da sua carteira e, em outro dispositivo,
                importar esse mesmo arquivo.
              </p>
              <p>
                Esse arquivo contém todos os seus ativos, metas e configurações.
                É uma forma prática de manter seus dados sincronizados entre
                dispositivos sem depender de servidores externos.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </ContentLayout>
  );
}
