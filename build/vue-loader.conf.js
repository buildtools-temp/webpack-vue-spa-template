'use strict';
const utils = require('./utils');
const config = require('../config');
//根据NODE_ENV这个变量，然后分析是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';
//

/**
 * 然后将根据不同的环境来加载，不同的环境，来判断是否开启了sourceMap的功能
 * 方便之后在cssLoaders中加上sourceMap功能
 * @type {boolean}
 */
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  //判断是否设置了cacheBusting属性，它指的是缓存破坏，特别是进行sourceMap debug时，设置成false是非常有帮助的。
  cacheBusting: config.dev.cacheBusting,
  //最后就是一个转化请求的内容，video、source、img、image等的属性进行配置。
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
