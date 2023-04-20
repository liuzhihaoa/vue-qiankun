/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-01-12 10:05:58
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-20 11:52:03
 * @description: 描述
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
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
    const { cancelSame, loading, isToken } = config;
    if (cancelSame) {
      axiosCanle.addPending(config);
    }
    if (isToken) {
      config.headers.Authorization =
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsemhAdGVzdC5jb20iLCJzY29wZSI6WyJzZXJ2ZXIiXSwidGVuYW50SWQiOiIwYWRiMDRkNTQ3MjM0M2VhMjNjMDhkM2YzMGQ0MzY0YiIsInNvdXJjZSI6MSwiZXhwIjoxNjgyNjc4ODAzLCJpc1RlbmFudENyZWF0b3IiOjAsInVzZXJJZCI6IjAzODMxNGI1MTRiZDIzMjlkMjVjZmE4MjJlYmQxZmNkIiwianRpIjoiZmM5NDgyY2UtNWE5Mi00M2JlLWFjMzQtYTAzYjM5NTllNzA4IiwiY2xpZW50X2lkIjoiaXN0cm9tX29hdXRoIiwidXNlcm5hbWUiOiJsemhAdGVzdC5jb20ifQ.Pw0OLb196kgNcfdj2y-fB2ha0DWGBjOgk5XXbNB1gQmvnliTeBtqXfE_ANQO8-rYzKqL4AU94SqE5N2lpHlONZH8XqroSD1Q4hPmaYyViivdHXXhuetfyFrKIMKweO_pOy7kpvH8igQ0xeaj1BNu3Vf-iiqw7g4ZU6kEoL0SazRQ4NdzHX0igWNJ1gN4iGGuugjunbYEEwOSGi6yHC23jwSVDDR1nEHzNFCTJ8poRzbDNcHwt18ZEIISELAYEqkQy6uLUJlDWmMgZzJHrW0IYmKG8dWen8j70cynxxdhvR0POmzo9vRGwLqxgRGvxXicLnZBNHt8DkrQaZ2Pg5irpw";
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
      ...options,
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
