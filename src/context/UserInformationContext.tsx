import { createContext, useContext, type PropsWithChildren } from "react";

type UserInformationContextValue = {
  objectives?: Record<string, number>;
  assets?: Record<string, number>;
};

const UserInformationContext = createContext<
  UserInformationContextValue | undefined
>(undefined);

export function UserInformationProvider(props: PropsWithChildren) {
  const { children } = props;

  const value = {};
  return (
    <UserInformationContext.Provider value={value}>
      {children}
    </UserInformationContext.Provider>
  );
}
