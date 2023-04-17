/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-27 11:50:20
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-07 15:49:45
 * @description: 描述
 */
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset", // 这行是默认有的，其余是要加的。
    ["@babel/preset-env", { modules: false }], // 之前第一项写的是es2015,但是报错了，后来看了别的博主，发现因为Vue版本太高了，写es2015会出错。
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
