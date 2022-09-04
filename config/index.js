

/**
 * @file config
 */

 var path = require('path');

 module.exports = {
      build: {
         assetsRoot: path.resolve(__dirname, '../output'),
         assetsSubDirectory: 'static',
         assetsPublicPath: '/'
      },
      dev: {
        assetsRoot: path.resolve(__dirname, '../output'),
         port: 8822,
         assetsSubDirectory: 'static',
         assetsPublicPath: '/'
      }
 };