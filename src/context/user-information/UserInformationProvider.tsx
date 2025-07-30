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
import type { StockQuote } from '@/interfaces/stock-quotes';

export function UserInformationProvider(props: React.PropsWithChildren) {
  const [userObjectives, setUserObjectives] = React.useState<UserObjectives>();
  const [userAssets, setUserAssets] = React.useState<Array<Asset>>([]);
  const [userSuggestions, setUserSuggestions] = React.useState<
    Array<Suggestion>
  >([]);
  const [investmentSuggestion, setInvestmentSuggestions] = React.useState<
    Array<InvestmentData>
  >([]);
  const [usdBrlQuote, setUsdBrlQuote] = React.useState<number>();

  const quotableAssets = userAssets?.filter((a) => {
    if (
      a.category === 'stocks-br' ||
      a.category === 'fii' ||
      a.category === 'stocks-us'
    ) {
      return a;
    }
  });

  const queries = useGetAssetsQuotes(quotableAssets);

  const quotes = queries.reduce(
    (acc, query, index) => {
      const currentTicker = quotableAssets ? quotableAssets[index]?.name : '';
      if (query.data) {
        acc[currentTicker] =
          query.data.currency === 'USD'
            ? {
                ...query.data,
                price: query.data.price * (usdBrlQuote ?? 1),
              }
            : query.data;
      }
      return acc;
    },
    {} as Record<string, StockQuote>
  );

  const updatedAssets = React.useMemo(() => {
    return userAssets.map((asset) => {
      if (Object.keys(quotes).includes(asset.name)) {
        asset.currentValue = quotes[asset.name].price;
      }

      return asset;
    });
  }, [userAssets, quotes]);

  console.log('userObjectives', userObjectives);
  console.log('userAssets', userAssets);

  function handleSetUSDBRLQuote(value: { usdBrlQuote: number }) {
    const { usdBrlQuote } = value;
    setUsdBrlQuote(usdBrlQuote);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}USDBRL`,
      JSON.stringify(usdBrlQuote)
    );
  }

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

    const storedUsdBrlQuote = localStorage.getItem(
      `${LOCAL_STORAGE_PREFIX}USDBRL`
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

    if (storedUsdBrlQuote && storedUsdBrlQuote !== 'undefined') {
      console.log('storedUsdBrlQuote', storedUsdBrlQuote);
      setUsdBrlQuote(parseFloat(JSON.parse(storedUsdBrlQuote)));
    }
  }, []);

  const handleAddUserObjectives = React.useCallback((data: UserObjectives) => {
    console.log('handleAddUserObjectives data', data);
    setUserObjectives(data);
    localStorage.setItem(
      `${LOCAL_STORAGE_PREFIX}userObjectives`,
      JSON.stringify(data)
    );
  }, []);

  const handleAddUserAsset = React.useCallback(
    (newAsset: Asset) => {
      const updatedAssets = [...userAssets, newAsset];
      setUserAssets(updatedAssets);
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}userAssets`,
        JSON.stringify(updatedAssets)
      );
    },
    [userAssets]
  );

  const handleEditUserAsset = React.useCallback(
    (asset: Asset) => {
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
    },
    [userAssets]
  );

  const handleRemoveUserAsset = React.useCallback(
    (assetId: string) => {
      const updatedArr = userAssets.filter((a) => a.id !== assetId);

      setUserAssets(updatedArr);
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}userAssets`,
        JSON.stringify(updatedArr)
      );
    },
    [userAssets]
  );

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
    [userAssets, userObjectives, userSuggestions]
  );

  const { children } = props;

  const value = {
    objectives: userObjectives,
    assets: updatedAssets,
    suggestions: userSuggestions,
    investmentSuggestion,
    usdBrlQuote,
    handleAddUserObjectives,
    handleAddUserAsset,
    handleEditUserAsset,
    handleRemoveUserAsset,
    handleAddUserSuggestions,
    handleSetUSDBRLQuote,
  };
  return (
    <UserInformationContext.Provider value={value}>
      {children}
    </UserInformationContext.Provider>
  );
}
