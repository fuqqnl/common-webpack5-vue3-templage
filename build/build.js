/**
 * @file dist构建
 * @author
 */

 const path = require('path');
 const webpack = require('webpack');
 const webpackDocsConf = require('../scripts/webpack.dist.conf');
 
 start().then(stats => {
     if (stats) {
         process.stdout.write(
             stats.toString({
                 colors: true,
                 modules: false,
                 children: false,
                 chunks: false,
                 chunkModules: false
             }) + '\n'
         );
     }
 }).catch( e => {
     process.stderr.write(
         e.toString({
             colors: true,
             modules: false,
             children: false,
             chunks: false,
             chunkModules: false
         }) + '\n'
     );
 });
 
 function start() {
     return new Promise((resolve, reject) => {
         // 开始编译
         try{
             console.log('开始编译....');
             webpack(webpackDocsConf, function(err, stats) {
                 const hasErrors = stats.hasErrors();
                 if (hasErrors) {
                     reject(stats);
                 } else {
                     resolve(stats);
                 }
             });
         }catch(e) {
             console.log('编译错误:::', e);
         }
     })
 }