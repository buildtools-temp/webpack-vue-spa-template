'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

/**
 * module.exports导出了一个对象，其中包含两个设置 dev 和 build 情况的设置
 * @type {{dev: {assetsSubDirectory: string, assetsPublicPath: string, proxyTable: {}, host: string, port: number, autoOpenBrowser: boolean, errorOverlay: boolean, notifyOnErrors: boolean, poll: boolean, useEslint: boolean, showEslintErrorsInOverlay: boolean, devtool: string, cacheBusting: boolean, cssSourceMap: boolean}, build: {index: *, assetsRoot: *, assetsSubDirectory: string, assetsPublicPath: string, productionSourceMap: boolean, devtool: string, productionGzip: boolean, productionGzipExtensions: string[], bundleAnalyzerReport: *}}}
 */
module.exports = {
  /**
   * dev中配置了静态路径、本地服务器配置项、Eslint、Source Maps等参数
   */
  dev: {
    // Paths
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,// 是否开启 cssSourceMap
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名

    /**
     * Source Maps
     */

    productionSourceMap: true,// 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
