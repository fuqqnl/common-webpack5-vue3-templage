/**
 * @file 启动开发环境、
 * @author 
 */

 const path = require('path');
 const webpack = require('webpack');
 const webpackDevServer = require('webpack-dev-middleware');
 const webpackHotMiddleware = require('webpack-hot-middleware');
 const webpackDocsConf = require('../scripts/webpack.dev.conf');
 const config = require('../config');
 const express = require('express');
 const app = express();
 
 const port = process.env.PORT || config.dev.port;
 
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
     console.log(`devServer address: http://localhost:${port}/`);
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
             const compiler = webpack(webpackDocsConf);
             compiler.hooks.done.tap('duer-design-webpack-build', stats => {
                 const hasErrors = stats.hasErrors();
                 if (hasErrors) {
                     reject(stats);
                 }
                 else {
                     resolve(stats);
                 }
             });
             const devMiddleware = webpackDevServer(compiler, {
                 publicPath: webpackDocsConf.output.publicPath,
                 quiet: true,
                 compress: true,
                 noInfo: true,
                 stats: 'errors-only'
             });
             // 热加载
             const hotMiddleware = webpackHotMiddleware(compiler);
             app.use(require('connect-history-api-fallback')());
 
             app.use(devMiddleware);
             app.use(hotMiddleware);
 
             app.listen(port);
         } catch(e) {
             console.log('编译错误:::', e);
         }
     })
 }