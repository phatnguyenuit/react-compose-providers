import React, { useContext } from 'react';

interface ThemeContextValue {
  theme: Record<string, any>;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps extends ThemeContextValue, React.PropsWithChildren { }

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <p>This is inside ThemeProvider!</p>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const contextValue = useContext(ThemeContext);

  if (!contextValue) {
    throw new Error('useTheme should be called within ThemeContext!');
  }

  return contextValue;
};