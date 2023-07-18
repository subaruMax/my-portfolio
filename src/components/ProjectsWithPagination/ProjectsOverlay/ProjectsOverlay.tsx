import { motion } from 'framer-motion';
import React from 'react';

import { Icon } from '@ui-kit';

import s from './ProjectsOverlay.module.scss';

type ProjectsOverlayProps = {
  isActive: boolean;
  onClose: () => void;
};

export const ProjectsOverlay: React.FC<ProjectsOverlayProps> = ({
  isActive,
  onClose
}) => {
  return (
    <div className={s.root}>
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        className={s.overlay}
        onClick={onClose}
      />
      <motion.div
        initial={false}
        animate={isActive ? 'visible' : 'hidden'}
        variants={{
          visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'tween', duration: 0.3, delay: 0.5 }
          },
          hidden: {
            x: 100,
            opacity: 0,
            transition: { delay: 0, type: 'tween', duration: 0.15 }
          }
        }}
        style={{
          pointerEvents: isActive ? 'auto' : 'none'
        }}
        className={s.close}
        onClick={onClose}
      >
        <Icon name="close" />
      </motion.div>
    </div>
  );
};
