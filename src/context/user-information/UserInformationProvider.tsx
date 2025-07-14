import * as React from 'react';

import type { Asset } from '@/interfaces/assets';
import type { UserObjectives } from '@/interfaces/objectives';
import { UserInformationContext } from './UserInformationContext';

export function UserInformationProvider(props: React.PropsWithChildren) {
  const [userObjectives, setUserObjectives] = React.useState<UserObjectives>();
  const [userAssets, setUserAssets] = React.useState<Array<Asset>>([]);

  React.useEffect(() => {
    const storedUserAssets = localStorage.getItem('userAssets');
    const storedUserObjectives = localStorage.getItem('userObjectives');

    if (storedUserAssets && storedUserAssets !== 'undefined') {
      setUserAssets(JSON.parse(storedUserAssets));
    }

    if (storedUserObjectives && storedUserObjectives !== 'undefined') {
      setUserObjectives(JSON.parse(storedUserObjectives));
    }
  }, []);

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

  const { children } = props;

  const value = {
    objectives: userObjectives,
    assets: userAssets,
    handleAddUserObjectives,
    handleAddUserAsset,
  };
  return (
    <UserInformationContext.Provider value={value}>
      {children}
    </UserInformationContext.Provider>
  );
}
