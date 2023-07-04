import Link from 'next/link';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import { useState } from 'react';

import { Button, ButtonMenu } from '@ui-kit';
import { NAVIGATION } from '@app/constants/navigation';
import { ControlsDesktop } from './ControlsDesktop';
import { Logo } from '@app/components/Logo';

import s from './NavDesktop.module.scss';
import { useSearchParams } from 'next/navigation';

type NavDesktopProps = {
  isMinimized: boolean;
};

export const NavDesktop: React.FC<NavDesktopProps> = ({ isMinimized }) => {
  const t = useTranslations('Header');
  const [controlsOpened, setControlsOpened] = useState(false);
  const searchParams = useSearchParams();
  const activePage = searchParams.get('section') || '';

  const toggleControls = () => {
    setControlsOpened(!controlsOpened);
  };

  return (
    <div className={s.root}>
      <Logo
        className={cn(s.logo, {
          [s.hide]: controlsOpened,
          [s.minimized]: isMinimized
        })}
      />
      <div className={cn(s.nav, { [s.controlsOpened]: controlsOpened })}>
        <div className={s.line} />
        {NAVIGATION.sort((a, b) => a.index - b.index).map(link => (
          <Link href={link.href} key={link.value}>
            <Button active={link.href.includes(activePage)}>
              {t(link.value)}
            </Button>
          </Link>
        ))}
        <ButtonMenu
          active={controlsOpened}
          onClick={toggleControls}
          className={s.menuButton}
        />
        <ControlsDesktop controlsOpened={controlsOpened} />
      </div>
    </div>
  );
};
