var path = require('path');
var webpack = require('webpack');
var AppCachePlugin = require('appcache-webpack-plugin');

// http://stackoverflow.com/questions/33502987/webpack-bundle-js-not-found
// Expose
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '',
    filename: 'bundle.js',
    sourceMapFilename: "[file].map"
  },
  resolve: {
    root: [
      path.resolve('./app')
    ],
    extensions: ['', '.js']
  },
  devtool: 'sourcemap',
  debug: true,
  plugins: [
    new AppCachePlugin(),
    new webpack.HotModuleReplacementPlugin(), // Make hot loading work
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?includePaths[]=' + path.resolve(__dirname, '../node_modules/compass-mixins/lib')
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere within an entry point
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: [path.join(__dirname, '../node_modules/'),
                  path.join(__dirname, '../dist/'),
                  path.join(__dirname, '../server/') ] // except for the node_modules, dist and server folders.
      }
    ]
  },
}
