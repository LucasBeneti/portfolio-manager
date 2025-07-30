# Sobre a aplicação

Aqui vamos esclarecer um pouco mais sobre a aplicação e como seus dados relevantes são armazenados e calculados.

### Como funciona

Todos os dados impostos aqui no aplicativo não são enviados para nenhum lugar, são apeans armazenados localmente no `localStorage` (armazenamento do browser por domínio). Justamente por isso, para auxiliar no compartilhamentos dos seus dados e facilidade, no canto ingerior direito tem um botão que leva o usuário para exportar ou importar dados para sua aplicação.

#### Como as sugestões funcionam?

Ocorre uma série de passos antes das sugestões finais, mas a sequência de acontecimentos é a seguinte:

1. É verificado o estado atual da carteira, quais categorias tem mais ou menos alocação;
2. levantamos os maiores deficits de alocaçào
3. tendo o quanto colocar por ctegoria, vamos organizar dentro das categorias, os ativos por nota, para descobrir o peso daquele ativo na carteira e quanto ele deveria experimentar
4. ...

### Melhorias

Estou estudando impor alguns limites para que não fiquemos
muito pesados em apenas uma empresa ou setor (por setor não sei bem
como vou fazer isso). Mas é mais seguro, a longo prazo, não permitir
que uma ação tome 10% a 15% de todas as outras (investidores mais
corajosos elevam para 20%).
