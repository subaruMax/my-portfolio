import React from 'react';

import s from './AnimatedBg.module.scss';

export const AnimatedBg = () => {
  return (
    <div className={s.root}>
      <div className={s.bg} />
    </div>
  );
};
