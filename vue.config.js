// vue.config.js
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '即時口罩地圖',
    },
  },
  devServer: {
    port: 8088,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/maskMap/'
    : '/',
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '90',
        },
      }),
    ],
  },
};
