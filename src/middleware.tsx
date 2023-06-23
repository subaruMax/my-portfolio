import createMiddleware from 'next-intl/middleware';
import { i18n } from '@app/constants/localization';

export default createMiddleware({
  locales: Object.keys(i18n),
  defaultLocale: i18n.defaultLocale
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
