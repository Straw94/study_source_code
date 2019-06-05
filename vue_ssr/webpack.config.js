// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
//
//
// module.exports = {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     entry: {
//         // 'polyfills': './src/polyfills.js',
//         // 'entry-server': './src/entry-server.js',
//         'entry-client': './src/entry-server.js',
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].js'
//     },
//     devServer: {
//         contentBase: './dist',
//         hot: true
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         // new HtmlWebpackPlugin({
//         //     title: '模块热替换'
//         // }),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.ProvidePlugin({
//           // _: path.resolve(__dirname, './src/utils')
//         }),
//         new VueLoaderPlugin()
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                   loader: 'babel-loader',
//                 }
//             },
//             {
//               test: /\.vue$/,
//               loader: 'vue-loader'
//             }
//         ]
//     }
// };
