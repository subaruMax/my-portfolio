import { NextIntlClientProvider, createTranslator } from 'next-intl';

import { Header } from '@app/components/Header';
import { METADATA } from '@app/constants/ metadata';

import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Footer } from '@app/components/Footer';
import { LoadingScreen } from '@app/components/LoadingScreen';

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  let messages;

  try {
    messages = (await import(`@app/localization/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return messages;
}

export async function generateMetadata({
  params: { locale }
}: LocaleLayoutProps) {
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return { ...METADATA, title: t('home.title') };
}

const LocaleLayout = async ({
  children,
  params: { locale }
}: LocaleLayoutProps) => {
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <LoadingScreen />
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
