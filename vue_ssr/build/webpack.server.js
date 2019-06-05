const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: {
    'entry-server': './src/entry-server.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../server_dist')
  },
  plugins: [
     // new UglifyJSPlugin({
     //   sourceMap: true
     // }),
     new HtmlWebpackPlugin({
       title: 'Production',
       filename: 'index.html',
       template: path.resolve(__dirname, '../src/index.html')
     }),
     new VueLoaderPlugin(),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('server')
     })
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                 presets: ['@babel/preset-env']
                 // plugins: ['babel-plugin-transform-runtime']
              }
            }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
    ]
  }
};