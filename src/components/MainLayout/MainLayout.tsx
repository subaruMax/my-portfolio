'use client';

import { FC } from 'react';
import cn from 'classnames';

import useMainContext from '@app/context/mainContext';
import { ThemeSwitcher } from '@app/components/ThemeSwitcher';

import s from './MainLayout.module.scss';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  const { lightTheme } = useMainContext();

  return (
    <div className={cn(s.main, className)}>
      <header className={s.header}>
        Refresh
        <ThemeSwitcher />
      </header>
      <main className={s.content}>{children}</main>
    </div>
  );
};
