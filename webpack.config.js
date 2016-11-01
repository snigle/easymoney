/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const extractLESS = new ExtractTextPlugin("styles-[hash:6].css")
let plugins = [];
plugins.push(extractLESS);
plugins.push(new HTMLWebpackPlugin({template : __dirname + '/client/index.html', title : "EasyMoney"}));
plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js'));
if (process.env.NODE_ENV === "production")
{
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

module.exports = {
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename  : 'app.min-[hash:6].js'
  },
  devtool: "source-map",
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel", "eslint-loader"],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.(less|css)$/,
      loader: extractLESS.extract(["css","less"])
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "file-loader" },
    ]
  },
  plugins: plugins,
}



// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
let src = path.join(__dirname, "..", "..", "src")
let fs = require("fs")
if (fs.existsSync(src)) {
  // Use the latest src
  module.exports.resolve = { alias: { "react-router-redux": src } }
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ["babel"],
    include: src
  });
}
