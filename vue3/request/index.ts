/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-01-12 10:05:58
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-10 14:14:57
 * @description: 描述
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { ResponseType } from "./type";
import { AxiosCancle } from "./cancle";

const axiosCanle = new AxiosCancle();
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 50000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    axiosCanle.addPending(config);
    config.headers.Authorization =
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJiY21zM0BiY21zMy5jb20iLCJzY29wZSI6WyJzZXJ2ZXIiXSwidGVuYW50SWQiOiIwYWRiMDRkNTQ3MjM0M2VhMjNjMDhkM2YzMGQ0MzY0YiIsInNvdXJjZSI6MCwiZXhwIjoxNjgxNTY2NTY4LCJpc1RlbmFudENyZWF0b3IiOjEsInVzZXJJZCI6IjllZDNhOTE1NTljYzljZjFkNzVkZDBhN2VmY2QwNDlmIiwianRpIjoiOGIxYmMwZDAtMzUyNi00YmVlLTg1YmUtMWNhNzlhZTdiMWRhIiwiY2xpZW50X2lkIjoiaXN0cm9tX29hdXRoIiwidXNlcm5hbWUiOiJiY21zM0BiY21zMy5jb20ifQ.kmxpLzwOyOnOnKlj2GG7Fj92x4GSzh69yKIGDzYhOowWEGl32_wrce7vR5YNv9JzfSibyQFRsUaGA0VzYNuOH5BxFk6EPpSrabpbzIwoxr_fuif0NXSmcWDHTQIBUoour8xy1u76-Z7EjZnxCSQ7x-D1l2QMvVLR2pd935pyxAZN9KihsyD43IyuW3Hye1-5gWpNBADXQsE2w5zdkYANGaJ_0ZG7mvYiDfp0T4fsSJOhgmMKyBGKTftMKgy2v1wZKSQTtL6N_6NTuxL0xS2e5pP4iY1SsTzvRlN9UpZF7LsQEErxZ5QOiRNYSom6EDiQrCTnt8PpUZJ05nUc8UhCWA";
    //console.log(config);
    return config;
  },
  (error: AxiosError) => {
    //Message.error(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("response", response);
    console.log(3333);
    axiosCanle.removePedding(response.config);
    return response;
  },
  (error: AxiosError) => {
    // Message.error(error);
    if (error.code === "ERR_CANCELED") return Promise.reject(error);
    console.log(error);
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
  async request<T>(config: AxiosRequestConfig): Promise<ResponseType<T>> {
    const { data } = await service.request<ResponseType<T>>(config);
    if (data.code !== 200) {
      ElMessage.error(data.message);
    }
    return data;
  },
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
    const { data } = await service.get<ResponseType<T>>(url, config);
    return data;
  },
  async post<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResponseType<T>> {
    const { data } = await service.post<ResponseType<T>>(url, params, config);
    return data;
  },
};
