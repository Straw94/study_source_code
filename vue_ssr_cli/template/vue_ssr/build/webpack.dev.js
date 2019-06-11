const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')

console.log('dev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev startdev start')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'entry-client': './src/entry-client.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist')
  }
});