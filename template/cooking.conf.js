var getConfig = require('cooking')

var config = getConfig({
  in: 'src/entry.js',
  dist: 'dist',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  template: 'src/index.template.html',

  // dev
  devServer: {
    publicPath: '/',
    enable: false,
    port: 8080,
    historyApiFallback: true,
    noInfo: true,
    quiet: false,
    lazy: false
  },


  // build
  clear: true,
  hash: true,
  sourceMap: true,
  publicPath: '/dist',

  // chunk: 'vendor',

  extractCSS: '[name].[contenthash:7].css',

  extends: ['vue']
})

module.exports = config
