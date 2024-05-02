import React, { useContext } from 'react';

interface StoreContextValue {
  store: Record<string, any>;
}

const StoreContext = React.createContext<StoreContextValue | null>(null);

interface StoreProviderProps extends StoreContextValue, React.PropsWithChildren { }

export function StoreProvider({ store, children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={{ store }}>
      <p>This is inside StoreProvider!</p>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const contextValue = useContext(StoreContext);

  if (!contextValue) {
    throw new Error('useStore should be called within StoreContext!');
  }

  return contextValue;
};