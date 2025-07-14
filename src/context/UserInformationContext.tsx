import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { type UserObjectives } from '@/interfaces/objectives';

type UserInformationContextValue = {
  objectives?: UserObjectives;
  assets?: Record<string, number>;
  handleAddUserObjectives: (d: UserObjectives) => void;
  handleAddUserAsset: (d: any) => void;
};

const UserInformationContext = createContext<
  UserInformationContextValue | undefined
>(undefined);

export function UserInformationProvider(props: PropsWithChildren) {
  const [userObjectives, setUserObjectives] = useState<UserObjectives>();
  const [userAssets, setUserAssets] = useState();

  useEffect(() => {
    const storedUserAssets = localStorage.getItem('userAssets');
    const storedUserObjectives = localStorage.getItem('userObjectives');
    if (storedUserAssets && storedUserAssets !== 'undefined') {
      setUserAssets(JSON.parse(storedUserAssets));
    }

    console.log(
      'first useEffect => storedUserObjectives',
      storedUserObjectives
    );

    if (storedUserObjectives && storedUserObjectives !== 'undefined') {
      setUserObjectives(JSON.parse(storedUserObjectives));
    }
  }, []);

  function handleAddUserObjectives(data: UserObjectives) {
    console.log('handleAddUserObjectives data', data);
    setUserObjectives(data);
    localStorage.setItem('userObjectives', JSON.stringify(data));
  }

  function handleAddUserAsset(data: any) {
    setUserAssets(data);
    localStorage.setItem('userAssets', JSON.stringify(userAssets));
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

export function useUserInformation() {
  const context = useContext(UserInformationContext);
  if (!context)
    throw new Error(
      'To use the useUserInformation hook, the component should be a children from the UserInformationProvider.'
    );
  return context;
}
