import * as React from 'react';

import type {
  Asset,
  UserObjectives,
  Suggestion,
  InvestmentData,
} from '@/interfaces';
import { UserInformationContext } from './UserInformationContext';
import {
  getSuggestions,
  mergeAssetsAndSuggestions,
} from '@/utils/suggestions/current-state';
export function UserInformationProvider(props: React.PropsWithChildren) {
  const [userObjectives, setUserObjectives] = React.useState<UserObjectives>();
  const [userAssets, setUserAssets] = React.useState<Array<Asset>>([]);
  const [userSuggestions, setUserSuggestions] = React.useState<
    Array<Suggestion>
  >([]);
  const [investmentSuggestion, setInvestmentSuggestions] = React.useState<
    Array<InvestmentData>
  >([]);

  console.log('userObjectives', userObjectives);
  console.log('userAssets', userAssets);

  React.useEffect(() => {
    const storedUserAssets = localStorage.getItem('userAssets');
    const storedUserObjectives = localStorage.getItem('userObjectives');
    const storedUserSuggestions = localStorage.getItem('userSuggestions');
    const storedInvestmentSuggestion = localStorage.getItem(
      'investmentSuggestion'
    );

    if (storedUserAssets && storedUserAssets !== 'undefined') {
      setUserAssets(JSON.parse(storedUserAssets));
    }

    if (storedUserObjectives && storedUserObjectives !== 'undefined') {
      setUserObjectives(JSON.parse(storedUserObjectives));
    }

    if (
      storedInvestmentSuggestion &&
      storedInvestmentSuggestion !== 'undefined'
    ) {
      setInvestmentSuggestions(JSON.parse(storedInvestmentSuggestion));
    }

    if (storedUserSuggestions && storedUserSuggestions !== 'undefined') {
      setUserSuggestions(JSON.parse(storedUserSuggestions));
    }
  }, []);

  // TODO: ver se é uma boa colocar esses métodos em um useCallback
  function handleAddUserObjectives(data: UserObjectives) {
    console.log('handleAddUserObjectives data', data);
    setUserObjectives(data);
    localStorage.setItem('userObjectives', JSON.stringify(data));
  }

  function handleAddUserAsset(newAsset: Asset) {
    const updatedAssets = [...userAssets, newAsset];
    setUserAssets(updatedAssets);
    localStorage.setItem('userAssets', JSON.stringify(updatedAssets));
  }

  function handleEditUserAsset(asset: Asset) {
    const newArray = userAssets.map((a) => {
      if (a.id === asset.id) {
        return asset;
      }
      return a;
    });
    setUserAssets(newArray);
    localStorage.setItem('userAssets', JSON.stringify(newArray));
  }

  function handleRemoveUserAsset(assetId: string) {
    const updatedArr = userAssets.filter((a) => a.id !== assetId);

    setUserAssets(updatedArr);
    localStorage.setItem('userAssets', JSON.stringify(updatedArr));
  }

  function handleAddUserSuggestions(values: { amount: number }) {
    const suggestions =
      userAssets && userObjectives
        ? getSuggestions(values.amount, userAssets, userObjectives)
        : [];
    const suggestionRuns = [];
    suggestionRuns.push(suggestions);

    console.log('suggestionRuns', suggestionRuns);
    const mergedSuggestions = mergeAssetsAndSuggestions(
      userAssets,
      suggestions
    );
    console.log(
      'handleAddUserSuggestions => mergedSuggestions',
      mergedSuggestions
    );
    setInvestmentSuggestions(mergedSuggestions);
    localStorage.setItem(
      'investmentSuggestion',
      JSON.stringify(mergedSuggestions)
    );
    setUserSuggestions(suggestions);
    localStorage.setItem('userSuggestions', JSON.stringify(userSuggestions));
    console.log('finalSuggestions', suggestions);
  }

  const { children } = props;

  const value = {
    objectives: userObjectives,
    assets: userAssets,
    suggestions: userSuggestions,
    investmentSuggestion,
    handleAddUserObjectives,
    handleAddUserAsset,
    handleEditUserAsset,
    handleRemoveUserAsset,
    handleAddUserSuggestions,
  };
  return (
    <UserInformationContext.Provider value={value}>
      {children}
    </UserInformationContext.Provider>
  );
}
