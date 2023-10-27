/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-20 10:54:55
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-20 10:55:48
 * @description: 描述
 */
export enum ErrorMsgEnum {
  ERROR_400 = "请求失败，参数类型不匹配",
  ERROR_401 = "请求失败，登录状态已过期",
  ERROR_403 = "请求失败，您无权访问",
  ERROR_404 = "请求失败，未找到该资源",
  ERROR_500 = "请求失败，服务器错误，请联系管理员",
  ERROR_503 = "请求失败，服务器异常",
  ERROR_504 = "请求失败，请求超时",
}
