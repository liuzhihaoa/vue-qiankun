/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-12 17:29:58
 * @description:
 */

const { name } = require("./package");
const path = require("path");
const { config } = require("process");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    port: 7106,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/api": {
        target: "http://10.27.3.145:8090",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/": "/",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
};
// const path = require('path');
// const { name } = require('./package');

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

// const port = 7105;

// module.exports = {
//   outputDir: 'dist',
//   assetsDir: 'static',
//   filenameHashing: true,
//   lintOnSave: false,
//   devServer: {
//     hot: true,
//     port,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//   },
//   // 自定义webpack配置
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': resolve('src'),
//       },
//     },
//     output: {
//       // 把子应用打包成 umd 库格式
//       library: `${name}-[name]`,
//       libraryTarget: 'umd',
//       chunkLoadingGlobal: `webpackJsonp_${name}`,
//     },
//   },
// };
