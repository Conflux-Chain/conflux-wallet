import React, { Component } from 'react'
import classnames from 'classnames'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import { LangEnum } from '@/i18n/typing'
import styles from './style.module.scss'
import Hidden from '@material-ui/core/Hidden'
import imgs from '../../assets/images'

class About extends Component<I18NProps> {
  render() {
    const { I18N } = this.props
    const isEnglish = I18N.currentLang === LangEnum.en_US
    return (
      <div className={styles.about}>
        <h1 className={styles.h1}>{I18N.About.h1}</h1>
        <div className={styles.container1}>
          <div className={styles.conBox}>
            <p className={styles.title}>{I18N.About.title}</p>
            <p className={styles.con}>{I18N.About.conFC}</p>
          </div>
          <Hidden only={['xs', 'sm']}>
            <div className={styles.ballSmall} />
            <div className={styles.ballBig} />
          </Hidden>
        </div>
        <h2 className={styles.h2}>{I18N.About.firstH2}</h2>
        <div className={styles.container2} id="#principle">
          <div className={styles.line1}>
            <div className={isEnglish ? classnames(styles.item1, styles.item0) : styles.item1}>
              <svg className={classnames(styles.icon, styles.icon1)} aria-hidden="true">
                <use xlinkHref="#iconhuabanfuben" />
              </svg>
              <h3 className={styles.h3}>{I18N.About.firstH3}</h3>
              <p className={styles.p}>{I18N.About.contain1}</p>
            </div>
            <div className={isEnglish ? classnames(styles.item1, styles.item2) : styles.item1}>
              <svg className={classnames(styles.icon, styles.icon2)} aria-hidden="true">
                <use xlinkHref="#iconxianjinyuezhifu" />
              </svg>
              <h3 className={styles.h3}>{I18N.About.secondH3}</h3>
              <p className={styles.p}>{I18N.About.contain2}</p>
            </div>
          </div>
          <div className={styles.line2}>
            <div className={styles.leftBox}>
              <div className={styles.titleBox}>
                <svg className={classnames(styles.iconSpe, styles.icon3)} aria-hidden="true">
                  <use xlinkHref="#iconsheji" />
                </svg>
                <h3 className={styles.h3}>{I18N.About.thirdH3}</h3>
              </div>
              <div className={styles.item2}>
                <p className={styles.p}>{I18N.About.contain3}</p>
              </div>
            </div>
            <div className={styles.imgBox}>
              <img
                className={styles.rightImg1}
                alt=""
                src={isEnglish ? imgs.about1EN : imgs.about1ZH}
              />
            </div>
          </div>
          <div className={classnames(styles.line2, styles.line3)}>
            <div className={styles.leftBox}>
              <div className={styles.item2}>
                <p className={styles.p}>{I18N.About.contain4}</p>
              </div>
            </div>
            <div className={styles.imgBox}>
              <img
                className={styles.rightImg2}
                alt=""
                src={isEnglish ? imgs.about2EN : imgs.about2ZH}
              />
            </div>
          </div>
        </div>
        <h2 className={styles.h2}>{I18N.About.secondH2}</h2>
        <div className={styles.container3}>
          <img src={imgs.personPng} className={styles.person} alt="person" />
          <p className={styles.p} style={{ textAlign: 'center' }}>
            {I18N.About.contain5}
          </p>
        </div>
      </div>
    )
  }
}

export default I18NHOC(About)
