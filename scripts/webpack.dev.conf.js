/**
 * @file webpack development
 * @author 
 */
 const { merge } = require('webpack-merge');
 const baseConfig = require('./webpack.base.conf');
 const config = require('../config');
 const { styleLoaders } = require('./utils');
 
 module.exports = merge(baseConfig, {
     output: {
         path: config.dev.assetsRoot,
         publicPath: config.dev.assetsPublicPath,
         filename: '[name].js'
     },
     module: {
         rules: styleLoaders({
             sourceMap: false,
             extract: false,
             usePostCSS: true
         })
     }
 });