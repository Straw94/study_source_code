  const path = require('path');
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.ts',
      designPattern: './src/designPattern/extends'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'typescript学习'
      }),
      new webpack.ProvidePlugin({
        '_': path.resolve(__dirname, './src/utils.ts')
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };