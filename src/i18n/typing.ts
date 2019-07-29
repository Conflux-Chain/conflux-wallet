export interface IAPI {
  /** 当前设置的语言 */
  currentLang: LangEnum
  /**
   * 初始化对应语言
   * @param lang: 对应语言
   * @param metas: 所有语言的语言文件
   */
  init(lang: string, metas: object): IAPI
  /**
   * 设置对应语言
   * @param lang: 切换的对应语言
   */
  setLang(lang: LangEnum): void
  /**
   * 重写设置语言函数
   * @param lang: 切换的对应语言
   */
  setLangHandle(lang: LangEnum): void
  /**
   * 模板填充, 获取对应语言的模板值
   * @param template: 对应语言的模板
   * @param args: 模板的参数
   */
  template(str: string, args: object): string
  /**
   * 获取对应语言的值
   * @param name: 对应语言的模板的 Key
   * @param options: 模板的参数
   */
  get(name: string, args?: object): string
}
export enum LangEnum {
  zh_CN = 'zh-CN',
  en_US = 'en-US',
}
