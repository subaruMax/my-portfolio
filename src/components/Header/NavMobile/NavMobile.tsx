import Link from 'next/link';
import { useTranslations } from 'next-intl';
import cn from 'classnames';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, ButtonMenu } from '@ui-kit';
import { NAVIGATION } from '@app/constants/navigation';
import { Logo } from '@app/components/Logo';

import s from './NavMobile.module.scss';
import { ThemeSwitcher } from '@app/components/ThemeSwitcher';
import { LocaleSwitcher } from '@app/components/LocaleSwitcher';
import { NavLink } from './NavLink';

const menuAnimation = {
  hidden: { x: '100%' },
  opened: {
    x: 0,
    transition: {
      duration: 0.5,
      type: 'tween',
      delayChildren: 0.4,
      staggerChildren: 0.25
    }
  },
  close: {
    x: '100%',
    transition: {
      duration: 0.5,
      type: 'tween',
      delay: 0.3
    }
  }
};

const menuLineAnimation = {
  hidden: { x: '100%' },
  opened: {
    x: '0%',
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  },
  close: {
    x: '100%',
    transition: {
      duration: 0.2,
      type: 'tween'
    }
  }
};

const navElementsAnimation = {
  hidden: { x: '-100%', opacity: 0 },
  opened: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  },
  close: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.2,
      type: 'tween'
    }
  }
};

const controlsAnimation = {
  hidden: { y: '100%' },
  opened: {
    y: '0%',
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  },
  close: {
    y: '100%',
    transition: {
      duration: 0.2,
      type: 'tween'
    }
  }
};

type NavMobileProps = {};

export const NavMobile: React.FC<NavMobileProps> = ({}) => {
  const t = useTranslations('Header');
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div className={s.root}>
      <div className={s.head}>
        <Logo className={cn(s.logo)} />
        <div className={s.line} />
        <div className={s.line} />
        <div className={s.line} />
        <ButtonMenu active={menuOpened} onClick={toggleMenu} />
      </div>
      <AnimatePresence>
        {menuOpened && (
          <motion.div
            className={s.menu}
            variants={menuAnimation}
            initial="hidden"
            animate="opened"
            exit="close"
          >
            <motion.div variants={menuLineAnimation} className={s.menuLine} />
            <motion.div variants={navElementsAnimation} className={s.nav}>
              {NAVIGATION.sort((a, b) => a.index - b.index).map(link => (
                <NavLink
                  onClick={toggleMenu}
                  href={link.href}
                  className={s.menuItem}
                  key={link.value}
                >
                  {t(link.value)}
                </NavLink>
              ))}
            </motion.div>
            <motion.div variants={controlsAnimation} className={s.controls}>
              <div className={s.controlsWrapper}>
                <ThemeSwitcher />
                <LocaleSwitcher className={s.localeSwitcher} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
