import React from 'react';

import { useLoadingContext } from '@app/context';
import { LoaderMain } from '@app/components/LoaderMain';

import s from './LoadingScreen.module.scss';

export const LoadingScreen = () => {
  const { percentLoaded } = useLoadingContext();

  return (
    <div className={s.root}>
      <LoaderMain className={s.loader} />
      <div>Loading... {percentLoaded}%</div>
    </div>
  );
};
