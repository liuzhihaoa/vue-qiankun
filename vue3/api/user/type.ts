/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-04 14:00:13
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-10 11:14:23
 * @description: 描述
 */
export interface loginData {
  username: string;
  password: string;
}

export interface loginRes {
  access_token: string;
  expires_in: string;
}



export interface menuData {
  id: string;
}

export interface menuRes {
  id: string;
  code: number;
  name: string;
}

