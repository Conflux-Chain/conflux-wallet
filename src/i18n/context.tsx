import React from 'react'
import { LangEnum } from './typing'
import I18N, { Langs } from './index'
export const I18NContext = React.createContext({
  I18N,
  setLangTriggerRender: (lang: LangEnum) => {},
})
export class I18NContextWrapper extends React.Component<
  {},
  {
    I18N: Langs
    setLangTriggerRender: (lang: LangEnum) => void
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      I18N,
      setLangTriggerRender: this.setLang,
    }
  }

  setLang = (lang: LangEnum) => {
    if (lang === I18N.currentLang) {
      return
    }
    I18N.setLangHandle(lang)
    this.setState((state: any) => ({
      I18N: state.I18N,
    }))
  }
  render() {
    return <I18NContext.Provider value={this.state}>{this.props.children}</I18NContext.Provider>
  }
}
