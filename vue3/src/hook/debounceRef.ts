/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2023-10-12 17:05:08
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-10-12 17:11:08
 * @description: 描述
 */
import { customRef,Ref } from "vue"
export const debounceRef = <T>(value:T, duration = 1000):Ref<T> => {
  let timer:number = 0
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue:T) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, duration)
      }
      }
    })
}