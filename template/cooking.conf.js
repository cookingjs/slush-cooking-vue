var path = require('path');
var cooking = require('cooking');
var chunk = [
  {
    name: 'vendor',
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, 'node_modules')
        ) === 0
      );
    }
  },
  {
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    name: 'manifest',
    chunks: ['vendor']
  }
];

cooking.set({
  entry: {
    app: './src/main.js'
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
  chunk: chunk,
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
  extends: ['vue<%= vueVersion %>', 'lint'<% if (csstype) { %>, '<%= csstype %>'<% } %><% if (csstype != 'saladcss') { %>, 'autoprefixer'<% } %>]
});

module.exports = cooking.resolve();
