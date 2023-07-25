'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { useLoadingContext } from '@app/context';
import { LoaderMain } from '@app/components/LoaderMain';

import s from './LoadingScreen.module.scss';

export const LoadingScreen = () => {
  const { appLoaded, percentLoaded } = useLoadingContext();
  const assetsLoadingStarted = percentLoaded > 0;
  const t = useTranslations('LoadingScreen');

  if (appLoaded) {
    return null;
  }

  return (
    <div className={s.root}>
      <LoaderMain className={s.loader} />
      {!assetsLoadingStarted && <div>{t('scripts')}</div>}
      {assetsLoadingStarted && (
        <div>
          {t('assets')} {percentLoaded}%
        </div>
      )}
      <div>{t('please-wait')}</div>
    </div>
  );
};
