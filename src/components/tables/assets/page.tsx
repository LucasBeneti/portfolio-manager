import * as React from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useUserInformation } from '@/context/user-information';
import { useGetAssetsQuotes } from '@/queries/useGetAssetsQuotes';

export default function AssetsTable() {
  const { assets } = useUserInformation();
  const quotes = useGetAssetsQuotes(assets);

  const updatedAssets = React.useMemo(() => {
    if (!assets) return [];

    return assets.map((a) => {
      if (a.category === 'stocks-br') {
        const assetQuoteData = quotes.find((q) => q.data?.ticker === a.name);

        if (assetQuoteData) {
          a.currentValue = assetQuoteData?.data.price;
        }
      }

      return a;
    });
  }, [assets, quotes]);

  return (
    <div className='dark dark:text-white container mx-auto py-4'>
      <DataTable columns={columns} data={updatedAssets || []} />
    </div>
  );
}
