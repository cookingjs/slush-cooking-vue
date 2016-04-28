var cooking = require('cooking')

cooking.set({
  entry: './src/entry.js',
  dist: './dist',
  template: 'src/index.template.html',

  // development
  devServer: {
    publicPath: '/', // 会覆盖 output.publicPath
    enable: false, // 是否启用
    port: 8080,
    hot: true
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  publicPath: '/dist',
  assetsPath: 'static',
  urlLoaderLimit: 10000,

  extractCSS: '[name].[contenthash:7].css',

  extends: ['vue', 'lint']
})

module.exports = cooking.resolve()
