import '@app/styles/index.css';
import { Inter } from 'next/font/google';
import { MainContextProvider } from '@app/context/index';
import { GetServerSideProps, NextPageContext } from 'next';
import { THEME_COOKIE_NAME } from '@app/constants/cookies';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio - Maksym Khaiuk',
  description: 'Welcome to my portfolio'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const isLightTheme = JSON.parse(
    cookieStore.get(THEME_COOKIE_NAME)?.value || 'false'
  );

  return (
    <html lang="en">
      <MainContextProvider cookiesIsLightTheme={isLightTheme}>
        <body
          className={inter.className}
          data-theme={isLightTheme ? 'light' : 'dark'}
        >
          {children}
        </body>
      </MainContextProvider>
    </html>
  );
};

export default RootLayout;
