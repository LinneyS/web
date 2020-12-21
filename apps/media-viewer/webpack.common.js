const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  plugins: [
    new VueLoaderPlugin()
  ],
  entry: {
    mediaviewer: [
      'core-js/modules/es6.promise',
      'core-js/modules/es6.array.iterator',
      './src/app.js'
    ]
  },
  output: {
    publicPath: 'apps/media-viewer/',
    chunkFilename: '[name].media-viewer.chunk.js',
    filename: 'media-viewer.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        rootMode: 'upward'
      }
    },
    {
      test: /\.jsx?$/,
      include: /node_modules\/(?=(query-string|split-on-first|strict-uri-encode)\/).*/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env',]
          ]
        }
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }]
  }
}
