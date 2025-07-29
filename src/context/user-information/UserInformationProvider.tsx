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
import { LOCAL_STORAGE_PREFIX } from '@/contants/user-data';
import { useGetAssetsQuotes } from '@/queries/useGetAssetsQuotes';

export function UserInformationProvider(props: React.PropsWithChildren) {
  const [userObjectives, setUserObjectives] = React.useState<UserObjectives>();
  const [userAssets, setUserAssets] = React.useState<Array<Asset>>([]);
  const [userSuggestions, setUserSuggestions] = React.useState<
    Array<Suggestion>
  >([]);
  const [investmentSuggestion, setInvestmentSuggestions] = React.useState<
    Array<InvestmentData>
  >([]);

  const quoteQueries = useGetAssetsQuotes(userAssets);
  // const quotes = quoteQueries.reduce((acc, query, index) => {
  //   if (query.data) {
  //     acc[symbols[index]] = query.data;
  //   }
  //   return acc;
  // }, {} as Record<string, StockQuote>);quotes

  console.log('userObjectives', userObjectives);
  console.log('userAssets', userAssets);

  React.useEffect(() => {
    const storedUserAssets = localStorage.getItem(
      `${LOCAL_STORAGE_PREFIX}userAssets`
    );
    const storedUserObjectives = localStorage.getItem(
      `${LOCAL_STORAGE_PREFIX}userObjectives`
    );
    const storedUserSuggestions = localStorage.getItem(
      `${LOCAL_STORAGE_PREFIX}userSuggestions`
    );
    const storedInvestmentSuggestion = localStorage.getItem(
      `${LOCAL_STORAGE_PREFIX}investmentSuggestion`
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

  // React.useEffect(() => {
  //   if
  // }, [quotesData, isSuccess])

  const handleAddUserObjectives = React.useCallback((data: UserObjectives) => {
    console.log('handleAddUserObjectives data', data);
    setUserObjectives(data);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}serObjectives`,
      JSON.stringify(data)
    );
  }, []);

  const handleAddUserAsset = React.useCallback((newAsset: Asset) => {
    const updatedAssets = [...userAssets, newAsset];
    setUserAssets(updatedAssets);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}userAssets`,
      JSON.stringify(updatedAssets)
    );
  }, []);

  const handleEditUserAsset = React.useCallback((asset: Asset) => {
    const newArray = userAssets.map((a) => {
      if (a.id === asset.id) {
        return asset;
      }
      return a;
    });
    setUserAssets(newArray);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}userAssets`,
      JSON.stringify(newArray)
    );
  }, []);

  const handleRemoveUserAsset = React.useCallback((assetId: string) => {
    const updatedArr = userAssets.filter((a) => a.id !== assetId);

    setUserAssets(updatedArr);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}userAssets`,
      JSON.stringify(updatedArr)
    );
  }, []);

  const handleAddUserSuggestions = React.useCallback(
    (values: { amount: number }) => {
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
        `${LOCAL_STORAGE_PREFIX}investmentSuggestio`,
        JSON.stringify(mergedSuggestions)
      );
      setUserSuggestions(suggestions);
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}userSuggestions`,
        JSON.stringify(userSuggestions)
      );
      console.log('finalSuggestions', suggestions);
    },
    []
  );

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
