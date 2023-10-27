/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-08-31 16:29:40
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-09-25 11:15:18
 * @description:
 */

const { name } = require("./package");
const path = require("path");
const { config } = require("process");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
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
    plugins: [process.env.NODE_ENV === "production" && new WebpackBundleAnalyzer.BundleAnalyzerPlugin()].filter(Boolean),
  },
};
