/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-04-12 15:52:29
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-14 14:33:31
 * @description: 描述
 */
import SparkMD5 from "spark-md5";

const calcSampleHash = async (file, SIZE) => {
  let start = performance.now();
  const size = file.size;
  const offset = 2 * 1024 * 1024;
  let chunks = [];
  let chunkIndex = 0;
  const spark = new SparkMD5.ArrayBuffer();
  for (let cur = 0; cur < file.size; cur += SIZE) {
    chunks.push({
      chunkIndex: chunkIndex++,
      chunk: file.slice(cur, cur + SIZE),
    });
  }
  // hash抽样: 第一个区块2M，中间区块每一块取前中后各2个字节，最后区块数据全要
  const sampleChunks = [file.slice(0, offset)];
  let cur = offset;
  while (cur < size) {
    if (cur + offset >= size) {
      sampleChunks.push(file.slice(cur, cur + offset));
    } else {
      const mid = cur + offset / 2,
        end = cur + offset;
      sampleChunks.push(file.slice(cur, cur + 2));
      sampleChunks.push(file.slice(mid, mid + 2));
      sampleChunks.push(file.slice(end - 2, end));
    }
    cur += offset;
  }
  spark.append(await file.slice(cur, cur + SIZE).arrayBuffer());
  const hash = spark.end();
  console.log("time1", performance.now() - start);
  return { hash, chunks };
};
const calcHash = async (file, SIZE) => {
  let chunks = [];
  let chunkIndex = 0;
  let start = performance.now();
  const spark = new SparkMD5.ArrayBuffer();
  for (let cur = 0; cur < file.size; cur += SIZE) {
    chunks.push({
      chunkIndex: chunkIndex++,
      chunk: file.slice(cur, cur + SIZE),
    });
    spark.append(await file.slice(cur, cur + SIZE).arrayBuffer());
  }
  //spark.append(await file.arrayBuffer());
  const hash = spark.end();
  console.log("time2", performance.now() - start);
  return { hash, chunks };
};
onmessage = async (e) => {
  let {
    data: { file, SIZE },
  } = e.data;
  let res = {};
  if (file.size > 2 * 1024 * 1024 * 1024) {
    res = await calcSampleHash(file, SIZE);
  } else {
    res = await calcHash(file, SIZE);
  }
  postMessage({
    type: "hash",
    data: res,
  });
};
