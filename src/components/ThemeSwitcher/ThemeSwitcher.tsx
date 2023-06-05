import { FC, useEffect } from 'react';
import cn from 'classnames';
import { useCookies } from 'react-cookie';

import useMainContext from '@app/context/mainContext';
import { THEME_COOKIE_NAME } from '@app/constants/cookies';

import s from './ThemeSwitcher.module.scss';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { lightTheme, toggleTheme } = useMainContext();
  const [cookies, setCookie] = useCookies([THEME_COOKIE_NAME]);

  const handleToggleTheme = () => {
    toggleTheme();
    document.body.setAttribute('data-theme', !lightTheme ? 'light' : 'dark');
    setCookie(THEME_COOKIE_NAME, !lightTheme, { path: '/', httpOnly: false });
  };

  return (
    <div
      className={cn(s.main, className, {
        [s.light]: lightTheme,
        [s.dark]: !lightTheme
      })}
    >
      <button className={s.switchButton} onClick={handleToggleTheme}>
        {lightTheme ? '🌚' : '🌞'}
      </button>
    </div>
  );
};
