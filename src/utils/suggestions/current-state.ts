import type { Asset, Category, UserObjectives, Suggestion } from '@/interfaces';

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
  const finalSuggestions: Suggestion[] = [];

  // distribuicao do aporte entre as categorias com deficit
  for (const item of deficits) {
    if (remainingInvestment <= 0) break;
    const categoryValue = Math.min(item.value, remainingInvestment);
    const hasAssetsForCurrentCategory = assets.find(
      (asset) => asset.category === item.category
    );
    // apenas considera aporte se tiver asset da categoria
    if (hasAssetsForCurrentCategory) {
      allocationByCategory[item.category] = categoryValue;
      remainingInvestment -= categoryValue;
    }
  }

  console.log('allocationByCategory', allocationByCategory);

  // distribuir aporte entre as categorias
  for (const cat in allocationByCategory) {
    const category = cat as Category;
    const allocatedValue = allocationByCategory[category];
    const categoryAssets = assets.filter(
      (a) => a.category === category && a.grade > 0
    );

    const gradeSum = categoryAssets.reduce((sum, a) => sum + a.grade, 0);

    if (gradeSum > 0) {
      for (const asset of categoryAssets) {
        const buyAmountForm = checkCategoryUnitSituation(asset.category);
        const weight = asset.grade / gradeSum;
        const suggestedAmount = allocatedValue * weight;
        const valueSuggestedAmount = getSuggestedAmount(
          buyAmountForm,
          suggestedAmount,
          asset
        );
        finalSuggestions.push({
          assetId: asset.id,
          assetName: asset.name,
          suggestedAmount: valueSuggestedAmount,
        });
      }
    }
  }

  return finalSuggestions.filter((s) => {
    if (typeof s.suggestedAmount === 'number') {
      return s.suggestedAmount > 0;
    }
    if (Object.hasOwn(s.suggestedAmount, 'amountToInvest')) {
      return s.suggestedAmount.amountToInvest > 0;
    }
  });
}

function checkCategoryUnitSituation(category: Category) {
  switch (category) {
    case 'crypto':
      return 'fraction';
    case 'fii':
      return 'unit';
    case 'stocks-br':
      return 'unit';
    case 'stocks-us':
      return 'fraction';
    default:
      return 'none';
  }
}

function getSuggestedAmount(
  type: string,
  suggestedAmountForAsset: number,
  asset: Asset
): { quantity: number; amountToInvest: number } {
  const assetCurrentValue = asset.currentValue;
  if (type === 'fraction') {
    const quantity = parseFloat(
      (suggestedAmountForAsset / assetCurrentValue).toFixed(2)
    );
    const amountBasedOnQuantity = quantity * assetCurrentValue;
    return {
      quantity,
      amountToInvest: amountBasedOnQuantity,
    };
  }

  if (type === 'unit') {
    const quantity = parseFloat(
      Math.floor(suggestedAmountForAsset / assetCurrentValue).toFixed(2)
    );
    const amountBasedOnQuantity = quantity * assetCurrentValue;
    return {
      quantity,
      amountToInvest: amountBasedOnQuantity,
    };
  }
  return { quantity: 1, amountToInvest: suggestedAmountForAsset };
}

export function mergeAssetsAndSuggestions(
  assets: Array<Asset>,
  suggestions: Array<Suggestion>
) {
  const finalMergedData = [];
  for (const suggestion of suggestions) {
    const currAsset = assets.find((a) => a.id === suggestion.assetId);
    console.log('suggestions', suggestion);
    if (currAsset) {
      const dataPoint = {
        category: currAsset.category,
        ticker: currAsset.name,
        currentAmount: currAsset.quantity * currAsset.currentValue,
        currentPrice: currAsset.currentValue,
        grade: currAsset.grade,
        suggestedInvestimentAmount: suggestion.suggestedAmount.amountToInvest,
        suggestedUnitsAmount: suggestion.suggestedAmount.quantity,
      };

      finalMergedData.push(dataPoint);
    }
  }
  return finalMergedData;
}
