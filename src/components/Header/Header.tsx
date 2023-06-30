'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

import { Logo } from '@app/components/Logo';
import { Button, ButtonMenu } from '@ui-kit';
import useScrollPosition from '@app/hooks/useScrollPosition';
import { HEADER_MINIMIZE_OFFSET } from '@app/constants/settings';
import { NAVIGATION } from '@app/constants/navigation';
import { LocaleSwitcher } from '@app/components/LocaleSwitcher';
import { ThemeSwitcher } from '@app/components/ThemeSwitcher';

import s from './Header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const t = useTranslations('Header');
  const [controlsOpened, setControlsOpened] = useState(false);
  const scrollPosition = useScrollPosition();

  const toggleMenu = () => {
    setControlsOpened(!controlsOpened);
  };

  return (
    <header
      className={cn(s.root, {
        [s.minimized]: scrollPosition > HEADER_MINIMIZE_OFFSET,
        [s.controlsOpened]: controlsOpened
      })}
    >
      <Logo className={s.logo} />
      <div className={s.nav}>
        <div className={s.line} />
        {NAVIGATION.sort((a, b) => a.index - b.index).map(link => (
          <Link href={''} key={link.value}>
            <Button>{t(link.value)}</Button>
          </Link>
        ))}
      </div>
      <ButtonMenu
        active={controlsOpened}
        onClick={toggleMenu}
        className={s.menuButton}
      />
      <div className={s.controls}>
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </header>
  );
};
