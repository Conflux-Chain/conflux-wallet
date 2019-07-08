import React, { useState } from 'react'
import { styled } from '@material-ui/styles'
import classnames from 'classnames'
import styles from './style.module.scss'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Mycontainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

interface IState {
  password: string
  showPassword: boolean
}

const CreatModal = ({ open, onClose }) => {
  const [values, setValues] = useState<IState>({
    password: '',
    showPassword: false,
  }) // 密码输入框

  const [stepIndex, setStepIndex] = useState(0) // 当前是第几步
  // const [isRight, setIsRight] = useState(false)
  const checkStatus = true // 文件验证是否通过
  // const [isPass, setIsPass] = useState(true) // 密码验证是否通过

  // 密码输入框改变
  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  // 下一步
  const nextStep = () => {
    if (checkStatus) {
      // 文件验证通过
      setStepIndex(1)
    } else {
      // setIsRight(false)
    }
  }

  // 密码验证
  // const checkPassword = () => {
  //   const result = false
  //   if (result) {
  //     // 验证通过
  //   } else {
  //     setIsPass(false)
  //   }
  // }
  return (
    <Modal open={open} onClose={onClose} className={styles.creatModal}>
      <Mycontainer>
        <div className={styles.container}>
          <div className={styles.dotBox}>
            <div
              className={stepIndex ? styles.dotItem : classnames(styles.dotItem, styles.dotItemAc)}
            />
            <div
              className={stepIndex ? classnames(styles.dotItem, styles.dotItemAc) : styles.dotItem}
            />
          </div>
          {!stepIndex ? (
            <div className={styles.container1}>
              <div className={styles.passWordLine}>
                <TextField
                  id="input-adornment-password"
                  className={styles.txt}
                  variant="standard"
                  type="password"
                  label="Your Password"
                  value={values.password}
                  onChange={handleChange('password')}
                  placeholder="Please Enter At Least 9 Characters"
                />
                <svg className={styles.qsIc} aria-hidden="true">
                  <use xlinkHref="#iconjieshi" />
                </svg>
              </div>
              <Button variant="contained" className={styles.button} onClick={nextStep}>
                Continue
              </Button>
            </div>
          ) : (
            <div className={styles.container2}>
              <Button variant="contained" className={styles.button}>
                Access Wallet
              </Button>
            </div>
          )}
        </div>
        <div className={styles.bottomInfo}>
          <p className={styles.words}>
            If you have an account, please<span className={styles.linkName}>Restore Wallet</span>>>
          </p>
        </div>
      </Mycontainer>
    </Modal>
  )
}
export default CreatModal
