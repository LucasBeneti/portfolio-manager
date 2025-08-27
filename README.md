# Portfolio Manager

É um projeto pessoal baseado em outra ferramenta conhecida, que tem o mesmo objetivo, de organizar seus ativos e balancear sua carteira de investimentos. Lembrando que nada sugerido é uma dica de investimento, o investidor que está tomando seus próprios riscos.

O app pode ser visto [aqui](https://portfolio-manager-hgak.onrender.com)

### Lista de melhorias

- [x] exportar dados do local storage (para ser reutilizado em outro dispositivo)
- [x] implementar o GET dos valores de preço para ações brasileiras e ou americanas
  - não sei exatamente como isso vai ficar no modal, se mantém o vampo de currentValue.
    - Resposta: o modal continua em uso, tem o campo lá, mas é ignorado quando temos um valor pego de API
- [x] adicionar responsividade para mobile (preciso deixar a tabela e as abas mais responsivas)
- [x] adicionar mais conteúdo na página sobre de como o algoritmo das sugestões funciona
- [x] implementar como PWA (primeria versão)
- [ ] colocar um aviso na tela inicial que agora temos a possibilidade de baixar o app na forma de PWA. Falar como fazer isso e os benefícios disso
- [x] fazer um bug bash para levantar tudo que tem de bug na aplicação, testando desktop e mobile

#### Bugs e implementações para fazer

- [x] remover logs de debug
- [x] Aba de ativos
  - [x] Adicionar ativo
  - [x] quando a categoria for renda fixa
    - [x] fixar a quantidade em 1 e dar um disable no campo
  - [x] remover renda fixa internacional, por ser um caso muito específico
  - [x] na categoria, mudar o valor de FII para Fundos Imobiliários
  - [x] na Nota, limitar em um valor máximo, tipo 10
  - [x] arrumar o subtítulo "Adicione aqui um novo ativo para a sua carteira. Dependendo da nota, ele poderá ser considerado em um novo aporte." do modal, onde a segunda frase deve ser: "Se a nota for maior que zero, ele será considerado para um novo aporte."
  - [x] no menu contextual das linhas, retirar o "Ações", pode confundir
  - [x] aumentar o tamanho do "Seus ativos
  - [x] fazer um modal de confirmar exclusão de ativo na tabela
    - [x] essa ação deve ser cancelável para evitar dor de cabeça
- [x] Aba de metas
  - [x] não permitir que o usuário salve o "Minhas metas" se o total não for 100%
- [x] Aba novo aporte
  - [x] arrumar botão de Calcular Sugestão para um novo aport em telas desktop
    - [x] no mobile fica estranho também
  - [x] na head da tabela, está esquisito o "Categoria" tão perto da borda esquerda
  - [x] remover o buscar investimentos (ou implementar de vez, onde o usuário pode filtrar dentro dos resultados)
    - [x] tem que ver a utilidade e se for implementar, será num momento diferente
  - [ x] alinhar os títulos das colunas com os valores, os valores numéricos, provavelmente alinhar à direita
- [x] Modal de Gerenciar dados
  - [x] o modal deve se fechar depois que o usuário exporta os dados ou faz o upload de um arquivo
  - [x] traduzir os textos que estão em inglês no componente de importar arquivo
  - [x] arrumar um texto melhor para o subtitulo do modal, não precisa ser técnico

#### Melhorias

- [ ] Aba de metas
  - [ ] ver se faz sentido ter o botão Cancelar, porque não sei o que ele faz no momento
    - [ ] talvez tenho que ver se seria uma boa ele resetar para o estado anterior, já que o que temos salvo no localStorage, não é alterado a cada mudança dos ranges, certo? (melhoria)
  - [ ] colocar um texto mais explicativo sobre as metas, o que significam e porque (por mais que seja óbvio)
