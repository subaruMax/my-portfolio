/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ua', 'ru'],
    defaultLocale: 'en'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/ // *.svg?url
    });

    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/options/
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false
                }
              ]
            }
          }
        }
      ]
    });

    return config;
  }
};

module.exports = nextConfig;
