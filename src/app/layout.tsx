import { GeneralContextProvider, ThemeContextProvider } from '@app/context';
import { ReactNode } from 'react';
import '@app/styles/index.css';
import { Play } from 'next/font/google';
import { THEME_COOKIE_NAME } from '@app/constants/cookies';
import { cookies } from 'next/headers';
import { SupportedThemes } from '@app/types/general';

const inter = Play({ weight: ['400', '700'], subsets: ['cyrillic'] });

type Props = {
  children: ReactNode;
};

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.
const RootLayout = ({ children }: Props) => {
  const cookieStore = cookies();
  const theme =
    cookieStore.get(THEME_COOKIE_NAME)?.value ?? SupportedThemes.dark;

  return (
    <html>
      <body className={inter.className} data-theme={theme}>
        <GeneralContextProvider cookieTheme={theme as SupportedThemes}>
          {children}
        </GeneralContextProvider>
        <div id="react-portal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
