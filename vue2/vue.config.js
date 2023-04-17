/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-13 11:02:07
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-12-13 15:27:12
 * @description:
 */
const { defineConfig } = require("@vue/cli-service");
const { name } = require("./package");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  lintOnSave: false,
  devServer: {
    port: 7105,
    // historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    devtool: "source-map",
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});
