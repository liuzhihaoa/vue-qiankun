/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-26 17:07:46
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-27 14:21:14
 * @description: 
 */
function emptyAction () {
  console.warn("Current execute action is empty!")
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  setActions (act) {
    this.actions = act;
  }

  onGlobalStateChange (...args) {
    const {onGlobalStateChange} =this.actions
    return onGlobalStateChange(...args)
  }
  setGlobalState (...args) {
    const { setGlobalState } = this.actions;
    return setGlobalState(...args)
  }
}
const actions = new Actions();
export default actions
