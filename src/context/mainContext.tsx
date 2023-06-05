'use client';

import React, { FC, createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

import { THEME_COOKIE_NAME } from '@app/constants/cookies';

interface MainContextProps {
  lightTheme: boolean | undefined;
  toggleTheme: () => void;
}

const defaultState = {
  lightTheme: false,
  toggleTheme: () => {}
};

const MainContext = createContext<MainContextProps>(defaultState);

interface MainContextProviderProps {
  children: React.ReactNode;
  cookiesIsLightTheme: boolean;
}

export const MainContextProvider: FC<MainContextProviderProps> = ({
  children,
  cookiesIsLightTheme
}) => {
  const [lightTheme, setIsLightTheme] = useState(cookiesIsLightTheme);

  const toggleTheme = () => {
    setIsLightTheme(!lightTheme);
  };

  return (
    <MainContext.Provider value={{ lightTheme, toggleTheme }}>
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => {
  const appContext = useContext(MainContext);

  if (!appContext) {
    throw new Error(
      'useMainContext has to be used within <MainContextProvider>'
    );
  }

  return appContext;
};

export default useMainContext;
