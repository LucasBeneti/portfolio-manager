import { useUserInformation } from '@/context/user-information';
import { getSuggestions } from '@/utils/suggestions/current-state';
import type { Suggestion } from '@/interfaces/new-investments';
import * as React from 'react';

export function useNewInvestment() {
  const { assets, objectives } = useUserInformation();
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  function onNewInvestmentSubmit(values: { amount: number }) {
    console.log({ amount: values.amount }); // This will be a number, e.g., 1234.56
    const suggestions =
      assets && objectives ? getSuggestions(5000, assets, objectives) : [];
    setSuggestions(suggestions);
    console.log('finalSuggestions', suggestions);
  }
  return { onNewInvestmentSubmit, suggestions };
}
