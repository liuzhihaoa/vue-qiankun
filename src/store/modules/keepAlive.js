/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-12 18:34:32
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-29 10:45:23
 */
const data = () => ({
  keepAliveComponentsName: [], // 需要缓存的组件名称
  microList: {}, // 微应用缓存列表
  tabsList: [],
})

// mutations
const mutations = {
  // 重置，Push, splice keep-alive对象
  setKeepAliveComponentsName(state, nameArr) {
    state.keepAliveComponentsName = nameArr
  },
  addKeepAliveComponentsName(state, name) {
    state.keepAliveComponentsName.push(name)
  },
  delKeepAliveComponentsName(state, name) {
    const key = state.keepAliveComponentsName.indexOf(name)
    if (key !== -1) {
      state.keepAliveComponentsName.splice(key, 1)
      console.log(state.keepAliveComponentsName)
    }
  },
  SET_MICRO_LIST(state, playload) {
    state.microList = { ...playload }
  },
  SET_TABS_LIST (state, playload) {
    state.tabsList = [...playload]
  },
}

const getters = {
  keepAliveComponentsName(state) {
    return state.keepAliveComponentsName
  },
}

// actions
const actions = {

}

export default {
  namespaced: true,
  state: data,
  getters,
  actions,
  mutations,
}
