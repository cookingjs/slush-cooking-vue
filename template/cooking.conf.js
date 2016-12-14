var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {<% if (devServer) { %>
    port: 8080,
    publicPath: '/'<% } else { %>
    enable: false,
    extractCSS: true<% } %>
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue<%= vueVersion %>'<% if (js) { %>, '<%= js %>'<% } %>, 'lint'<% if (csstype) { %>, '<%= csstype %>'<% } %>]
});

module.exports = cooking.resolve();
