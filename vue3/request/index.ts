/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-01-12 10:05:58
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-18 16:14:44
 * @description: 描述
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { ElLoading } from "element-plus";
import { ResponseType, axiosConfig } from "./type";
import { AxiosCancle } from "./cancle";
import axiosLoading from "./loading";

const axiosCanle = new AxiosCancle();

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 50000,
});

const defaultConfig: axiosConfig = {
  cancelSame: true,
  loading: true,
  isToken: true,
};
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // @ts-ignore
    const { cancelSame, loading, isToken } = config.requestOptions;
    if (cancelSame) {
      axiosCanle.addPending(config);
    }
    if (isToken) {
      config.headers.Authorization =
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsemhAdGVzdC5jb20iLCJzY29wZSI6WyJzZXJ2ZXIiXSwidGVuYW50SWQiOiIwYWRiMDRkNTQ3MjM0M2VhMjNjMDhkM2YzMGQ0MzY0YiIsInNvdXJjZSI6MSwiZXhwIjoxNjgyNTE4Njg1LCJpc1RlbmFudENyZWF0b3IiOjAsInVzZXJJZCI6IjAzODMxNGI1MTRiZDIzMjlkMjVjZmE4MjJlYmQxZmNkIiwianRpIjoiYTMzZTQyNWEtMWVkYi00Yzk3LTk2YjgtYWVkNWM4NTQ5Y2M4IiwiY2xpZW50X2lkIjoiaXN0cm9tX29hdXRoIiwidXNlcm5hbWUiOiJsemhAdGVzdC5jb20ifQ.RcOh5u-Lc7csoNPHkrz0KxzlZOyDIaOe8C36JqAhjZ-WbB5KI5WqREtuPi9Pzf88RQ-DN5b7GDTrz_5r2eLApmXEUPQ1bYeIVGco1nyq7JA2jj1pwSDSBJmjsl3Dy7QCqOjqjtWWwup0LuRxkMhZnl14ek8he6mTbGWeN0m3pT4B_upXS5gc7-OtRD0DXRccCAbhjusGQb4TmG72l7wlOR-oImkwF-iI6rwnbDpr428mqcSpCes8FkTQ09A3Och16jx9jwmTWD07N6VV2LweJA0p9L0iYLgr-HteNaF_LYcNecM3fsWp3fd9zFeMZ8_CXKxdenv1gRMB7Kvl6gk-lQ";
    }
    if (loading) {
      axiosLoading.addloading({ fullscreen: true });
    }
    return config;
  },
  (error: AxiosError) => {
    // Message.error(error);
    axiosLoading.closeLoading();
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("response", response);
    axiosCanle.removePedding(response.config);
    axiosLoading.closeLoading();
    return response;
  },
  (error: AxiosError) => {
    // Message.error(error);
    console.log("error", error);
    axiosLoading.closeLoading();
    error.config && axiosCanle.removePedding(error.config);
    return Promise.reject(error);
  }
);
// service.get<Resp>("/rbac/license/check").then((result) => {
//   const data = result;
// });

// const http = {
//   get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<ResponseType<T>> {
//     return service.get(url, config);
//   },
// };
// const request = async <T>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
//   const { data } = await service.request<ResponseType<T>>(config);
//   return data;
// };

export const http = {
  async request<T>(url: string, method = "GET", data?: any, config?: axiosConfig): Promise<ResponseType<T>> {
    const options = { ...defaultConfig, ...config };
    const res = await service<ResponseType<T>>({
      url,
      method,
      ...data,
      requestOptions: options,
    });
    return res.data;
  },
  async get<T>(url: string, data: any, config?: axiosConfig): Promise<ResponseType<T>> {
    return http.request(url, "GET", { params: data }, config);
  },
  async post<T>(url: string, data?: any, config?: axiosConfig): Promise<ResponseType<T>> {
    return http.request(url, "POST", { data }, config);
  },
  async put<T>(url: string, data?: any, config?: axiosConfig): Promise<ResponseType<T>> {
    return http.request(url, "PUT", { data }, config);
  },
  async delete<T>(url: string, data?: any, config?: axiosConfig): Promise<ResponseType<T>> {
    return http.request(url, "DELETE", { params: data }, config);
  },
};
