import React, { ReactNode } from 'react';
import {
  ThemeContextProvider,
  ThemeContextProviderProps
} from './themeContext';
import { NavContextProvider } from './navContext';

type GeneralContextProviderProps = {
  children: ReactNode;
  cookieTheme: ThemeContextProviderProps['cookieTheme'];
};

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({
  children,
  cookieTheme
}) => {
  return (
    <ThemeContextProvider cookieTheme={cookieTheme}>
      <NavContextProvider>{children}</NavContextProvider>
    </ThemeContextProvider>
  );
};
