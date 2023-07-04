import { FC } from 'react';
import cn from 'classnames';

import { SupportedThemes } from '@app/types/general';
import useThemeContext from '@app/context/themeContext';
import { Icon } from '@ui-kit';

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
      className={cn(s.root, className, {
        [s.light]: isLight,
        [s.dark]: isDark
      })}
      onClick={handleChangeTheme}
      data-theme-no-transition
    >
      <div className={s.rails}>
        <div className={s.leftArrow} data-theme-no-transition></div>
        <div className={s.rightArrow} data-theme-no-transition></div>
      </div>
      <div className={s.rhombus} data-theme-no-transition>
        <Icon className={s.icon} name={isLight ? 'sun' : 'moon'} />
      </div>
    </button>
  );
};
