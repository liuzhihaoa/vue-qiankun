/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-04 15:19:26
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-18 14:05:57
 * @description: 描述
 */
import type { AxiosRequestConfig } from "axios";
export interface ResponseType<T> {
  code: number;
  data: T;
  count: number;
  errorCode: number;
  timeStamp: number;
  message: string;
}
export interface axiosConfig extends AxiosRequestConfig {
  cancelSame?: boolean;
  loading?: boolean;
  isToken?: boolean;
}
