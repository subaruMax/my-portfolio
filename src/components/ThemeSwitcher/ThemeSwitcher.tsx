import { FC } from 'react';
import cn from 'classnames';

import { SupportedThemes } from '@app/types/general';
import useThemeContext from '@app/context/themeContext';

import s from './ThemeSwitcher.module.scss';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useThemeContext();

  const isLight = theme === SupportedThemes.light;
  const isDark = theme === SupportedThemes.dark;

  const handleChangeTheme = () => {
    if (isLight) {
      return toggleTheme(SupportedThemes.dark);
    }

    toggleTheme(SupportedThemes.light);
  };

  return (
    <button
      className={cn(s.main, className, {
        [s.light]: isLight,
        [s.dark]: isDark,
        [s.unset]: !theme
      })}
      onClick={handleChangeTheme}
      data-theme-no-transition
    >
      <div className={s.switchButton} data-theme-no-transition>
        <div
          className={cn(s.themeArt, s.light, { [s.show]: isLight })}
          data-theme-no-transition
        >
          🌞
        </div>
        <div
          className={cn(s.themeArt, s.dark, { [s.show]: isDark })}
          data-theme-no-transition
        >
          🌚
        </div>
      </div>
    </button>
  );
};
