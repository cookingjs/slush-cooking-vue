var cooking = require('cooking')

cooking.set({
  entry: './src/entry.js',
  dist: './dist',
  template: {
    'index.html': 'src/index.template.html'
  },

  // development
  devServer: {
    publicPath: '/', // 会覆盖 output.publicPath
    enable: false, // 是否启用
    port: 8080,
    hot: true
  },

  // production
  clean: true, // 是否每次 build 都清理
  hash: true, // build 的文件是否带 hash
  sourceMap: true, // 是否带 map
  publicPath: '/dist/',
  urlLoaderLimit: 10000,
  assetsPath: 'static',

  extractCSS: '[name].[contenthash:7].css'
})

module.exports = cooking.resolve()
