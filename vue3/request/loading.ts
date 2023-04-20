import { ElLoading } from "element-plus";

class AxiosLoading {
  private loadingCount: number;
  private loadingInstance: any;
  constructor() {
    this.loadingCount = 0;
  }
  addloading(options?: any) {
    if (this.loadingCount === 0) {
      this.loadingInstance = ElLoading.service(options);
    }
    this.loadingCount++;
  }
  closeLoading() {
    if (this.loadingCount > 0) {
      this.loadingInstance?.close();
    }
    this.loadingCount--;
  }
}

export default new AxiosLoading();
