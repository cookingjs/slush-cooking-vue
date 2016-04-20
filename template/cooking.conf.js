var getConfig = require('cooking').getConfig

var config = getConfig({
  in: 'src/entry.js',
  out: 'dist', // path
  publicPath: '',

  html: {
    'index.html': 'src/index.template.html'
  },

  // dev
  devServer: {
    enable: false,
    port: 8080,
    historyApiFallback: true,
    noInfo: true,
    quiet: false,
    lazy: false
  },


  // dist
  clear: true,
  hash: true,
  sourceMap: true,

  // chunk: 'vendor',

  extractCSS: 'stlye.css', // or boolean
})

module.exports = config
