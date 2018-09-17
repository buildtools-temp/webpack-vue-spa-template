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

  /*-----------------------------------------------------------------------------*/
  /*   补全css代码的兼容性前缀             			                               */
  /*   需要在根目录新建一个.postcssrc.js 配置文件，不然会报找不到 postcss config 的错  */
  /*   还需要依次安装：
  /*  cnpm i postcss-import postcss-loader postcss-url --save-dev                */
  /*-----------------------------------------------------------------------------*/
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  /**
   * 生成加载器 - generate loader string to be used with extract text plugin
   * @param loader                loader 的名称
   * @param loaderOptions         loader 的配置项
   * @returns {*}
   */
  function generateLoaders(loader, loaderOptions) {
    //是否需要补全css代码的兼容性前缀配置，需要的话把 postcssLoader 注入
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    //注入loader的相关配置
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    /*----------------------------------------------------------------------------------------*/
    /*  Extract CSS when that option is specified (which is the case during production build) */
    /*  是否需要分离出js中的css代码,然后分别进行打包                                               */
    /*  此项目中，development 时不分离， production 时 分离                                      */
    /*----------------------------------------------------------------------------------------*/
    if (options.extract) {
      /**
       * extract默认行为先使用css-loader编译css，如果一切顺利的话，结束之后把css导出到规定的文件去。
       * 但是如果编译过程中出现了错误，则继续使用vue-style-loader处理css。
       **/
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  console.log(767676767667676);

  console.log(generateLoaders('sass', {indentedSyntax: true}));

  console.log(767676767667676);

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
  // 以上参考 ： https://vue-loader.vuejs.org/en/configurations/extract-css.html
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
