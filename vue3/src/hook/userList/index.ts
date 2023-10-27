/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-03 11:48:10
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-08-26 11:19:42
 * @description: 描述
 */
import { ref } from "vue";

// export default userList(){
//   const loading = ref(false)
//   const total = ref(0)
//   const curPage = ref(1)
//   const pageSzie = ref(10)

// }
const test = ref(0);
const addTest = () => {
  console.log(test.value);
  test.value++;
};
export { test, addTest };
