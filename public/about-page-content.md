# Sobre a aplicação

**Portfolio Manager** é uma ferramenta pra quem prefere gerenciar a própria carteira de investimentos, sem depender de recomendações automáticas de plataformas terceiras. O objetivo é te ajudar a organizar seus ativos, definir metas de alocação por categoria e manter a disciplina nos aportes — sempre com base nos seus próprios critérios e sem abrir mão do controle.

Diferente de outras ferramentas por aí, aqui você tem total controle sobre seus dados: nada é enviado para servidores externos. É uma alternativa gratuita e de código aberto para quem segue estratégias como **buy and hold** e **value investing** e quer uma visão clara de onde está e para onde quer ir com a carteira.

### Como funciona

Todos os dados adicionados aqui no aplicativo não são enviados para nenhum lugar, apenas são armazenados localmente no `localStorage` (armazenamento do navegador). Isso significa que sua privacidade está preservada — nenhum dado seu sai do seu computador.

Para facilitar o compartilhamento ou backup dos seus dados, na parte inferior da aba lateral da aplicação, há um botão que leva o usuário para exportar ou importar dados da sua carteira.

#### Como as sugestões funcionam?

O cálculo das sugestões segue uma sequência de passos:

1. É verificado o estado atual da carteira: quais categorias estão com menos ou mais alocação que o desejado;
2. São identificados os maiores déficits de alocação — ou seja, onde a "falta" de investimento é maior — e essas categorias são priorizadas na distribuição do novo aporte;
3. Com as metas já definidas (a porcentagem ideal para cada categoria), os ativos são ordenados pela nota que você deu a cada um dentro da sua categoria, gerando um "peso" que determina quanto alocar para cada ativo;
4. A tabela de sugestões é montada na ordem do déficit de investimento.

**Nota:** na hora de investir, pode não haver um produto adequado disponível ou o investimento mínimo pode ser maior que o valor sugerido. Nesse caso, é melhor não forçar a compra naquela categoria e focar em outras.

### Melhorias em estudo

Estou estudando maneiras de evitar que a carteira fique muito concentrada em uma única empresa ou setor. Uma ideia é limitar o peso máximo de um ativo (algo entre 10% e 15%, ou 20% para investidores mais corajosos). A longo prazo, isso tende a deixar a carteira mais resiliente.
