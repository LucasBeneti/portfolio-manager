import { useContext } from 'react';
import { UserInformationContext } from './UserInformationContext';

export function useUserInformation() {
  const context = useContext(UserInformationContext);
  if (!context)
    throw new Error(
      'To use the useUserInformation hook, the component should be a children from the UserInformationProvider.'
    );
  return context;
}
