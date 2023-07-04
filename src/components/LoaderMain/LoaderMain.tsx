import React from 'react';
import cn from 'classnames';

import s from './LoaderMain.module.scss';

type LoaderMainProps = {
  className?: string;
};

const CIRCLES_AMOUNT = 9;

const LoaderMain: React.FC<LoaderMainProps> = ({ className }) => {
  return (
    <div className={cn(s.root, className)}>
      <div className={s.plane} data-theme-no-transition>
        {new Array(CIRCLES_AMOUNT).fill(null).map(i => (
          <div key={i} className={s.circle} data-theme-no-transition />
        ))}
      </div>
    </div>
  );
};

export default LoaderMain;
