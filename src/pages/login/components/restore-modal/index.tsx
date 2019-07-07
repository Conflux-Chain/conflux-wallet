import React, { useState } from 'react'
import { styled } from '@material-ui/styles'
import classnames from 'classnames'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Mycontainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

interface IState {
  password: string
  showPassword: boolean
}

const RestoreModal = ({ open, onClose }) => {
  const [values, setValues] = useState<IState>({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }
  return (
    <Modal open={open} onClose={onClose} className={styles.restoreModal}>
      <Mycontainer>
        <div className={styles.container}>
          <div className={styles.dotBox}>
            <div className={classnames(styles.dotItem, styles.dotItemAc)} />
            <div className={styles.dotItem} />
          </div>
          <div className={styles.container1}>
            <div className={styles.uploadBox}>
              <svg className={styles.uploadIc} aria-hidden="true">
                <use xlinkHref="#iconwenjian-" />
              </svg>
            </div>
            <p className={styles.tips}>Hello, you should upload keystore file firstly.</p>
            <Button variant="contained" className={styles.button}>
              Continue
            </Button>
          </div>
          <div className={styles.container2}>
            <TextField
              id="input-adornment-password"
              variant="standard"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              error
            />
            <Button variant="contained" className={styles.button}>
              Continue
            </Button>
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <p className={styles.words}>
            If you have no account, please<span className={styles.linkName}>Create Wallet</span>>>
          </p>
          <div className={styles.errorBox}>
            <p className={styles.errorInfo}>JSON Parse error: “Unrecognize token”</p>
          </div>
        </div>
      </Mycontainer>
    </Modal>
  )
}
export default RestoreModal
