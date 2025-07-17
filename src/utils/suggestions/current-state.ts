import type { Asset } from '@/interfaces/assets';
import type { UserObjectives } from '@/interfaces/objectives';
import type { Category } from '@/interfaces/assets';

type Suggestion = {
  assetId: string;
  assetName: string;
  suggestedAmount: number;
};

type CategorySuggestion = {
  category: Category;
  suggestedAmount: number;
  message: string;
};

export function getCurrentAssetsState(assets?: Array<Asset>) {
  const assetsByCategory = assets
    ? Object.groupBy(assets, ({ category }) => category)
    : {
        'fixed-income-us': [],
        'fixed-income-br': [],
        'stocks-br': [],
        'stocks-us': [],
        fii: [],
        crypto: [],
      };
  const initialSumByAsset = {
    'fixed-income-us': 0,
    'fixed-income-br': 0,
    'stocks-br': 0,
    'stocks-us': 0,
    fii: 0,
    crypto: 0,
  };
  const sumsByAsset = Object.entries(assetsByCategory).length
    ? Object.entries(assetsByCategory).reduce((acc, curr: any) => {
        const [category, assetArr] = curr;
        return {
          ...acc,
          [category]: assetArr?.reduce((acc: number, curr: Asset) => {
            const currentAssetValue = curr.currentValue * curr.quantity;
            return currentAssetValue + acc;
          }, 0),
        };
      }, initialSumByAsset as Record<string, number>)
    : initialSumByAsset;

  const totalLedgerValue = Object.values(sumsByAsset).reduce(
    (acc: number, curr: number) => {
      if (curr) {
        return curr ? curr + acc : acc;
      }
      return acc;
    },
    0
  );

  return { sumsByAsset, totalLedgerValue };
}

export function getSuggestions(
  newInvestment: number,
  assets: Array<Asset>,
  objectives: UserObjectives
) {
  const currentLedgerState = getCurrentAssetsState(assets);

  const newTotalValue =
    newInvestment + (currentLedgerState?.totalLedgerValue || 0);
  // aqui preciso ter acesso aos objetivos pra saber quanto que a aquela categoria precisa de
  // % em relação ao resto da carteira
  const deficits: Array<{ category: Category; value: number }> = [];

  for (const key in objectives) {
    const category = key as Category;
    const percentObjective = objectives[category] / 100;
    const targetValue = newTotalValue * percentObjective;
    const deficit = targetValue - currentLedgerState.sumsByAsset[category];

    if (deficit > 0) {
      deficits.push({ category, value: deficit });
    }
  }

  // deficits para ver o que esta underserved e ordenados (desc)
  deficits.sort((a, b) => b.value - a.value);
  console.log('deficits', deficits);

  let remainingInvestment = newInvestment;
  const allocationByCategory: Record<Category, number> = {
    'fixed-income-us': 0,
    'fixed-income-br': 0,
    'stocks-br': 0,
    'stocks-us': 0,
    fii: 0,
    crypto: 0,
  };
  const finalSuggestions: (CategorySuggestion | Suggestion)[] = [];

  // distribuicao do aporte entre as categorias com deficit
  for (const item of deficits) {
    if (remainingInvestment <= 0) break;
    const categoryValue = Math.min(item.value, remainingInvestment);
    allocationByCategory[item.category] = categoryValue;
    remainingInvestment -= categoryValue;
  }

  console.log('allocationByCategory', allocationByCategory);

  // distribuid aport entre as categorias
  for (const cat in allocationByCategory) {
    const category = cat as Category;
    const allocatedValue = allocationByCategory[category];
    const categoryAssets = assets.filter(
      (a) => a.category === category && a.grade > 0
    );

    if (categoryAssets.length === 0) {
      finalSuggestions.push({
        category,
        suggestedAmount: allocatedValue,
        message: `Sugerimos que você adicione novos ativos à categoria '${category}' para investir este valor.`,
      });
      continue; // precisa disso?
    }

    const gradeSum = categoryAssets.reduce((sum, a) => sum + a.grade, 0);

    if (gradeSum > 0) {
      for (const asset of categoryAssets) {
        const weight = asset.grade / gradeSum;
        const suggestedAmount = allocatedValue * weight;
        finalSuggestions.push({
          assetId: asset.id,
          assetName: asset.name,
          suggestedAmount: parseFloat(suggestedAmount.toFixed(2)),
        });
      }
    }
  }

  return finalSuggestions;
}
