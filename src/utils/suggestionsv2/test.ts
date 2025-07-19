// types/index.ts

/**
 * Define as categorias de ativos financeiras suportadas.
 */
export type Category =
  | 'fixed-income-br'
  | 'fixed-income-us'
  | 'stocks-br'
  | 'stocks-us'
  | 'fii'
  | 'crypto';

/**
 * Representa um ativo financeiro na carteira do usuário.
 */
export type Asset = {
  id: string;
  category: Category;
  name: string;
  quantity: number; // Quantidade atual que o usuário possui
  currentValue: number; // Valor unitário atual do ativo (preço por cota/ação/unidade)
  grade: number; // Nota do ativo (0 a 10), onde 0 não deve ser considerado para aporte.
};

/**
 * Define a distribuição percentual desejada para cada categoria na carteira.
 * A soma de todos os valores deve ser 1 (ou 100%).
 */
export type CategoryDistribution = Record<Category, number>;

/**
 * Representa a sugestão de aporte para um ativo específico.
 */
export type InvestmentSuggestion = {
  asset: Asset;
  suggestedAmount: number; // Valor em dinheiro a ser aportado neste ativo
  suggestedQuantity: number; // Quantidade sugerida para compra (pode ser fracionada)
};

/**
 * Representa o estado atual da carteira do usuário.
 */
export type PortfolioState = {
  totalValue: number;
  valueByCategory: Record<Category, number>;
  percentageByCategory: Record<Category, number>;
};

// utils/calculatePortfolioState.ts
/**
 * Calcula o valor total e a distribuição percentual atual da carteira.
 * @param assets Lista de ativos na carteira do usuário.
 * @returns Um objeto PortfolioState com o estado atual da carteira.
 */
function calculatePortfolioState(assets: Asset[]): PortfolioState {
  let totalValue = 0;
  const valueByCategory: Record<Category, number> = {
    'fixed-income-br': 0,
    'fixed-income-us': 0,
    'stocks-br': 0,
    'stocks-us': 0,
    fii: 0,
    crypto: 0,
  };

  assets.forEach((asset) => {
    const assetTotalValue = asset.currentValue * asset.quantity;
    totalValue += assetTotalValue;
    valueByCategory[asset.category] += assetTotalValue;
  });

  const percentageByCategory: Record<Category, number> = {
    'fixed-income-br': 0,
    'fixed-income-us': 0,
    'stocks-br': 0,
    'stocks-us': 0,
    fii: 0,
    crypto: 0,
  };

  for (const category in valueByCategory) {
    if (totalValue > 0) {
      percentageByCategory[category as Category] =
        valueByCategory[category as Category] / totalValue;
    }
  }

  return { totalValue, valueByCategory, percentageByCategory };
}

// utils/calculateCategoryGaps.ts
/**
 * Calcula o 'gap' (diferença) entre o valor atual e o valor alvo de cada categoria
 * após considerar um novo aporte.
 * @param currentPortfolioState Estado atual da carteira.
 * @param totalInvestment Valor total do aporte a ser feito.
 * @param targetDistribution Distribuição percentual desejada por categoria.
 * @returns Um mapa com o valor do gap para cada categoria.
 */
function calculateCategoryGaps(
  currentPortfolioState: PortfolioState,
  totalInvestment: number,
  targetDistribution: CategoryDistribution
): Record<Category, number> {
  const gaps: Record<Category, number> = {
    'fixed-income-br': 0,
    'fixed-income-us': 0,
    'stocks-br': 0,
    'stocks-us': 0,
    fii: 0,
    crypto: 0,
  };
  const projectedTotalPortfolioValue =
    currentPortfolioState.totalValue + totalInvestment;

  for (const category in targetDistribution) {
    const cat = category as Category;
    const targetValueForCategory =
      (targetDistribution[cat] * projectedTotalPortfolioValue) / 100; // porque no momento meus objetivos são 0 a 100
    const currentValueForCategory =
      currentPortfolioState.valueByCategory[cat] || 0;
    gaps[cat] = targetValueForCategory - currentValueForCategory;
  }
  return gaps;
}

// utils/getPurchaseDetails.ts
/**
 * Calcula a quantidade de um ativo dado um valor de investimento,
 * respeitando se a compra deve ser em unidades inteiras ou fracionadas.
 * @param asset O ativo a ser comprado.
 * @param amount O valor em dinheiro a ser investido no ativo.
 * @returns Um objeto com a quantidade comprada e o valor restante (sobra).
 */
function getPurchaseDetails(
  asset: Asset,
  amount: number
): { quantity: number; remainingAmount: number } {
  if (asset.grade === 0) {
    return { quantity: 0, remainingAmount: amount }; // Não considerar ativos com grade 0
  }

  if (asset.currentValue <= 0) {
    console.warn(
      `Ativo ${asset.name} (${asset.id}) tem valor unitário inválido (${asset.currentValue}). Não será considerado.`
    );
    return { quantity: 0, remainingAmount: amount };
  }

  const isWholeUnitCategory =
    asset.category === 'fii' || asset.category === 'stocks-br';
  // Fixed-income-br e fixed-income-us são tratados como quantidade 1,
  // mas aqui estamos calculando o investimento, então o currentValue é o "preço da unidade"

  let quantity = 0;
  let remainingAmount = 0;

  if (isWholeUnitCategory) {
    quantity = Math.floor(amount / asset.currentValue);
    remainingAmount = amount - quantity * asset.currentValue;
  } else {
    // stocks-us, crypto, fixed-income-br, fixed-income-us (tratados como frações ou valor exato)
    quantity = amount / asset.currentValue;
    remainingAmount = 0; // Não há sobra de unidade, pode ser fracionado
  }

  return { quantity, remainingAmount };
}

// services/investmentSuggester.ts
/**
 * Sugere valores de investimento para ativos com base na carteira atual do usuário,
 * nas porcentagens alvo por categoria e na nota (grade) dos ativos.
 * Prioriza categorias mais sub-representadas e, dentro delas, ativos de maior grade,
 * garantindo que ativos da mesma grade recebam o mesmo investimento.
 * @param currentAssets Lista de ativos na carteira do usuário.
 * @param totalInvestment Valor total do aporte que o usuário deseja fazer.
 * @param targetDistribution Distribuição percentual desejada por categoria.
 * @returns Uma lista de sugestões de investimento.
 */
export function suggestInvestments(
  currentAssets: Asset[],
  totalInvestment: number,
  targetDistribution: CategoryDistribution
): { suggestions: InvestmentSuggestion[]; remainingInvestmentAmount: number } {
  const suggestions: InvestmentSuggestion[] = [];
  let remainingInvestmentAmount = totalInvestment;

  // 1. Calcular o estado atual da carteira
  const portfolioState = calculatePortfolioState(currentAssets);

  // 2. Calcular os 'gaps' de cada categoria para saber onde há mais necessidade
  const categoryGaps = calculateCategoryGaps(
    portfolioState,
    totalInvestment,
    targetDistribution
  );

  // 3. Organizar os ativos, removendo os com grade 0
  const investableAssets = currentAssets.filter((asset) => asset.grade > 0);

  // Mapeia para armazenar as sugestões acumuladas por ativo
  const assetSuggestionsMap = new Map<
    string,
    { amount: number; quantity: number }
  >();

  // 4. Primeira Passagem: Alocação principal focada nos gaps das categorias
  // Ordenar categorias pelas que têm o maior 'gap' positivo (maior necessidade de aporte)
  const orderedCategories = Object.keys(categoryGaps)
    .filter((cat) => categoryGaps[cat as Category] > 0)
    .sort(
      (a, b) => categoryGaps[b as Category] - categoryGaps[a as Category]
    ) as Category[];

  console.log('iteração de remaininInvestment');
  for (const category of orderedCategories) {
    if (remainingInvestmentAmount <= 0) break;

    const assetsInThisCategory = investableAssets.filter(
      (a) => a.category === category
    );
    if (assetsInThisCategory.length === 0) continue;

    let targetAmountForCategory = Math.min(
      categoryGaps[category],
      remainingInvestmentAmount
    );
    let distributedAmountInThisCategory = 0;

    // Agrupar ativos por grade dentro da categoria e calcular a soma ponderada das grades
    const gradesMap = new Map<number, Asset[]>();
    let totalWeightedGrade = 0;
    assetsInThisCategory.forEach((asset) => {
      if (!gradesMap.has(asset.grade)) {
        gradesMap.set(asset.grade, []);
      }
      gradesMap.get(asset.grade)!.push(asset);
      totalWeightedGrade += asset.grade; // Cada ativo contribui com sua grade para o peso total
    });

    // Ordenar as grades (maior para menor)
    const sortedGrades = Array.from(gradesMap.keys()).sort((a, b) => b - a);

    for (const grade of sortedGrades) {
      if (targetAmountForCategory <= 0) break;

      const assetsWithSameGrade = gradesMap.get(grade)!;
      // Calcular o valor proporcional para este grupo de grade dentro da categoria
      const weightedPortionForGrade =
        (grade * assetsWithSameGrade.length) / totalWeightedGrade;
      let amountForThisGradeGroup =
        targetAmountForCategory * weightedPortionForGrade;

      // Distribuir igualmente entre os ativos deste grupo
      const amountPerAssetInGroup =
        amountForThisGradeGroup / assetsWithSameGrade.length;

      for (const asset of assetsWithSameGrade) {
        if (amountForThisGradeGroup <= 0) break; // Se não há mais para o grupo, pare

        let currentAmountForAsset = Math.min(
          amountPerAssetInGroup,
          amountForThisGradeGroup
        ); // Limita pelo que ainda resta para o grupo

        const { quantity, remainingAmount } = getPurchaseDetails(
          asset,
          currentAmountForAsset
        );

        // Acumula a sugestão para o ativo
        if (!assetSuggestionsMap.has(asset.id)) {
          assetSuggestionsMap.set(asset.id, { amount: 0, quantity: 0 });
        }
        const currentSuggestion = assetSuggestionsMap.get(asset.id)!;
        currentSuggestion.amount += currentAmountForAsset - remainingAmount; // Apenas o valor que realmente foi alocado sem a "sobra" da unidade
        currentSuggestion.quantity += quantity;

        distributedAmountInThisCategory +=
          currentAmountForAsset - remainingAmount;
        remainingInvestmentAmount -= currentAmountForAsset - remainingAmount;
        targetAmountForCategory -= currentAmountForAsset - remainingAmount; // Reduz o que foi distribuído da fatia da categoria

        // A sobra (remainingAmount) da unidade vai para a piscina de 'remainingInvestmentAmount' global
        remainingInvestmentAmount += remainingAmount;
      }
    }
  }

  // 5. Segunda Passagem: Otimização da Sobra
  // Priorizar ativos que aceitam frações e/ou ativos de alta grade para absorver a sobra.
  // Itere sobre os ativos novamente, dando preferência a criptos e stocks-us
  // para absorver a sobra, e depois tentando 'completar' unidades inteiras.
  // Tentar usar o restante para completar unidades inteiras de ativos de alta grade
  // const wholeUnitAssets = investableAssets
  //   .filter((a) => a.category === 'fii' || a.category === 'stocks-br')
  //   .sort((a, b) => b.grade - a.grade);

  // for (const asset of wholeUnitAssets) {
  //   if (remainingInvestmentAmount <= 0) break;

  //   const currentSuggestion = assetSuggestionsMap.get(asset.id) || {
  //     amount: 0,
  //     quantity: 0,
  //   };

  //   // Calcular quanto seria necessário para comprar a próxima unidade
  //   const neededForNextUnit =
  //     asset.currentValue - (currentSuggestion.amount % asset.currentValue);

  //   if (
  //     neededForNextUnit > 0 &&
  //     neededForNextUnit <= remainingInvestmentAmount + 0.01
  //   ) {
  //     // Adiciona uma pequena tolerância para flutuações de ponto flutuante
  //     const amountToInvest = neededForNextUnit;
  //     const { quantity, remainingAmount } = getPurchaseDetails(
  //       asset,
  //       amountToInvest
  //     );

  //     currentSuggestion.amount += amountToInvest - remainingAmount;
  //     currentSuggestion.quantity += quantity;
  //     assetSuggestionsMap.set(asset.id, currentSuggestion);

  //     remainingInvestmentAmount -= amountToInvest - remainingAmount;
  //     remainingInvestmentAmount += remainingAmount;
  //   }
  // }

  // const fractionalAssets = investableAssets
  //   .filter((a) => a.category === 'stocks-us' || a.category === 'crypto')
  //   .sort((a, b) => b.grade - a.grade); // Prioriza os de maior grade

  // for (const asset of fractionalAssets) {
  //   if (remainingInvestmentAmount <= 0) break;

  //   const currentSuggestion = assetSuggestionsMap.get(asset.id) || {
  //     amount: 0,
  //     quantity: 0,
  //   };
  //   let amountToAddToAsset = remainingInvestmentAmount; // Tentar alocar tudo que sobrou

  //   const { quantity, remainingAmount } = getPurchaseDetails(
  //     asset,
  //     amountToAddToAsset
  //   );

  //   currentSuggestion.amount += amountToAddToAsset - remainingAmount;
  //   currentSuggestion.quantity += quantity;
  //   assetSuggestionsMap.set(asset.id, currentSuggestion);

  //   remainingInvestmentAmount -= amountToAddToAsset - remainingAmount;
  //   remainingInvestmentAmount += remainingAmount; // Em teoria, para frações, remainingAmount é 0.
  // }

  // Converter o mapa de sugestões para o formato de saída final
  assetSuggestionsMap.forEach((data, assetId) => {
    const asset = currentAssets.find((a) => a.id === assetId);
    if (asset && data.amount > 0) {
      // Adicionar apenas ativos com sugestão de valor > 0
      suggestions.push({
        asset: asset,
        suggestedAmount: parseFloat(data.amount.toFixed(2)),
        suggestedQuantity: parseFloat(data.quantity.toFixed(8)), // Mais casas decimais para quantidade, especialmente para cripto
      });
    }
  });

  // Ordenar sugestões por categoria e depois por grade
  suggestions.sort((a, b) => {
    if (a.asset.category !== b.asset.category) {
      return a.asset.category.localeCompare(b.asset.category);
    }
    return b.asset.grade - a.asset.grade;
  });

  console.log(`\n### Resumo do Aporte ###`);
  console.log(`Aporte Total Inicial: R$ ${totalInvestment.toFixed(2)}`);
  console.log(
    `Valor Restante Não Alocado (Sobra): R$ ${remainingInvestmentAmount.toFixed(
      2
    )}`
  );
  if (remainingInvestmentAmount > 0.01) {
    // Se a sobra é maior que uma pequena tolerância
    console.warn(
      'Atenção: Houve um valor residual não alocado. Considere investir em ativos fracionários ou aguardar um novo aporte.'
    );
  }

  return { suggestions, remainingInvestmentAmount };
}

export function mergeAssetsAndSuggestions(suggestions: InvestmentSuggestion[]) {
  const finalMergedData = [];

  for (const suggestion of suggestions) {
    const currAsset = suggestion.asset;
    if (currAsset) {
      const dataPoint = {
        category: currAsset.category,
        ticker: currAsset.name,
        currentAmount: currAsset.quantity * currAsset.currentValue,
        currentPrice: currAsset.currentValue,
        grade: currAsset.grade,
        suggestedInvestimentAmount: suggestion.suggestedAmount,
        suggestedUnitsAmount: suggestion.suggestedQuantity,
      };

      finalMergedData.push(dataPoint);
    }
  }
  return finalMergedData;
}

// --- Exemplo de Uso ---
// main.ts (simulando o arquivo principal de execução)

// Lista de Ativos de Exemplo
const myAssets: Asset[] = [
  // Renda Fixa BR (valor fixo 1 para unidade, foco no aporte total)
  {
    id: 'CDB-001',
    category: 'fixed-income-br',
    name: 'CDB Banco Seguro',
    quantity: 1,
    currentValue: 10000,
    grade: 8,
  },
  {
    id: 'LCA-001',
    category: 'fixed-income-br',
    name: 'LCA CrediFacil',
    quantity: 1,
    currentValue: 5000,
    grade: 8,
  }, // Mesma grade
  {
    id: 'CDB-002',
    category: 'fixed-income-br',
    name: 'CDB Tesouro Mais',
    quantity: 1,
    currentValue: 7000,
    grade: 7,
  },

  // Ações BR (unidades inteiras)
  {
    id: 'PETR4',
    category: 'stocks-br',
    name: 'Petrobras PN',
    quantity: 100,
    currentValue: 30.5,
    grade: 9,
  },
  {
    id: 'ITUB3',
    category: 'stocks-br',
    name: 'Itaú Unibanco ON',
    quantity: 50,
    currentValue: 28.0,
    grade: 9,
  }, // Mesma grade
  {
    id: 'VALE3',
    category: 'stocks-br',
    name: 'Vale ON',
    quantity: 80,
    currentValue: 65.0,
    grade: 7,
  },
  {
    id: 'BBAS3',
    category: 'stocks-br',
    name: 'Banco do Brasil ON',
    quantity: 60,
    currentValue: 55.0,
    grade: 7,
  }, // Mesma grade
  {
    id: 'MGLU3',
    category: 'stocks-br',
    name: 'Magazine Luiza ON',
    quantity: 200,
    currentValue: 2.1,
    grade: 4,
  }, // Baixa grade, mas não zero

  // FII (unidades inteiras)
  {
    id: 'MXRF11',
    category: 'fii',
    name: 'Maxi Renda FII',
    quantity: 250,
    currentValue: 10.2,
    grade: 8,
  },
  {
    id: 'KNRI11',
    category: 'fii',
    name: 'Kinea Renda Imob.',
    quantity: 50,
    currentValue: 160.0,
    grade: 8,
  }, // Mesma grade
  {
    id: 'HGLG11',
    category: 'fii',
    name: 'CSHG Logística',
    quantity: 30,
    currentValue: 165.0,
    grade: 7,
  },

  // Stocks US (frações)
  {
    id: 'AAPL',
    category: 'stocks-us',
    name: 'Apple Inc.',
    quantity: 5,
    currentValue: 180.0,
    grade: 10,
  },
  {
    id: 'MSFT',
    category: 'stocks-us',
    name: 'Microsoft Corp.',
    quantity: 3,
    currentValue: 420.0,
    grade: 10,
  }, // Mesma grade
  {
    id: 'GOOGL',
    category: 'stocks-us',
    name: 'Alphabet Inc.',
    quantity: 2,
    currentValue: 170.0,
    grade: 9,
  },

  // Crypto (frações)
  {
    id: 'BTC',
    category: 'crypto',
    name: 'Bitcoin',
    quantity: 0.05,
    currentValue: 65000,
    grade: 9,
  },
  {
    id: 'ETH',
    category: 'crypto',
    name: 'Ethereum',
    quantity: 0.8,
    currentValue: 3500,
    grade: 8,
  },

  // Ativo com grade 0 (não deve ser considerado para aporte)
  {
    id: 'JPMC',
    category: 'stocks-us',
    name: 'JPMorgan Chase & Co.',
    quantity: 10,
    currentValue: 150.0,
    grade: 0,
  },
];

// Distribuição percentual desejada para a carteira
const myTargetDistribution: CategoryDistribution = {
  'fixed-income-br': 0.2, // 20%
  'fixed-income-us': 0.05, // 5% - Categoria sem ativos, pode gerar um warning ou ser ignorada
  'stocks-br': 0.25, // 25%
  'stocks-us': 0.2, // 20%
  fii: 0.15, // 15%
  crypto: 0.15, // 15%
};

const totalInvestmentAmount = 15000; // Aporte total de R$ 15.000,00

console.log('Calculando sugestões de investimento...');
const investmentSuggestions = suggestInvestments(
  myAssets,
  totalInvestmentAmount,
  myTargetDistribution
);

console.log('\n--- Sugestões de Aporte Detalhadas ---');
// if (investmentSuggestions.length === 0) {
//   console.log(
//     'Nenhuma sugestão de aporte gerada. Verifique os dados de entrada.'
//   );
// } else {
//   investmentSuggestions.forEach((suggestion) => {
//     console.log(
//       `  - ${suggestion.asset.name} (${suggestion.asset.category}, Grade: ${suggestion.asset.grade}): ` +
//         `Aportar R$ ${suggestion.suggestedAmount.toFixed(
//           2
//         )} (${suggestion.suggestedQuantity.toFixed(4)} unidades)`
//     );
//   });
// }
