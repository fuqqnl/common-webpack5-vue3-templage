/**
 * @file webpack base
 * @author
 */

 const { resolve, posix, join } = require('path');
 const config = require('../config');
 const webpack = require('webpack');
 const isProduction = process.env.NODE_ENV === 'production';
 const ProgressPlugin = require('webpack/lib/ProgressPlugin');
 const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { VueLoaderPlugin } = require('vue-loader/dist/index');
 
 module.exports = {
     mode: isProduction ? 'production' : 'development',
     devtool: isProduction ? false : 'eval-cheap-module-source-map',
     entry: {
         main: resolve('src/index.js'),
     },
     output: {
         path: config.dev.assetsRoot,
         publicPath: config.dev.assetsPublicPath,
         filename: '[name].js'
     },
     resolve: {
         extensions: ['.js', '.vue', '.less', '.ts', '.tsx'],
         alias: {
             'vue': 'vue/dist/vue.cjs.js',
             '@': resolve('src'),
         }
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 use: {
                     loader: 'babel-loader'
                 },
                 exclude: /node_modules/
             },
             {
                 test: /\.vue$/,
                 loader: 'vue-loader'
             },
             {
                 test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                 use: {
                     loader: 'url-loader',
                     options: {
                         limit: 8192
                     }
                 },
                 exclude: /node_modules/
             },
             {
                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                 use: {
                     loader: 'file-loader'
                 }
             }
         ]
     },
     plugins: [
         new ProgressPlugin(),
         new NoEmitOnErrorsPlugin(),
         new HtmlWebpackPlugin({
             filename: 'index.html',
             template: './index.html',
             inject: true
         }),
         new VueLoaderPlugin(),
         new webpack.DefinePlugin({
             __VUE_OPTIONS_API__: false,
             __VUE_PROD_DEVTOOLS__: false,
         }),
     ]
 };