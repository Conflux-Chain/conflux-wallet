import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'

interface IState {
  menuLang: null | HTMLElement
  menuLangSelected: number
}
interface IProps extends Partial<I18NProps> {
  lockStatus?: boolean
}
class NetSelect extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  constructor(props) {
    super(props)
    const initState = {
      menuLang: null,
      menuLangSelected: 0,
    }
    const { I18N } = this.props
    I18N.Layout.LangSelect.LangList.forEach((v, i) => {
      if (v.lang === I18N.currentLang) {
        initState.menuLangSelected = i
        this.props.setLangTriggerRender(v.lang)
      }
    })
    this.state = initState
  }
  handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({
      menuLang: event.currentTarget,
    })
  }
  handleClose() {
    this.setState({
      menuLang: null,
    })
  }
  selectMenu(val: any) {
    this.setState({
      menuLangSelected: val,
    })
    this.handleClose()
  }
  render() {
    const { menuLang, menuLangSelected } = this.state
    const { lockStatus, I18N } = this.props
    const menuLangOpen = Boolean(menuLang)
    return (
      <div className={classnames(styles.operateListItem, lockStatus ? styles.lockStatus : null)}>
        <div
          aria-label="Account of current user"
          aria-controls="menuLang"
          aria-haspopup="true"
          onClick={e => {
            if (!lockStatus) {
              this.handleMenu(e)
            }
          }}
        >
          <svg className={styles.countryIcon} aria-hidden="true">
            <use xlinkHref={I18N.Layout.LangSelect.LangList[menuLangSelected].iconName} />
          </svg>
          {I18N.Layout.LangSelect.LangList[menuLangSelected].field}
          <svg className={styles.triangleIcon} aria-hidden="true">
            <use xlinkHref="#icondown" />
          </svg>
        </div>
        <div className={styles.popperWrap}>
          <Popper open={menuLangOpen} anchorEl={menuLang} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper id="menuLang">
                  <ClickAwayListener
                    onClickAway={() => {
                      this.handleClose()
                    }}
                  >
                    <MenuList className={styles.selectMenuList}>
                      {I18N.Layout.LangSelect.LangList.map((v, i) => {
                        return (
                          <MenuItem
                            key={i}
                            selected={i === menuLangSelected}
                            onClick={() => {
                              this.selectMenu(i)
                              this.props.setLangTriggerRender(v.lang)
                            }}
                          >
                            {v.selectField}
                          </MenuItem>
                        )
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    )
  }
}
export default I18NHOC(NetSelect) as any
