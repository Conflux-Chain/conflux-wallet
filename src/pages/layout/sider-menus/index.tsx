import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import Hidden from '@material-ui/core/Hidden'
export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const anchorRef = React.useRef(null)
  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div>
      <Hidden xsDown>
        <div className={styles.operateListPc}>
          <div className={styles.operateListPcItem}>
            <img src={Images.pc} alt="" className={styles.icon} />
            Deploy
          </div>
          <div className={styles.operateListPcItem}>
            <img src={Images.f5} alt="" className={styles.icon} />
            Refresh
          </div>
          <div className={styles.operateListPcItem}>
            <span
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              Testnet
              <img src={Images.down} alt="" className={styles.triangleIcon} />
            </span>
            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper id="menu-list-grow">
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem onClick={handleClose}>Testnet</MenuItem>
                        <MenuItem onClick={handleClose}>Local RPC</MenuItem>
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
