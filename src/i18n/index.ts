import { getLocalStorage } from '@/utils/storage'
import kiwiIntl from 'kiwi-intl'
import enUsLangs from './langs/en_US'
import zhCNLangs from './langs/zh_CN'
import { IAPI, LangEnum } from './typing'

export type Langs = typeof enUsLangs & IAPI

export const langs = {
  [LangEnum.zh_CN]: zhCNLangs,
  [LangEnum.en_US]: enUsLangs,
}
// 初始化
const I18N = (kiwiIntl.init(LangEnum.en_US, langs) as any) as Langs

if (navigator.language.indexOf('zh') === 0) {
  I18N.currentLang = LangEnum.zh_CN
} else {
  I18N.currentLang = LangEnum.en_US
}

// 重写setLang
I18N.setLangHandle = (lang: LangEnum) => {
  I18N.currentLang = lang
  I18N.setLang(lang)
}

// 根据用户上次选择语言重置
const lastLang = getLocalStorage('currentLang') as LangEnum
if (lastLang) {
  I18N.setLangHandle(lastLang)
}

export default I18N
