/**
 * @file 处理css相关loader
 */
 const path = require('path');
 const config = require('../config');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
 exports.assetsPath = function (_path) {
     const assetsSubDirectory = process.env.NODE_ENV === 'production'
         ? config.build.assetsSubDirectory
         : config.dev.assetsSubDirectory
 
     return path.posix.join(assetsSubDirectory, _path)
 }
 
 exports.cssLoaders = function (options) {
     options = options || {}
     const cssLoader = {
         loader: 'css-loader',
         options: {
             sourceMap: options.sourceMap
         }
     };
 
     const postcssLoader = {
         loader: 'postcss-loader',
         options: {
             sourceMap: options.sourceMap
         }
     };
 
     const styleLoader = {
         loader: 'style-loader'
     }
 
 
     function generateLoaders(loader, loaderOptions) {
         if (loader === 'base_css') {
             const tarLoader = options.extract ? [MiniCssExtractPlugin.loader, cssLoader] : [styleLoader, cssLoader];
             return options.usePostCSS ? [...tarLoader, postcssLoader] : [...tarLoader];
         }
 
         const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
         if (loader) {
             if (loader === 'less') {
                 loaders.unshift(styleLoader);
             }
             loaders.push({
                 loader: loader + '-loader',
                 options: Object.assign({}, loaderOptions, {
                     sourceMap: options.sourceMap
                 })
             })
         }
         return loaders;
     }
     // 注意：只把css/postcss/less的相关loader初始化到了package.json中
     // 如果使用了其它的比如sass/scss/stylus等，需要自行打开对应注释，并添加对应loader
     return {
         css: generateLoaders('base_css'),
         postcss: generateLoaders(),
         less: generateLoaders('less'),
         // sass: generateLoaders('sass', { indentedSyntax: true }),
         // scss: generateLoaders('sass'),
         // stylus: generateLoaders('stylus'),
         // styl: generateLoaders('stylus')
     }
 }
 
 // 对css相关loader进行处理
 exports.styleLoaders = function (options) {
     const output = [];
     const loaders = exports.cssLoaders(options)
 
     for (const extension in loaders) {
         const loader = loaders[extension];
         output.push({
             test: new RegExp('\\.' + extension + '$'),
             use: loader
         });
     }
     return output;
 }