import { getSingleTickerQuote } from '@/utils/assets-quotes/quotes';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetAssetQuote(asset: string) {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ['getAssetQuotes', asset],
    queryFn: getSingleTickerQuote(asset),
  });
}
