const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ifProd = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Production',
       filename: 'index.html',
       template: path.resolve(__dirname, '../src/index.html')
     }),
     new VueLoaderPlugin()
   ],
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