/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 11:29:17
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-14 11:33:46
 * @description: 
 */
//定义Todo接口约束state的数据类型
export interface Todo {
  id: number
  title: string
  isCompleted: boolean
}