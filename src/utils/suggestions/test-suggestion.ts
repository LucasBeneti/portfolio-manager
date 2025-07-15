interface Sugestao {
  ativoId: string;
  nomeAtivo: string;
  valorSugerido: number;
}

interface SugestaoCategoria {
  categoria: CategoriaAtivo;
  valorSugerido: number;
  mensagem: string;
}

function gerarSugestoes(
  carteira: Carteira,
  valorAporte: number
): (Sugestao | SugestaoCategoria)[] {
  // --- PASSO 2: Calcular estado atual ---
  const valorTotalAtual = carteira.ativos.reduce(
    (sum, ativo) => sum + ativo.quantidade * ativo.valorAtualPorUnidade,
    0
  );

  const valoresAtuaisPorCategoria: Record<CategoriaAtivo, number> = {
    AcoesNacionais: 0,
    AcoesInternacionais: 0,
    FIIs: 0,
    RendaFixa: 0,
  };

  for (const ativo of carteira.ativos) {
    valoresAtuaisPorCategoria[ativo.categoria] +=
      ativo.quantidade * ativo.valorAtualPorUnidade;
  }

  // --- PASSO 3: Determinar necessidade ---
  const novoValorTotal = valorTotalAtual + valorAporte;
  const deficits: { categoria: CategoriaAtivo; valor: number }[] = [];

  for (const key in carteira.alocacaoDesejada) {
    const categoria = key as CategoriaAtivo;
    const valorAlvo = novoValorTotal * carteira.alocacaoDesejada[categoria];
    const deficit = valorAlvo - valoresAtuaisPorCategoria[categoria];

    if (deficit > 0) {
      deficits.push({ categoria, valor: deficit });
    }
  }

  // Ordenar por maior necessidade
  deficits.sort((a, b) => b.valor - a.valor);

  // --- PASSO 4: Gerar sugestões ---
  let aporteRestante = valorAporte;
  const alocacaoPorCategoria: Record<string, number> = {};
  const sugestoesFinais: (Sugestao | SugestaoCategoria)[] = [];

  // Distribuir o aporte entre as categorias
  for (const item of deficits) {
    if (aporteRestante <= 0) break;
    const valorParaCategoria = Math.min(item.valor, aporteRestante);
    alocacaoPorCategoria[item.categoria] = valorParaCategoria;
    aporteRestante -= valorParaCategoria;
  }

  // Distribuir o valor de cada categoria entre seus ativos
  for (const cat in alocacaoPorCategoria) {
    const categoria = cat as CategoriaAtivo;
    const valorAlocado = alocacaoPorCategoria[categoria];
    const ativosDaCategoria = carteira.ativos.filter(
      (a) => a.categoria === categoria && a.notaConfianca > 0
    );

    if (ativosDaCategoria.length === 0) {
      sugestoesFinais.push({
        categoria: categoria,
        valorSugerido: valorAlocado,
        mensagem: `Sugerimos que você adicione novos ativos à categoria '${categoria}' para investir este valor.`,
      });
      continue;
    }

    const somaNotasConfianca = ativosDaCategoria.reduce(
      (sum, a) => sum + a.notaConfianca,
      0
    );

    if (somaNotasConfianca > 0) {
      for (const ativo of ativosDaCategoria) {
        const peso = ativo.notaConfianca / somaNotasConfianca;
        const valorSugerido = valorAlocado * peso;
        sugestoesFinais.push({
          ativoId: ativo.id,
          nomeAtivo: ativo.nome,
          valorSugerido: parseFloat(valorSugerido.toFixed(2)), // Arredonda para 2 casas decimais
        });
      }
    }
  }

  return sugestoesFinais;
}
