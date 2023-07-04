'use client';

import { FC } from 'react';
import cn from 'classnames';

import useScrollPosition from '@app/hooks/useScrollPosition';
import { HEADER_MINIMIZE_OFFSET } from '@app/constants/settings';
import { NavDesktop } from './NavDesktop';
import { NavMobile } from './NavMobile';

import s from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const scrollPosition = useScrollPosition();
  const minimized = scrollPosition.current > HEADER_MINIMIZE_OFFSET;

  return (
    <header
      className={cn(s.root, {
        [s.minimized]: scrollPosition.current > HEADER_MINIMIZE_OFFSET
      })}
    >
      <NavDesktop isMinimized={minimized} />
      <NavMobile />
    </header>
  );
};
