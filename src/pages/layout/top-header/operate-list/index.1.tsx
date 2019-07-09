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
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// interface LangItem {
//   img: any
//   lang: string
//   field: string
// }
const netList = ['Testnet', 'Local RPC']
const LangList = [
  {
    img: Images.yingyu,
    lang: 'English',
    field: 'EN',
  },
  {
    img: Images.chinese,
    lang: 'Chinese',
    field: 'CHS',
  },
]
interface IState {
  menuNet: null | HTMLElement
  menuNetSelected: string
  menuLang: null | HTMLElement
  menuM: null | HTMLElement
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
    menuM: null,
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
    if (type === 'menuM') {
      this.setState({
        menuM: event.currentTarget,
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
    if (type === 'menuM') {
      this.setState({
        menuM: null,
      })
    }
  }
  selectMenu(type: string, val: any) {
    if (type === 'menuNet' || type === 'menuM') {
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
  langSelectContent(menuLang, menuLangOpen, menuLangSelected) {
    return (
      <div>
        <div
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
        </div>
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
    )
  }
  netSelectContent(menuNetSelected, menuNetOpen, menuNet) {
    return (
      <div>
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
    )
  }
  deployBtn() {
    return (
      <div className={styles.operateListPcItem}>
        <img src={Images.pc} alt="" className={styles.icon} />
        Deploy
      </div>
    )
  }
  refreshBtn() {
    return (
      <div className={styles.operateListPcItem}>
        <img src={Images.f5} alt="" className={styles.icon} />
        Refresh
      </div>
    )
  }
  render() {
    const { menuNet, menuNetSelected, menuLang, menuLangSelected, menuM } = this.state
    const menuNetOpen = Boolean(menuNet)
    const menuLangOpen = Boolean(menuLang)
    const menuMOpen = Boolean(menuM)
    const { isLogin } = this.props
    return (
      <div>
        <Hidden xsDown>
          <div className={styles.operateListPc}>
            {/* 需要登录的操作 */}
            {isLogin ? (
              <React.Fragment>
                {this.deployBtn()}
                {this.refreshBtn()}
              </React.Fragment>
            ) : null}
            <div className={styles.operateListPcItem}>
              {this.netSelectContent(menuNetSelected, menuNetOpen, menuNet)}
            </div>
            <div className={styles.operateListPcItem}>
              {this.langSelectContent(menuLang, menuLangOpen, menuLangSelected)}
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={styles.operateListM}>
            {isLogin ? (
              <React.Fragment>
                <IconButton
                  aria-label="More"
                  aria-controls="menuM"
                  aria-haspopup="true"
                  onClick={e => {
                    this.handleMenu(e, 'menuM')
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Popper open={menuMOpen} anchorEl={menuM} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper id="menuM">
                        <ClickAwayListener
                          onClickAway={() => {
                            this.handleClose('menuM')
                          }}
                        >
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                this.handleClose('menuM')
                              }}
                            >
                              {this.deployBtn()}
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.handleClose('menuM')
                              }}
                            >
                              {this.refreshBtn()}
                            </MenuItem>
                            <Divider />
                            {netList.map((v, i) => {
                              return (
                                <MenuItem
                                  key={i}
                                  selected={v === menuNetSelected}
                                  onClick={() => {
                                    this.selectMenu('menuM', v)
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
              </React.Fragment>
            ) : (
              this.netSelectContent(menuNetSelected, menuNetOpen, menuNet)
            )}
            {this.langSelectContent(menuLang, menuLangOpen, menuLangSelected)}
          </div>
        </Hidden>
      </div>
    )
  }
}
export default OperateList
