import React from 'react'
import styles from "./Wallet.module.css";
import { Nav } from '../../../components';

export const Wallet = () => {
  return (
    <div className={styles.wallet_container}>
    <Nav />

    <span className={styles.coming_soon_txt}>- COMING SOON -</span>
    <img className={styles.wallet_bg} src="assets/img/coming-soon/wallet-bg.png" alt="wallet-bg" />
  </div>
  )
}
