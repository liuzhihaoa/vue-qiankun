/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-26 16:20:10
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-30 17:15:43
 * @description:
 */
import { initGlobalState } from 'qiankun'
import { reactive } from 'vue'

const initState = reactive({
  type: '',
  from: 'main',
  playload: {},
})

const actions = initGlobalState(initState)

export default actions
