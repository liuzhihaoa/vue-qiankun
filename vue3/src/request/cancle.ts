/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-07 16:58:28
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-20 10:44:06
 * @description: 描述
 */

import type { AxiosRequestConfig } from "axios";

export class AxiosCancle {
  pendingMap: Map<string, AbortController>;
  constructor() {
    this.pendingMap = new Map<string, AbortController>();
  }
  generateKey(config: AxiosRequestConfig) {
    let { method, url, params, data } = config;
    if (typeof data === "string") data = JSON.parse(data);
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
  }
  addPending(config: AxiosRequestConfig) {
    this.removePedding(config);
    const key: string = this.generateKey(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    this.pendingMap.set(key, controller);
  }

  removePedding(config: AxiosRequestConfig) {
    const key: string = this.generateKey(config);
    if (this.pendingMap.has(key)) {
      this.pendingMap.get(key)?.abort();
      this.pendingMap.delete(key);
    }
  }
}
