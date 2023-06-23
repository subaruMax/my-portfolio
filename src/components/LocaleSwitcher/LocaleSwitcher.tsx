'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { startTransition } from 'react';
import cn from 'classnames';

import { i18n } from '@app/constants/localization';

import s from './LocaleSwitcher.module.scss';

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onLanguageChange(locale: string) {
    if (!pathname) return '/';

    const segments = pathname.split('/');

    segments[1] = locale;

    return startTransition(() => {
      router.replace(segments.join('/'));
    });
  }

  return (
    <div className={s.root}>
      {Object.entries(i18n.locales).map(lang => {
        return (
          <button
            onClick={() => onLanguageChange(lang[0])}
            key={lang[0]}
            className={cn(s.option, {
              [s.active]: locale === lang[0]
            })}
          >
            {lang[1]}
          </button>
        );
      })}
    </div>
  );
};
