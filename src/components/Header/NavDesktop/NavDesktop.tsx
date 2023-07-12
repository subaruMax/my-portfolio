import { useTranslations } from 'next-intl';
import cn from 'classnames';
import { useState } from 'react';

import { Button, ButtonMenu } from '@ui-kit';
import { NAVIGATION } from '@app/constants/navigation';
import { ControlsDesktop } from './ControlsDesktop';
import { Logo } from '@app/components/Logo';
import useNavContext from '@app/context/navContext';

import s from './NavDesktop.module.scss';

type NavDesktopProps = {
  isMinimized: boolean;
};

export const NavDesktop: React.FC<NavDesktopProps> = ({ isMinimized }) => {
  const t = useTranslations('Header');
  const [controlsOpened, setControlsOpened] = useState(false);
  const { currentSection, scrollToSection } = useNavContext();

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
          <Button
            active={currentSection.includes(link.id)}
            onClick={() => scrollToSection(link.id)}
            key={link.id}
          >
            {t(link.value)}
          </Button>
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
