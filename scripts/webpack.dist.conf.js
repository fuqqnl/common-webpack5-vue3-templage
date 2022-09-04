/**
 * @file webpack production
 * @author 
 */
 const { merge } = require('webpack-merge');
 const baseConfig = require('./webpack.base.conf');
 const config = require('../config');
 const TerserPlugin = require('terser-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const { assetsPath, styleLoaders } = require('./utils');
 
 module.exports = merge(baseConfig, {
     output: {
         path: config.build.assetsRoot,
         publicPath: config.build.assetsPublicPath,
         filename: assetsPath('[name].[chunkhash:6].js')
     },
     module: {
         rules: styleLoaders({
             sourceMap: false,
             extract: true,
             usePostCSS: true
         })
     },
     optimization: {
         minimize: true,
         minimizer: [new TerserPlugin({
             extractComments: false,
         })],
         runtimeChunk: 'single',
         moduleIds: 'deterministic',
         splitChunks: {
             cacheGroups: {
                 vendor: {
                     name: 'vendor',
                     chunks: chunk => chunk.name == 'main',
                     reuseExistingChunk: true,
                     priority: 1,
                     test: module =>
                         /[\\/]node_modules[\\/]/.test(module.context),
                     minChunks: 1,
                     minSize: 0,
                 },
             }
         }
     },
     plugins: [
         new MiniCssExtractPlugin({
             filename: assetsPath('css/[name].css'),
             chunkFilename: assetsPath('css/common.css')
         }),
     ],
 
 });