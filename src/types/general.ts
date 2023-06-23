import { i18n } from '@app/constants/localization';
import en from '@app/localization/en.json';

export type Locale = keyof typeof i18n.locales;

export type PageParams = {
  params: { locale: Locale };
};

export type Dictionary = typeof en;

export enum SupportedThemes {
  light = 'light',
  dark = 'dark'
}
