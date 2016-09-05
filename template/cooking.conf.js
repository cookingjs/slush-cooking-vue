var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: './src/main.js'
  },
  dist: './dist',
  template: './src/index.tpl',

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
  chunk: [
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
  ],
  <% if (isNextWebpack) { %>postcss: [
    // require('...')
  ],<% } %>
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  extends: ['vue', 'lint'<% if( csstype) { %>, '<%= csstype %>'<% } %><% if (isNextWebpack) { %>, 'autoprefixer'<% } %>]
});

cooking.add('resolve.alias', {
  'src': path.join(__dirname, 'src')
});

module.exports = cooking.resolve();
