import React from 'react';

import s from './PortfolioBg.module.scss';

const PortfolioBg = () => {
  return (
    <div className={s.root}>
      {new Array(9).fill(null).map((el, i) => (
        <div key={i} className={s['div' + (i + 1)]} />
      ))}
    </div>
  );
};

export default PortfolioBg;
