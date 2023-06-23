import React, { ReactNode } from 'react';
import {
  ThemeContextProvider,
  ThemeContextProviderProps
} from './themeContext';

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
      {children}
    </ThemeContextProvider>
  );
};
