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

const menuAnimation = {
  hidden: { x: '100%' },
  opened: {
    x: 0,
    transition: {
      duration: 0.5,
      type: 'tween',
      delayChildren: 0.4,
      staggerChildren: 0.2
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
      duration: 0.3,
      type: 'tween'
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
      duration: 0.3,
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
                <Link href={link.href} key={link.value}>
                  <button onClick={toggleMenu}>{t(link.value)}</button>
                </Link>
              ))}
              <ThemeSwitcher />
              <LocaleSwitcher className={s.localeSwitcher} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
