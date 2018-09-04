/**
 * utils - 为整个脚手架提供方法
 */

'use strict';
//path模块提供了用于处理文件和目录路径的使用工具
const path = require('path');
//config目录中的index文件
const config = require('../config');
//extract-text-webpack-plugin - 用来分离css和js的内容
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//这是一个json文件，加载过来之后，会变成一个对象
const packageConfig = require('../package.json');

/**
 * assetsPath
 * 它根据 nodejs 的 proccess.env.NODE_ENV 变量，来判断当前运行的环境。
 * 返回不同环境下面的不同static目录位置拼接给定的_path参数。
 * @param _path  接受一个_path参数
 * @returns {*|string} 返回static目录位置拼接的路径
 */
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path)
};

/**
 * cssLoaders
 * @param options   接受一个options参数，参数还有的属性：sourceMap、usePostCSS。
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
  options = options || {};

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

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      //分离出js中的css代码,然后分别进行打
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  /**
   * 同时，它返回一个对象，其中包含了css预编译器(less、sass、stylus)loader生成方法等,
   * 如果你的文档明确只需要一门css语言，那么可以稍微清楚一些语言，同时可以减少npm包的大小(毕竟这是一个令人烦躁的东西)
   */
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};

/**
 * styleLoaders
 * Generate loaders for standalone style files (outside of .vue)
 * 该方法只是根据cssLoaders中的方法配置，生成不同loaders。然后将其返回。
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
};

/**
 * createNotifierCallback
 * 此处调用了一个模块，可以在GitHub上找到，它是一个原生的操作系统上发送通知的nodeJS模块。用于返回脚手架错误的函数
 * @returns {Function}
 */
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
};
