import React, { Component } from 'react'
import styles from './style.module.scss'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
const LangList = [
  {
    img: (
      <svg className={styles.countryIcon} aria-hidden="true">
        <use xlinkHref="#iconyingyu" />
      </svg>
    ),
    lang: 'English',
    field: 'EN',
  },
  {
    img: (
      <svg className={styles.countryIcon} aria-hidden="true">
        <use xlinkHref="#iconchinese" />
      </svg>
    ),
    lang: 'Chinese',
    field: 'CHS',
  },
]
interface IState {
  menuLang: null | HTMLElement
  menuLangSelected: number
}
class NetSelect extends Component<{}, IState> {
  state = {
    menuLang: null,
    menuLangSelected: 0,
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
    const menuLangOpen = Boolean(menuLang)
    return (
      <div className={styles.operateListItem}>
        <div
          aria-label="Account of current user"
          aria-controls="menuLang"
          aria-haspopup="true"
          onClick={e => {
            this.handleMenu(e)
          }}
        >
          {LangList[menuLangSelected].img}
          {LangList[menuLangSelected].field}
          <svg className={styles.triangleIcon} aria-hidden="true">
            <use xlinkHref="#icondown" />
          </svg>
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
                    this.handleClose()
                  }}
                >
                  <MenuList className={styles.selectMenuList}>
                    {LangList.map((v, i) => {
                      return (
                        <MenuItem
                          key={i}
                          selected={i === menuLangSelected}
                          onClick={() => {
                            this.selectMenu(i)
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
}
export default NetSelect
