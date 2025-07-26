import type { Asset } from '@/interfaces';

const BRAPI_TOKEN = import.meta.env.VITE_BRAPI_API_KEY;

export async function getUserAssetsQuotes(assets: Array<Asset>) {
  const quotableAssets = ['stocks-br', 'stocks-us', 'fii', 'crypto'];
  const quotes = [];
  for (const asset of assets) {
    const category = asset.category;
    if (quotableAssets.includes(category)) {
      let symbol = asset.name;
      if (category === 'fii' || category === 'stocks-br') {
        // symbol += '.SA';
        const service_url = import.meta.env.VITE_BRAPI_BASE_URL;
        const response = await fetch(
          `${service_url}/quote/${symbol}?token=${BRAPI_TOKEN}`
        );
        // const response = await fetch(
        //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=qualquercoisa`
        // );
        const data = await response.json();
        // const assetPrice =
        console.log('data', data);
      }
    }
  }
}

export async function getSingleTickerQuote(asset: Asset) {
  const quotableAssets = ['stocks-br', 'stocks-us', 'fii', 'crypto'];
  const assetCategory = asset.category;
  if (quotableAssets.includes(assetCategory)) {
    let symbol = asset.name;
    if (assetCategory === 'fii' || assetCategory === 'stocks-br') {
      // symbol += '.SA';
      const service_url = import.meta.env.VITE_BRAPI_BASE_URL;
      const response = await fetch(
        `${service_url}/quote/${symbol}?token=${BRAPI_TOKEN}`
      );
      // const response = await fetch(
      //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=qualquercoisa`
      // );
      return await response.json();
    }
  }
  return asset.currentValue;
}
