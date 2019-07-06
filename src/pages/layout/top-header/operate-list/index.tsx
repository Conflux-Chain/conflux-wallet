import React, { Component } from 'react'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Hidden from '@material-ui/core/Hidden'
// interface LangItem {
//   img: any
//   lang: string
//   field: string
// }
const netList = ['Testnet', 'Local RPC']
const LangList = [
  {
    img: Images.chinese,
    lang: 'Chinese',
    field: 'CHS',
  },
  {
    img: Images.yingyu,
    lang: 'English',
    field: 'EN',
  },
]
interface IState {
  menuNet: null | HTMLElement
  menuNetSelected: string
  menuLang: null | HTMLElement
  menuLangSelected: number
}
interface IProps {
  isLogin: boolean
}
class OperateList extends Component<IProps, IState> {
  static defaultProps = { isLogin: false }
  state = {
    menuNet: null,
    menuNetSelected: 'Testnet',
    menuLang: null,
    menuLangSelected: 0,
  }
  handleMenu(event: React.MouseEvent<HTMLElement>, type: string) {
    if (type === 'menuNet') {
      this.setState({
        menuNet: event.currentTarget,
      })
    }
    if (type === 'menuLang') {
      this.setState({
        menuLang: event.currentTarget,
      })
    }
  }
  handleClose(type: string) {
    if (type === 'menuNet') {
      this.setState({
        menuNet: null,
      })
    }
    if (type === 'menuLang') {
      this.setState({
        menuLang: null,
      })
    }
  }
  selectMenu(type: string, val: any) {
    if (type === 'menuNet') {
      this.setState({
        menuNetSelected: val,
      })
    }
    if (type === 'menuLang') {
      this.setState({
        menuLangSelected: val,
      })
    }
    this.handleClose(type)
  }
  render() {
    const { menuNet, menuNetSelected, menuLang, menuLangSelected } = this.state
    const menuNetOpen = Boolean(menuNet)
    const menuLangOpen = Boolean(menuLang)
    const { isLogin } = this.props
    return (
      <div>
        <Hidden xsDown>
          <div className={styles.operateListPc}>
            {/* 需要登录的操作 */}
            {isLogin ? (
              <React.Fragment>
                <div className={styles.operateListPcItem}>
                  <img src={Images.pc} alt="" className={styles.icon} />
                  Deploy
                </div>
                <div className={styles.operateListPcItem}>
                  <img src={Images.f5} alt="" className={styles.icon} />
                  Refresh
                </div>
              </React.Fragment>
            ) : null}
            <div className={styles.operateListPcItem}>
              <span
                aria-label="Account of current user"
                aria-controls="menuNet"
                aria-haspopup="true"
                onClick={e => {
                  this.handleMenu(e, 'menuNet')
                }}
              >
                {menuNetSelected}
                <img src={Images.down} alt="" className={styles.triangleIcon} />
              </span>
              <Popper open={menuNetOpen} anchorEl={menuNet} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper id="menuNet">
                      <ClickAwayListener
                        onClickAway={() => {
                          this.handleClose('menuNet')
                        }}
                      >
                        <MenuList>
                          {netList.map((v, i) => {
                            return (
                              <MenuItem
                                key={i}
                                selected={v === menuNetSelected}
                                onClick={() => {
                                  this.selectMenu('menuNet', v)
                                }}
                              >
                                {v}
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
            <div className={styles.operateListPcItem}>
              <span
                aria-label="Account of current user"
                aria-controls="menuLang"
                aria-haspopup="true"
                onClick={e => {
                  this.handleMenu(e, 'menuLang')
                }}
              >
                <img src={LangList[menuLangSelected].img} alt="" className={styles.countryIcon} />
                {LangList[menuLangSelected].field}
                <img src={Images.down} alt="" className={styles.triangleIcon} />
              </span>
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
                          this.handleClose('menuLang')
                        }}
                      >
                        <MenuList>
                          {LangList.map((v, i) => {
                            return (
                              <MenuItem
                                key={i}
                                selected={i === menuLangSelected}
                                onClick={() => {
                                  this.selectMenu('menuLang', i)
                                }}
                              >
                                {v.lang}
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
        </Hidden>
        <Hidden smUp>smUp</Hidden>
      </div>
    )
  }
}
export default OperateList
