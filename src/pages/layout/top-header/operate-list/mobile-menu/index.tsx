import React, { Component } from 'react'
import styles from './style.module.scss'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RefreshBtn from '../refresh-btn/index'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'

type IProps = I18NProps & {
  isLogin?: boolean
  lockStatus?: boolean
  refreshAction?: () => void
}

interface IState {
  menuM: null | HTMLElement
  menuNetSelected: string
}
class NetSelect extends Component<IProps, IState> {
  state = {
    menuM: null,
    menuNetSelected: 'mainnet',
  }
  handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({
      menuM: event.currentTarget,
    })
  }
  handleClose() {
    this.setState({
      menuM: null,
    })
  }
  selectMenu(val: any) {
    this.setState({
      menuNetSelected: val,
    })
    this.handleClose()
  }
  render() {
    const { menuM, menuNetSelected } = this.state
    const { lockStatus, isLogin, I18N } = this.props
    const menuMOpen = Boolean(menuM)
    const netList = [{ value: 'mainnet', text: I18N.Layout.MenuList.mainnet }]
    return (
      <div className={styles.operateListItem}>
        <IconButton
          aria-label="More"
          aria-controls="menuM"
          aria-haspopup="true"
          onClick={e => {
            this.handleMenu(e)
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <div className={styles.popperWrap}>
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
                      this.handleClose()
                    }}
                  >
                    <MenuList className={styles.selectMenuList}>
                      {/* <MenuItem
                      onClick={() => {
                        this.handleClose()
                      }}
                    >
                      <DeployBtn lockStatus={lockStatus}/>
                    </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          this.handleClose()
                        }}
                      >
                        <RefreshBtn
                          lockStatus={lockStatus}
                          isLogin={isLogin}
                          refreshAction={this.props.refreshAction}
                        />
                      </MenuItem>
                      <Divider />
                      {netList.map((item, i) => {
                        return (
                          <MenuItem
                            key={i}
                            selected={item.value === menuNetSelected}
                            onClick={() => {
                              this.selectMenu(item.value)
                            }}
                          >
                            {item.text}
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
