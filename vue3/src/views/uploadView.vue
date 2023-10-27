<template>
  <label class="my-file">请选择一个文件：</label>
  <input type="file" id="my-file" name="my-file" @change="handleFileChange" />
  <div>
    <input type="button" value="停止" @click="handleStop" />
  </div>
  <div>上传进度：{{ progress.toFixed(2) }}%</div>
  <div>
    <button @click="changeCount">累加</button><span>{{ sum }}</span>
    <input type="text" v-model="num" />
    <div><input type="text" v-model="count" /></div>
  </div>
</template>
<script lang="ts">
// 解构
import { defineComponent, reactive, ref } from "vue";
import axios, { AxiosProgressEvent } from "axios";
import SparkMD5 from "spark-md5";
import { http } from "@/request";

// 模块化
export default defineComponent({
  name: "upload-view1", //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
  },
  setup(props, ctx) {
    interface FileChunk {
      chunkIndex: number;
      chunk: Blob;
    }
    //创建work多线程
    const createWorker = async (data: any): Promise<{ hash: string; chunks: FileChunk[] }> => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(new URL("../utils/hash.js", import.meta.url));
        console.log(worker);
        worker.postMessage({
          type: "hash",
          data: data,
        });
        worker.onmessage = (e) => {
          const { data } = e.data;
          resolve(data);
          worker.terminate();
        };
      });
    };
    const SIZE = 1024 * 1024 * 1; // 切片大小1MB
    const MAX_POOL = 3; // 最大并发数

    const POOL: Array<Promise<void>> = []; // 并发池

    const request = axios.create({
      baseURL: "http://127.0.0.1:4000/api",
      timeout: 60000,
    }).request;

    const progress = ref<number>(0);
    const progressArr = ref<number[]>([]);
    // const cancelFuncArr = reactive<AbortController[]>([]);
    const cancelFuncArr: AbortController[] = [];
    const totalSize = ref(Number.MAX_SAFE_INTEGER);
    const filename = ref("");
    const fileChunks = ref<FileChunk[]>([]);

    const setProgress = (curTotal: number, totalSize: number) => {
      progress.value = curTotal / totalSize > 100 ? 100 : curTotal / totalSize;
    };
    const handleUploadProgress = (progressEvent: AxiosProgressEvent, chunkIndex: number) => {
      if (progressEvent.total) {
        progressArr.value[chunkIndex] = progressEvent.loaded * 100;
        const curTotal = progressArr.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setProgress(curTotal, totalSize.value);
      }
    };

    const handleFinishedUploadProgress = (size: number, chunkIndex: number) => {
      progressArr.value[chunkIndex] = size * 100;
      const curTotal = progressArr.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setProgress(curTotal, totalSize.value);
    };

    const mergeFile = (filename: string, hash: string) => {
      if (!fileChunks.value.length) {
        return;
      }
      request({
        url: "/merge",
        method: "POST",
        data: { filename, hash },
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          console.log("合并成功");
        })
        .catch(() => {
          console.log("合并失败");
        });
    };

    const handleTask = (uplaodTask: Promise<void>) => {
      // 请求结束后将该Promise任务从并发池中移除
      const index = POOL.findIndex((t) => t === uplaodTask);
      POOL.splice(index);
    };

    const uploadFile = (formData: FormData, chunkIndex: number) => {
      const controller: AbortController = new AbortController();
      cancelFuncArr[chunkIndex] = controller;
      return http
        .post("http://127.0.0.1:4000/api/upload", formData, {
          cancelSame: false,
          onUploadProgress: (progressEvent) => handleUploadProgress(progressEvent, chunkIndex),
          signal: controller.signal,
        })
        .then(() => {
          console.log("上传成功");
        })
        .catch(() => {
          console.log("上传失败");
        });
      // return request({
      //   url: "/upload",
      //   method: "POST",
      //   data: formData,
      //   onUploadProgress: (progressEvent) => handleUploadProgress(progressEvent, chunkIndex),
      //   cancelToken: new axios.CancelToken((cancelFunc) => {
      //     cancelFuncArr.value[chunkIndex] = cancelFunc;
      //   }),
      // })
      //   .then(() => {
      //     console.log("上传成功");
      //   })
      //   .catch(() => {
      //     console.log("上传失败");
      //   });
    };

    const verifyUpload = (filename: string, hash: string) => {
      return new Promise<boolean | number[]>((resolve, reject) => {
        request<boolean | number[]>({
          url: "/verify",
          method: "POST",
          data: { filename, hash },
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const sliceChunks = async (hash: string, chunksSize: number[]) => {
      for (let i = 0; i < fileChunks.value.length; i++) {
        const fileChunk = fileChunks.value[i];
        const formData = new FormData();
        formData.append("filename", filename.value);
        formData.append("chunkIndex", String(fileChunk.chunkIndex));
        formData.append("hash", hash);
        formData.append("file", fileChunk.chunk);
        if (chunksSize[i] !== fileChunk.chunk.size) {
          // size一样的说明已经上传完毕了，只传size不一样的
          const uplaodTask = uploadFile(formData, i);
          POOL.push(uplaodTask);
          uplaodTask.then(() => handleTask(uplaodTask));
          if (POOL.length === MAX_POOL) {
            // 并发池跑完一个任务之后才会继续执行for循环，塞入一个新任务
            await Promise.race(POOL);
          }
        } else {
          handleFinishedUploadProgress(chunksSize[i], i);
        }
      }
      Promise.all(POOL).then(() => {
        mergeFile(filename.value, hash);
      });
    };

    const handleFileUpload = async (hash: string) => {
      const verifyRes = await verifyUpload(filename.value, hash).catch((e) => {
        console.error(e);
      });
      if (verifyRes !== undefined) {
        if (typeof verifyRes === "boolean") {
          if (verifyRes) {
            console.log("文件已经上传过，可以秒传");
            setProgress(100, 1);
          } else {
            POOL.length = 0;
            sliceChunks(
              hash,
              fileChunks.value.map(() => 0)
            );
          }
        } else {
          POOL.length = 0;
          sliceChunks(hash, verifyRes);
        }
      } else {
        console.log("验证失败");
      }
    };
    // const handleFileChange = async (evt: Event) => {
    //   let start = +new Date();
    //   const file = ((evt.target as HTMLInputElement).files as FileList)["0"];
    //   let chunkIndex = 0;
    //   totalSize.value = file.size;
    //   filename.value = file.name;
    //   const spark = new SparkMD5.ArrayBuffer();
    //   for (let cur = 0; cur < file.size; cur += SIZE) {
    //     fileChunks.value.push({
    //       chunkIndex: chunkIndex++,
    //       chunk: file.slice(cur, cur + SIZE),
    //     });
    //     spark.append(await file.slice(cur, cur + SIZE).arrayBuffer());
    //   }
    //   const hash = spark.end();
    //   console.log(+new Date() - start);
    //   progressArr.value = [];
    //   handleFileUpload(hash);
    // };

    const handleFileChange = async (evt: Event) => {
      const file = ((evt.target as HTMLInputElement).files as FileList)["0"];
      totalSize.value = file.size;
      filename.value = file.name;
      const { hash, chunks } = await createWorker({ file, SIZE });
      fileChunks.value = chunks;
      handleFileUpload(hash);
      progressArr.value = [];
    };

    const handleStop = () => {
      console.log(cancelFuncArr);
      // cancelFuncArr.forEach((cancelFunc) => {
      //   cancelFunc();
      // });
      for (const v of cancelFuncArr) {
        v?.abort();
      }
      fileChunks.value = [];
      setProgress(0, 1);
    };

    const num = ref<number>(0);
    const sum = ref<number>(0);
    const count = ref<number>(0);
    const changeCount = () => {
      for (let i = 0; i < num.value; i++) {
        sum.value += i;
      }
    };
    return {
      progress,
      handleFileChange,
      handleStop,
      num,
      sum,
      count,
      changeCount,
    };
  },
});
</script>
<style scoped>
/* scoped 使用得定义的样式只在本页面内生效  */
</style>
