/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-04 15:19:26
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-07 16:43:09
 * @description: 描述
 */
export interface ResponseType<T> {
  code: number;
  data: T;
  count: number;
  errorCode: number;
  timeStamp: number;
  message: string;
}
