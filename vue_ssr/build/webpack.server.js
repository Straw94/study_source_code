const webpack = require('webpack')
const merge = require('webpack-merge');
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
    path: path.resolve(__dirname, '../server_dist'),
    libraryTarget: "commonjs",
  },
  plugins: [
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
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
    ]
  }
};