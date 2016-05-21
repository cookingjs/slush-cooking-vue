var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: './src/main.js',
    vendor: ['vue']
  },
  dist: './dist',
  template: './src/index.tpl',

  devServer: {<% if (devServer) { %>
    port: 8080,
    publicPath: '/'<% } else { %>,
    enable: false,
    extractCSS: true<% } %>
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  chunk: 'vendor',
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  extends: ['vue', 'lint'<% if( csstype) { %>, '<%= csstype %>'<% } %>]
});

cooking.add('resolve.alias', {
  'src': path.join(__dirname, 'src')
});

module.exports = cooking.resolve();
