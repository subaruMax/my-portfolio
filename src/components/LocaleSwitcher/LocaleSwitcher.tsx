'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { startTransition } from 'react';

import { i18n } from '@app/constants/localization';
import { Select } from '@ui-kit';

type LocaleSwitcherProps = {
  className?: string;
};

const LOCALE_OPTIONS = Object.entries(i18n.locales).map(lang => ({
  value: lang[0],
  label: lang[0].toUpperCase(),
  icon: lang[1]
}));

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  className
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onLanguageChange(locale: string) {
    if (!pathname) return '/';

    const segments = pathname.split('/');

    segments[1] = locale;

    return startTransition(() => {
      router.push(segments.join('/'));
    });
  }

  return (
    <Select
      className={className}
      value={locale}
      options={LOCALE_OPTIONS}
      onSelect={val => onLanguageChange(val as string)}
    />
  );
};
