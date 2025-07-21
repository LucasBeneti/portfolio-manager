import { ContentLayout } from '@/components/Layout/content/ContentLayout';
export function AboutPage() {
  return (
    <ContentLayout>
      <h1>Objetivo</h1>
      <p>
        A ideia aqui é ter um lugar para balancear a carteira, baseado em quais
        ativos temos (tanto apeans interesse quanto já temos cota). ##
        Sugestão{' '}
      </p>
      <h3>Como funciona</h3>
      <ol>
        <li>
          pegamos o estado atual do portfolio, o que temos já em carteira e
          comparamos com as % dos objetivos uqe setamos para a nossa carteira.
        </li>
        <li>
          com o deficit (podendo ser positivo ou negativo), sabemos quais partes
          da carteira estão mais desfalcadas e quais devemos investir primeiro
        </li>
        <li>
          olhamos para cada categoria, olhando o deficit que ela representa e o
          assim sabemos quanto vamos colocar naquela categoria{' '}
        </li>
        <li>
          sabendo isso, computamos as notas de cada asset daquela categoria,
          assim sabemos qual o peso daquele asset para a categoria - asset com
          nota zero não é considerado para um novo aporte{' '}
        </li>
        <li>
          baseado na nota uqe aquele ativo tem, frente a categoria, decidimos
          quanto vamos aplicar (com uma média ponderada levando em consideração
          as notas)
        </li>
        <li>
          o valor sugerido, para cada ativo daquela categoria é computado ###
          Melhorias Estou estudando impor alguns limites para que não fiquemos
          muito pesados em apenas uma empresa ou setor (por setor não sei bem
          como vou fazer isso). Mas é mais seguro, a longo prazo, não permitir
          que uma ação tome 10% a 15% de todas as outras (investidores mais
          corajosos elevam para 20%).
        </li>
      </ol>
    </ContentLayout>
  );
}
