const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const WebpackCopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new WebpackCopyPlugin([{
      from: 'README.md',
      to: 'README.md'
    }, {
      from: 'LICENSE',
      to: 'LICENSE'
    }, {
      from: 'CHANGELOG.md',
      to: 'CHANGELOG.md'
    }, {
      from: 'manifest.json',
      to: 'manifest.json'
    }, {
      from: 'oidc-callback.html',
      to: 'oidc-callback.html'
    }, {
      from: 'oidc-silent-redirect.html',
      to: 'oidc-silent-redirect.html'
    }])
  ],
  mode: 'production'
})
