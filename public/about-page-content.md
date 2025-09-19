# Sobre a aplicação

Aqui vamos esclarecer um pouco mais sobre a aplicação e como seus dados relevantes são armazenados e calculados.

### Como funciona

Todos os dados adicionados aqui no aplicativo não são enviados para nenhum lugar, apenas são armazenados localmente no `localStorage` (armazenamento do browser). E para para auxiliar no compartilhamentos dos seus dados, na parte inferior da aba lateral da aplicação, há um botão que leva o usuário para exportar ou importar dados para a sua carteira.

#### Como as sugestões funcionam?

Ocorre uma série de passos antes das sugestões finais, mas a sequência de acontecimentos é a seguinte:

1. É verificado o estado atual da carteira, quais categorias tem mais ou menos alocação;
2. levantamos os maiores deficits de alocação, ou seja, onde a "falta" de investimento é maior, e ordenamos essas categorias para serem as primeiras servidas na distribuição em um novo aporte;
3. com os objetivos já setados (a % para cada categoria de investimento), ordenamos os investimentos pela nota dada a cada um deles dentro de sua categoria e assim conseguimos um "peso" de quanto alocar para aquele investimento com aquela nota;
4. tendo tudo isso listado, a tabela de sugestões é criada e a ordem que aparece, é a ordem do deficit de investimento;

**Nota: quando vamos investir, pode ser que não encontremos um bom produto na hora e/ou que requer um investimento mínimo que é maior que o valor sugerido. Nesse momento seria melhor o investidor não se forçar a investir naquela categoria, e focar em outras.**

### Melhorias

Estou estudando impor alguns limites para que não fiquemos
muito pesados em apenas uma empresa ou setor (por setor não sei bem
como vou fazer isso). Mas é mais seguro, a longo prazo, não permitir
que uma ação tome 10% a 15% de todas as outras (investidores mais
corajosos elevam para 20%).
