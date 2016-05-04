var cooking = require('cooking');
var path = require('path');

cooking.set({
  use: 'vue',
  entry: './src/entry.js',
  dist: './dist',
  template: 'src/index.template.html',
  <% if (devServer) { %>
  // development
  devServer: {
    host: 8080,
    publicPath: '/'
  },
  <% } %>
  // production
  clean: true,
  hash: true,
  sourceMap: true,
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
