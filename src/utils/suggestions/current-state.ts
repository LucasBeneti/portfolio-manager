import type { Asset } from '@/interfaces/assets';

export function getCurrentAssetsState(assets?: Array<Asset>) {
  const assetsByCategory = assets
    ? Object.groupBy(assets, ({ category }) => category)
    : {};

  const sumsByAsset = Object.entries(assetsByCategory).length
    ? Object.entries(assetsByCategory).reduce((acc, curr: any) => {
        const [category, assetArr] = curr;
        console.log('curr', curr);
        return {
          ...acc,
          [category]: assetArr?.reduce((acc: number, curr: Asset) => {
            return acc + curr.currentValue;
          }, 0),
        };
      }, {} as Partial<Record<string, Asset[]>>)
    : {};

  if (assets) {
    return sumsByAsset;
  }
}
