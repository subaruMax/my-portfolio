import { Metadata } from 'next';

const author = 'Maksym Khaiuk';
const title = `Portfolio - ${author}`;
const description = 'Welcome to my portfolio, enjoy your stay!';

export const METADATA: Metadata = {
  title: title,
  description: description,
  applicationName: title,
  metadataBase: new URL('https://portfolio-maksym-khaiuk.vercel.app/'),
  authors: [{ name: author }],
  viewport: { width: 'device-width', initialScale: 1 },
  creator: author,
  robots: { index: true, follow: true },
  icons: [
    {
      rel: 'icon',
      url: 'https://portfolio-maksym-khaiuk.vercel.app/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      url: 'https://portfolio-maksym-khaiuk.vercel.app/apple-touch-icon.png'
    }
  ],
  manifest: 'https://portfolio-maksym-khaiuk.vercel.app/site.webmanifest',
  openGraph: {
    type: 'website',
    url: 'https://portfolio-maksym-khaiuk.vercel.app',
    title: title,
    description: description,
    siteName: title,
    images: [
      {
        url: 'https://portfolio-maksym-khaiuk.vercel.app/metaimage.png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@creator',
    images: 'https://portfolio-maksym-khaiuk.vercel.app/metaimage.png'
  },
  appleWebApp: {
    capable: true,
    title: title,
    statusBarStyle: 'black-translucent',
    startupImage:
      'https://portfolio-maksym-khaiuk.vercel.app/safari-pinned-tab.svg'
  }
};
