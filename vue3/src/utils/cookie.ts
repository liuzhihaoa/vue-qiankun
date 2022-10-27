/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-30 15:06:43
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-30 15:10:38
 * @description: 
 */

import Cookies from 'js-cookie'
const languageKey = 'language'

const getLanguage = () => Cookies.get(languageKey)
const setLanguage = (language: string) => Cookies.set(languageKey, language)

export {
  getLanguage,
  setLanguage
}