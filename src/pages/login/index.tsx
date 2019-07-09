import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'
import { namespace } from '@/models/home'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import RestoreModal from './components/restore-modal'
import CreatModal from './components/creat-modal'

type IProps = IDispatch &
  I18NProps & {
    testState: number
  }

interface IState {
  restoreModal: boolean
  creatModal: boolean
}

class Login extends Component<IProps, IState> {
  state = {
    restoreModal: false,
    creatModal: false,
  }
  toogleRestore = () => {
    const { restoreModal } = this.state
    this.setState({
      restoreModal: !restoreModal,
    })
  }
  toogleCreat = () => {
    const { creatModal } = this.state
    this.setState({
      creatModal: !creatModal,
    })
  }
  render() {
    const { restoreModal, creatModal } = this.state
    return (
      <div className={styles.login}>
        <Container>
          <h2 className={styles.title}>Welcome to Conflux Wallet</h2>
          <div className={styles.conBox}>
            <Paper className={styles.paper} onClick={this.toogleRestore}>
              <svg className={classnames(styles.nowIcon, styles.icon1)} aria-hidden="true">
                <use xlinkHref="#iconwenjian" />
              </svg>
              <h5 className={styles.paperTitle}>Restore Wallet</h5>
              <p className={styles.paperDesc}>If you have an account, please restore your wallet</p>
            </Paper>
            <Paper className={styles.paper} onClick={this.toogleCreat}>
              <svg className={classnames(styles.nowIcon, styles.icon2)} aria-hidden="true">
                <use xlinkHref="#iconxinjian" />
              </svg>
              <h5 className={styles.paperTitle}>Create Wallet</h5>
              <p className={styles.paperDesc}>If you have no account, please create wall</p>
            </Paper>
          </div>
        </Container>
        <RestoreModal open={restoreModal} onClose={this.toogleRestore} />
        <CreatModal open={creatModal} onClose={this.toogleCreat} />
      </div>
    )
  }
}
const mapStateToProps = models => {
  return {
    ...models[namespace],
  }
}
export default connect(mapStateToProps)(I18NHOC(Login))
