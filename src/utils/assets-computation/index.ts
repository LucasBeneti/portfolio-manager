import type { Asset, Category } from '@/interfaces';

type ComputedCategoryData = {
  totalAmount: number;
};
type ComputedUserAssets = Record<Category, ComputedCategoryData>;

export function computedUserAssets(assets?: Asset[]): ComputedUserAssets {
  if (!assets) {
    return {
      'fixed-income-br': {
        totalAmount: 0,
      },
      'stocks-br': {
        totalAmount: 0,
      },
      'stocks-us': {
        totalAmount: 0,
      },
      fii: {
        totalAmount: 0,
      },
      crypto: {
        totalAmount: 0,
      },
    };
  }
  const categorygroup = Object.groupBy(assets, (entries) => {
    return entries.category;
  });

  const amountByCategory = Object.entries(categorygroup).reduce((acc, curr) => {
    const [category, assets] = curr;

    const totalInvestmentInCategory = assets.reduce((acc, curr) => {
      const investmentValue =
        curr.category === 'fixed-income-br'
          ? curr.currentValue
          : curr.currentValue * curr.quantity;

      const total = acc + investmentValue;
      return total;
    }, 0);

    return {
      ...acc,
      [category]: { totalAmount: totalInvestmentInCategory },
    };
  }, {} as ComputedUserAssets);

  return amountByCategory;
}

export function convertComputedAssetsToChart(compAssets: ComputedUserAssets) {
  return Object.entries(compAssets).map((investments) => {
    const [category, { totalAmount }] = investments;
    return {
      investment: category,
      amountInvested: totalAmount,
      fill: `var(--chart-${category})`,
    };
  });
}
