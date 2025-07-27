import { useGetAssetsQuotes } from '@/queries/useGetAssetsQuotes';

export function useAssetsQuotes() {
  const quotes = useGetAssetsQuotes();
  // const formattedQuotes = quotes.reduce((acc, curr) => {
  //   acc[curr.ticker as string] =
  // }, {}: { [keya as string]: string})
  // return {
  //   quotes:
  // }
}
