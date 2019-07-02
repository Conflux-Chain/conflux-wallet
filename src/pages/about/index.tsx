import React, { Component } from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
export default class Index extends Component {
  render() {
    return (
      <>
        <h1 className={styles.testFin}>About</h1>
        <Link to="/">back home</Link>
      </>
    )
  }
}
