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
- [ ] fazer um bug bash para levantar tudo que tem de bug na aplicação, testando desktop e mobile

#### Bugs e implementações para fazer

- [ ] remover logs de debug
- [ ] Aba de ativos
  - [ ] Adicionar ativo
  - [ ] quando a categoria for renda fixa
    - [ ] fixar a quantidade em 1 e dar um disable no campo
  - [ ] remover renda fixa internacional, por ser um caso muito específico
  - [ ] na categoria, mudar o valor de FII para Fundos Imobiliários
  - [ ] na Nota, limitar em um valor máximo, tipo 10
  - [ ] arrumar o subtítulo "Adicione aqui um novo ativo para a sua carteira. Dependendo da nota, ele poderá ser considerado em um novo aporte." do modal, onde a segunda frase deve ser: "Se a nota for diferente de zero, ele será considerado para um novo aporte."
  - [ ] no menu contextual das linhas, retirar o "Ações", pode confundir
  - [ ] aumentar o tamanho do "Seus ativos
  - [ ] fazer um modal de confirmar exclusão de ativo na tabela
    - [ ] essa ação deve ser cancelável para evitar dor de cabeça
- [ ] Aba de metas
  - [ ] ver se faz sentido ter o botão Cancelar, porque não sei o que ele faz no momento
    - [ ] talvez tenho que ver se seria uma boa ele resetar para o estado anterior, já que o que temos salvo no localStorage, não é alterado a cada mudança dos ranges, certo?
  - [ ] colocar um texto mais explicativo sobre as metas, o que significam e porque (por mais que seja óbvio) limitar em 100%
  - [ ] não permitir que o usuário salve o "Minhas metas" se o total não for 100%
- [ ] Aba novo aporte
  - [ ] arrumar botão de Calcular Sugestão para um novo aport em telas desktop
    - [ ] no mobile fica estranho também
  - [ ] na head da tabela, está esquisito o "Categoria" tão perto da borda esquerda
  - [ ] remover o buscar investimentos (ou implementar de vez, onde o usuário pode filtrar dentro dos resultados)
    - [ ] tem que ver a utilidade e se for implementar, será num momento diferente
  - [ ] alinhar os títulos das colunas com os valores, os valores numéricos, provavelmente alinhar à direita
- [ ] Modal de Gerenciar dados
  - [ ] o modal deve se fechar depois que o usuário exporta os dados ou faz o upload de um arquivo
  - [ ] traduzir os textos que estão em inglês no componente de importar arquivo
  - [ ] arrumar um texto melhor para o subtitulo do modal, não precisa ser técnico
