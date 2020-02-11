// vue.config.js

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '口罩地圖',
    },
  },
  devServer: {
    port: 8088,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/maskmap/'
    : '/',
};
