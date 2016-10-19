const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';

const paths = {
    context: path.resolve(__dirname, '..', 'app'),
    output:  path.resolve(__dirname, '..', 'dist'),
}

const d = function() {
    console.log.apply(console, arguments);
}

// http://stackoverflow.com/questions/33502987/webpack-bundle-js-not-found
// Expose
module.exports = {
    context: paths.context,
    entry: {
        js: [
            './index'
        ],
        vendor: [
            'react', 'react-dom'
        ]
    },
    output: {
      path: paths.output,
      filename: '[file].bundle.js',
      sourceMapFilename: '[file].map'
    },
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
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'file'
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./client'),
            'node_modules'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity,
          filename: 'vendor.bundle.js'
        }),
    ]
}
