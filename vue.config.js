/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-04-07 18:04:24
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-09-25 11:06:31
 */
const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/projectA/" : "/",
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
      alias: {
        "@/": path.resolve(__dirname, "src/"),
      },
    },
  },
  devServer: {
    port: 4000,
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
  },
};
