/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-04 14:00:06
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-10 11:46:40
 * @description: 描述
 */
import { http } from "../../request";
import { menuData, menuRes, loginData, loginRes } from "./type";
export const getMenuData = async (params: menuData) => {
  const { code, data, message } = await http.request<menuRes>({
    url: "/rbac/authority-group/list/user",
    method: "get",
    params: params,
    
  });
  // const { code, data, message } = await http.get<menuRes>("/rbac/authority-group/list/user", {
  //   params: params,
  // });
  if (code === 200 && data) {
    return {
      success: true,
      message,
      data,
    };
  }
  return { success: false };
};

export const getUserInfo = async (params: loginData) => {
  const { code, data, message } = await http.post<loginRes>("/oauth/user/login", params, { timeout: 30000 });
  if (code === 200 && data) {
    return {
      success: true,
      message,
      data,
    };
  }
  return { success: false };
};
