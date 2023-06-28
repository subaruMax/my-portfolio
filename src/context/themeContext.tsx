'use client';

import { THEME_COOKIE_NAME } from '@app/constants/cookies';
import { SupportedThemes } from '@app/types/general';
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useCookies } from 'react-cookie';

interface ThemeContextProps {
  theme: SupportedThemes;
  toggleTheme: (themeName: SupportedThemes) => void;
}

const defaultState = {
  theme: SupportedThemes.dark,
  toggleTheme: () => {}
};

const ThemeContext = createContext<ThemeContextProps>(defaultState);

export interface ThemeContextProviderProps {
  children: React.ReactNode;
  cookieTheme: SupportedThemes;
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
  cookieTheme
}) => {
  const [cookies, setCookie] = useCookies([THEME_COOKIE_NAME]);
  const [theme, setTheme] = useState<SupportedThemes>(cookieTheme);
  const [transition, setTransition] = useState(false);

  const toggleTheme = (themeName: SupportedThemes) => {
    setTransition(true);
    setTheme(themeName);
    document.body.setAttribute('data-theme', themeName);
    setCookie(THEME_COOKIE_NAME, themeName, {
      path: '/',
      httpOnly: false,
      expires: new Date('01.01.2500')
    });
  };

  useEffect(() => {
    const html = document.querySelector('html');
    const portal = document.querySelector('#react-portal');

    const removeThemeTransition = () => {
      html?.removeAttribute('data-theme-transition');
      setTransition(false);
    };

    if (transition) {
      html?.setAttribute('data-theme-transition', 'true');
    }

    portal?.addEventListener('transitionend', removeThemeTransition);

    return () => {
      portal?.removeEventListener('transitionend', removeThemeTransition);
    };
  }, [transition]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      'useThemeContext has to be used within <ThemeContextProvider>'
    );
  }

  return ctx;
};

export default useThemeContext;
