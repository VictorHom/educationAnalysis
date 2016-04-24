var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [

  new ExtractTextPlugin('bundle.css', {
    allChunks: true
  }), // where should content be piped
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main', // move dependencies to our main file
    children: true, // Look for common dependencies in all children,
    minChunks: 2, // how many times a dependency must come up before being executed
  }),
]

module.exports = {
  entry: './browser/js/app.js',
  output: {
    path: 'public',
    filename: 'main.js',
    publicPath: 'public/'
  },
  devServer: {
    hot: true, //can run webpack-dev-server and you get hot reloading
  },
  plugins: plugins,
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: path.join(__dirname, 'browser/js'),
      exclude: /node_modules/,
      include: __dirname + '/browser/js',
      query: {
        presets: 'es2015',
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react'
    }, {
      test: /\.scss/,
      // loaders: ['style', 'css', 'sass']
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
    }, {
      test: /\.html/,
      loader: 'html',
    }, {
      test: /\.(png|gif|jpe?g|svg)$/i,
      loader: 'url',
      query: {
        limit: 10000,
      }
    }]
  }
};
