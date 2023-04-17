/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-03-20 15:22:04
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-03-27 16:46:59
 * @description: 描述
 */
/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-03-20 15:22:04
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-03-27 11:42:40
 * @description: 描述
 */
/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-03-20 15:22:04
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-03-22 10:48:40
 * @description: 描述
 */
const jsonServer = require("json-server");
// 创建json-server实例
const server = jsonServer.create();
const { mocks } = require("./db");
const { routers } = require("./router");
// 将路由配置表传入，生成路由表
console.log(transferRoutes(mocks));
// const router = jsonServer.router({
//   posts: [{ id: 1, title: "json-server", author: "typicode" }],
//   comments: [{ id: 1, body: "some comment", postId: 1 }],
//   profile: { name: "typicode" },
// });
server.use(jsonServer.rewriter(routers));
const router = jsonServer.router(transferRoutes(mocks));
const middlewares = jsonServer.defaults();

// router.render = (req, res) => {
//   console.log("req", req);
//   console.log("res", res);
// };

server.use(middlewares);
// 导入路由
server.use(router);
console.log(routers);

// 在6666端口开服务
server.listen(
  {
    host: "10.27.10.52",
    //host: "127.0.0.1",
    port: "3000",
  },
  (v) => {
    console.log("JSON Server is running");
  }
);
function transferRoutes(mocks) {
  const route = {};
  const routes = mocks.forEach((v) => {
    route[v.url] = v.response;
  });
  return route;
}
