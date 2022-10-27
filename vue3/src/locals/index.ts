/*
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-30 14:53:11
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-30 16:57:52
 * @description: 
 */
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import {getLanguage} from '@/utils/cookie'
const messages = {
  zh,
  en,
}
export const getLocale = () => {
  const cookieLang = getLanguage();
  if (cookieLang) {
    document.documentElement.lang = cookieLang
    return cookieLang
  }
  const language = navigator.language.toLocaleLowerCase();
  for (const locale of Object.keys(messages)) {
    if (language.includes(locale)) {
      document.documentElement.lang = locale
      return locale
    }
  
  }
return 'en'
}

const i18n = createI18n({
  legacy:false,
  locale: getLocale(),
  messages
})
export default i18n