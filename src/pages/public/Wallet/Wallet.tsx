import React from 'react'
import styles from "./Wallet.module.css";
import { Nav } from '../../../components';

export const Wallet = () => {
  return (
    <div className={styles.wallet_container}>
    <Nav />

    <div className={styles.floating_tokens}>
        <img className={styles.floating_token_1} src="assets/img/token/composition-token.png" alt="floating token 1" />
        <img className={styles.floating_token_2} src="assets/img/token/composition-token-rotation.png" alt="floating token 2" />
        <img className={styles.floating_token_3} src="assets/img/token/composition-token-rotation.png" alt="floating token 3" />
        <img className={styles.floating_token_4} src="assets/img/token/composition-token-rotation.png" alt="floating token 4" />
        <img className={styles.floating_token_5} src="assets/img/token/composition-token.png" alt="floating token 5" />
        <img className={styles.floating_token_6} src="assets/img/token/composition-token.png" alt="floating token 6" />
      </div>

    <span className={styles.coming_soon_txt}>- Próximamente -</span>
    <img className={styles.wallet_bg} src="assets/img/coming-soon/wallet-bg.png" alt="wallet-bg" />
  </div>
  )
}
