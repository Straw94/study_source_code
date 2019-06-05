const webpack = require('webpack')
const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'entry-client': './src/entry-client.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
     // new UglifyJSPlugin({
     //   sourceMap: true
     // }),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     })
   ]
});