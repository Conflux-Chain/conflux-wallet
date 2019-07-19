import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
const netList = ['Testnet']
// const netList = ['Testnet', 'Local RPC']
interface IState {
  menuNet: null | HTMLElement
  menuNetSelected: string
}
interface IProps {
  lockStatus?: boolean
}
class NetSelect extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    menuNet: null,
    menuNetSelected: 'Testnet',
  }
  handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({
      menuNet: event.currentTarget,
    })
  }
  handleClose() {
    this.setState({
      menuNet: null,
    })
  }
  selectMenu(val: any) {
    this.setState({
      menuNetSelected: val,
    })
    this.handleClose()
  }
  render() {
    const { menuNet, menuNetSelected } = this.state
    const { lockStatus } = this.props
    const menuNetOpen = Boolean(menuNet)
    return (
      <div className={classnames(styles.operateListItem, lockStatus ? styles.lockStatus : null)}>
        <span
          aria-label="Account of current user"
          aria-controls="menuNet"
          aria-haspopup="true"
          onClick={e => {
            if (!lockStatus) {
              this.handleMenu(e)
            }
          }}
        >
          {menuNetSelected}
          <svg className={styles.triangleIcon} aria-hidden="true">
            <use xlinkHref="#icondown" />
          </svg>
        </span>
        <div className={styles.popperWrap}>
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
                      this.handleClose()
                    }}
                  >
                    <MenuList className={styles.selectMenuList}>
                      {netList.map((v, i) => {
                        return (
                          <MenuItem
                            key={i}
                            selected={v === menuNetSelected}
                            onClick={() => {
                              this.selectMenu(v)
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
      </div>
    )
  }
}
export default NetSelect
