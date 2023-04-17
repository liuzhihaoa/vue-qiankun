/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-03-20 16:27:03
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-03-27 11:27:30
 * @description: 描述
 */
const Mock = require("mockjs");
const Random = Mock.Random;
function produceUserList(total) {
  const userList = [];
  for (let i = 0; i <= total; i++) {
    userList.push({
      id: i,
      name: Random.cname(),
      age: 18,
    });
  }
  return userList;
}
module.exports = [
  {
    url: "user_list",
    response: {
      code: 200,
      data: {
        list: produceUserList(20),
      },
    },
  },
];
