'use client';

import { FC } from 'react';

import { ThemeSwitcher } from '@app/components/ThemeSwitcher';
import { LocaleSwitcher } from '@app/components/LocaleSwitcher';

import s from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className={s.root}>
      - Maksym K.
      <div className={s.controls}>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
