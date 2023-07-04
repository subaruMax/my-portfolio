import { motion } from 'framer-motion';
import { FC } from 'react';

import { LocaleSwitcher } from '@app/components/LocaleSwitcher';
import { ThemeSwitcher } from '@app/components/ThemeSwitcher';

import s from './ControlsDesktop.module.scss';

const animation = {
  open: {
    width: '190px',
    opacity: 1,
    overflow: 'visible'
  },
  close: {
    width: 0,
    opacity: 0,
    overflow: 'hidden'
  }
};

interface ControlsDesktopProps {
  controlsOpened: boolean;
}

export const ControlsDesktop: FC<ControlsDesktopProps> = ({
  controlsOpened
}) => {
  return (
    <motion.div
      initial={false}
      className={s.root}
      animate={controlsOpened ? 'open' : 'close'}
      variants={animation}
    >
      <ThemeSwitcher />
      <LocaleSwitcher />
    </motion.div>
  );
};
