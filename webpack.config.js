/* eslint-disable */
const path = require('path');
var webpack = require("webpack");
var plugins = require('webpack-load-plugins')();
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractLESS = new ExtractTextPlugin('styles.css');
let minimify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.less$/,
      loader: extractLESS.extract(['css','less'])
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader' }]
  },
  plugins: [
        extractLESS,
        minimify,
    ]
}



// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { 'react-router-redux': src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: src
  });
}
