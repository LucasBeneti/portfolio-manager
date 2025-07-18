// As interfaces permanecem as mesmas
export type CategoriaAtivo =
  | 'AcoesNacionais'
  | 'AcoesInternacionais'
  | 'FIIs'
  | 'RendaFixa'
  | 'Crypto';

export interface Ativo {
  id: string;
  nome: string;
  categoria: CategoriaAtivo;
  quantidade: number;
  valorAtualPorUnidade: number;
  notaConfianca: number;
}

export interface Carteira {
  ativos: Ativo[];
  alocacaoDesejada: Record<CategoriaAtivo, number>;
}

export interface SugestaoFinal {
  ativoId: string;
  nomeAtivo: string;
  categoria: CategoriaAtivo;
  valorSugeridoFinal: number; // O valor monetário real a ser gasto
  quantidadeASerComprada: number; // A quantidade de cotas/frações
}

/**
 * Gera sugestões de compra usando uma estratégia de múltiplas passadas para maximizar o uso do aporte.
 */
export function gerarSugestoesMultiPass(
  carteira: Carteira,
  valorAporte: number
): SugestaoFinal[] {
  // --- PASSO 1: Calcular estado atual e déficits (ignorando categorias vazias) ---
  const valorTotalAtual = carteira.ativos.reduce(
    (sum, ativo) => sum + ativo.quantidade * ativo.valorAtualPorUnidade,
    0
  );
  const novoValorTotal = valorTotalAtual + valorAporte;

  const valoresAtuaisPorCategoria: Record<string, number> = {};
  carteira.ativos.forEach((ativo) => {
    if (!valoresAtuaisPorCategoria[ativo.categoria])
      valoresAtuaisPorCategoria[ativo.categoria] = 0;
    valoresAtuaisPorCategoria[ativo.categoria] +=
      ativo.quantidade * ativo.valorAtualPorUnidade;
  });

  const deficits: { categoria: CategoriaAtivo; valor: number }[] = [];
  for (const key in carteira.alocacaoDesejada) {
    const categoria = key as CategoriaAtivo;
    const temAtivosNaCategoria = carteira.ativos.some(
      (a) => a.categoria === categoria
    );

    if (temAtivosNaCategoria) {
      const valorAtualCategoria = valoresAtuaisPorCategoria[categoria] || 0;
      const valorAlvo = novoValorTotal * carteira.alocacaoDesejada[categoria];
      const deficit = valorAlvo - valorAtualCategoria;
      if (deficit > 0) {
        deficits.push({ categoria, valor: deficit });
      }
    }
  }

  deficits.sort((a, b) => b.valor - a.valor);

  // --- PASSO 2: PRIMEIRA PASSADA - Alocação Principal ---
  let aporteRestante = valorAporte;
  const alocacaoPorCategoria: Record<string, number> = {};

  for (const item of deficits) {
    if (aporteRestante <= 0) break;
    const valorParaCategoria = Math.min(item.valor, aporteRestante);
    alocacaoPorCategoria[item.categoria] = valorParaCategoria;
    aporteRestante -= valorParaCategoria;
  }

  const sugestoesMap = new Map<string, SugestaoFinal>();
  let totalAlocadoNaPrimeiraPassada = 0;

  for (const cat in alocacaoPorCategoria) {
    const categoria = cat as CategoriaAtivo;
    const valorAlocadoCategoria = alocacaoPorCategoria[categoria];
    const ativosDaCategoria = carteira.ativos.filter(
      (a) => a.categoria === categoria && a.notaConfianca > 0
    );
    const somaNotasConfianca = ativosDaCategoria.reduce(
      (sum, a) => sum + a.notaConfianca,
      0
    );

    if (somaNotasConfianca > 0) {
      for (const ativo of ativosDaCategoria) {
        const valorSugeridoInicial =
          valorAlocadoCategoria * (ativo.notaConfianca / somaNotasConfianca);
        let sugestao: SugestaoFinal;

        switch (ativo.categoria) {
          case 'AcoesNacionais':
          case 'FIIs': {
            const quantidade = Math.floor(
              valorSugeridoInicial / ativo.valorAtualPorUnidade
            );
            sugestao = {
              ativoId: ativo.id,
              nomeAtivo: ativo.nome,
              categoria: ativo.categoria,
              quantidadeASerComprada: quantidade,
              valorSugeridoFinal: quantidade * ativo.valorAtualPorUnidade,
            };
            break;
          }
          case 'AcoesInternacionais':
          case 'Crypto': {
            const quantidade =
              valorSugeridoInicial / ativo.valorAtualPorUnidade;
            sugestao = {
              ativoId: ativo.id,
              nomeAtivo: ativo.nome,
              categoria: ativo.categoria,
              quantidadeASerComprada: quantidade,
              valorSugeridoFinal: valorSugeridoInicial,
            };
            break;
          }
          case 'RendaFixa': {
            sugestao = {
              ativoId: ativo.id,
              nomeAtivo: ativo.nome,
              categoria: ativo.categoria,
              quantidadeASerComprada: 1, // Conforme a regra, a quantidade é sempre 1
              valorSugeridoFinal: valorSugeridoInicial,
            };
            break;
          }
        }
        sugestoesMap.set(ativo.id, sugestao);
        totalAlocadoNaPrimeiraPassada += sugestao.valorSugeridoFinal;
      }
    }
  }

  // --- PASSO 3: SEGUNDA PASSADA - Redistribuição da Sobra (Lógica Cascata) ---
  const sobra = valorAporte - totalAlocadoNaPrimeiraPassada;

  if (sobra > 0.01) {
    // Apenas redistribui se a sobra for significativa
    let sobraRestante = sobra;

    // Percorre as categorias na ordem de maior déficit (a mesma ordem da primeira passada)
    for (const itemDeficit of deficits) {
      if (sobraRestante < 0.01) break;

      const categoriaAtual = itemDeficit.categoria;

      // Pega os ativos dessa categoria que já receberam uma sugestão inicial,
      // e os ordena pela maior nota de confiança, para priorizá-los.
      const ativosSugeridosDaCategoria = Array.from(sugestoesMap.values())
        .filter((s) => s.categoria === categoriaAtual)
        .map((sugestao) => ({
          // Mapeia para um objeto com a sugestão e a nota de confiança
          sugestao,
          notaConfianca:
            carteira.ativos.find((a) => a.id === sugestao.ativoId)
              ?.notaConfianca || 0,
        }))
        .sort((a, b) => b.notaConfianca - a.notaConfianca);

      for (const { sugestao } of ativosSugeridosDaCategoria) {
        if (sobraRestante < 0.01) break;

        const ativoOriginal = carteira.ativos.find(
          (a) => a.id === sugestao.ativoId
        )!;
        const precoUnitario = ativoOriginal.valorAtualPorUnidade;

        switch (sugestao.categoria) {
          case 'AcoesNacionais':
          case 'FIIs': {
            // Tenta comprar mais unidades inteiras com a sobra
            if (sobraRestante >= precoUnitario) {
              const unidadesAdicionais = Math.floor(
                sobraRestante / precoUnitario
              );
              const custoAdicional = unidadesAdicionais * precoUnitario;

              // Atualiza a sugestão existente no Map
              sugestao.quantidadeASerComprada += unidadesAdicionais;
              sugestao.valorSugeridoFinal += custoAdicional;
              sobraRestante -= custoAdicional;
            }
            break;
          }
          case 'AcoesInternacionais':
          case 'Crypto':
          case 'RendaFixa': {
            // Ativos flexíveis podem absorver o restante da sobra de uma vez.
            // Alocamos toda a sobra restante e encerramos a distribuição.
            const valorExtra = sobraRestante;
            sugestao.valorSugeridoFinal += valorExtra;

            if (sugestao.categoria !== 'RendaFixa') {
              sugestao.quantidadeASerComprada =
                sugestao.valorSugeridoFinal / precoUnitario;
            }

            sobraRestante = 0;
            break;
          }
        }
      }
    }
  }

  // Arredonda os valores finais para 2 casas decimais e retorna a lista
  const resultadoFinal = Array.from(sugestoesMap.values()).map((s) => ({
    ...s,
    valorSugeridoFinal: parseFloat(s.valorSugeridoFinal.toFixed(2)),
  }));

  return resultadoFinal.filter((s) => s.valorSugeridoFinal > 0); // Retorna apenas sugestões com valor
}
