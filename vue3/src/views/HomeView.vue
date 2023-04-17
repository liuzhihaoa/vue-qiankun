<template>
  <input type="file" @change="onChange" ref="img" />
  <button @click="onContinue">继续</button>
  <button @click="noSuspend">暂停</button>
  <div class="progress-frame">
    <div class="progress"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
//为下面取消请求做准备
const CancelToken = axios.CancelToken;
export default {
  name: "App",
  setup() {
    let img = ref("");
    //用来计算进度条 （alreadyUpload/uploadTotal）*100
    let alreadyUpload = ref(0);
    let uploadTotal = ref(1);
    //请求取消的数组
    let cancel = ref([]);
    let isChange = ref(false);

    async function onChange() {
      let sum = [];
      let file = img.value.files[0];
      let size = 1024 * 20; //20kB 切片大小，可以调大点
      let fileChunks = [];
      let index = 0; //切片序号
      isChange.value = true;
      // 获取已上传的切片
      await axios({
        method: "get",
        url: "http://127.0.0.1:3000/alreadyFile",
        params: {
          filename: file.name,
        },
        //用于取消请求
        cancelToken: new CancelToken(function executor(c) {
          cancel.value.push(c);
        }),
      })
        .then((response) => {
          //返回值是一个已上传切片数组
          sum = response.data;
          alreadyUpload.value = sum.length;
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
      // 对二进制文件进行切片
      debugger;
      for (let cur = 0; cur < file.size; cur += size) {
        fileChunks.push({
          hash: index++,
          chunk: file.slice(cur, cur + size),
        });
      }
      uploadTotal.value = fileChunks.length;
      // 判断切片是否全部上传完毕
      if (sum.length != fileChunks.length) {
        for (let i = 0; i < fileChunks.length; i++) {
          let item = fileChunks[i];
          let formData = new FormData();
          formData.append("filename", file.name);
          formData.append("hash", String(item.hash));
          formData.append("chunk", item.chunk);
          //判断某个切片是否上传完毕
          if (sum.indexOf(item.hash) == -1) {
            // 上传切片
            axios({
              method: "post",
              url: "http://127.0.0.1:3000/upload",
              data: formData,
              onUploadProgress: (pregress) => {
                console.log(pregress);
              },
              cancelToken: new CancelToken(function executor(c) {
                cancel.value.push(c);
              }),
            })
              .then(() => {
                alreadyUpload.value = alreadyUpload.value + 1;
              })
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              .catch(() => {});
          } else {
            continue;
          }
        }
      } else {
        console.log("上传已结束");
      }
      //请求文件链接
      await axios({
        method: "get",
        url: "http://127.0.0.1:3000/fileLink",
        params: {
          filename: file.name,
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel.value.push(c);
        }),
      })
        .then((response) => {
          //返回文件链接
          console.log(response.data);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    }

    //点击暂停按钮
    const noSuspend = () => {
      console.log("请求已取消");
      cancel.value.forEach((val) => {
        val();
      });
    };
    //点击继续按钮
    const onContinue = () => {
      if (isChange.value) {
        onChange();
      }
    };
    return {
      img,
      onChange,
      alreadyUpload,
      uploadTotal,
      noSuspend,
      onContinue,
    };
  },
};
</script>

<style scoped>
.progress-frame {
  width: 500px;
  height: 32px;
  background-color: aqua;
}
.progress {
  width: v-bind("(alreadyUpload/uploadTotal)*100+'%'");
  height: 32px;
  background-color: red;
}
</style>
