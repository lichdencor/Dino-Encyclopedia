import { useState } from "react";
import styles from "./Store.module.css";
import { Nav } from "../../../components";

export const Store = () => {
  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.storeContainer}>
        <div className={styles.floatingTokens}>
          <img className={styles.floatingToken1} src="assets/img/token/composition-token.png" alt="floating token 1" />
          <img className={styles.floatingToken2} src="assets/img/token/composition-token-rotation.png" alt="floating token 2" />
          <img className={styles.floatingToken3} src="assets/img/token/composition-token-rotation.png" alt="floating token 3" />
          <img className={styles.floatingToken4} src="assets/img/token/composition-token-rotation.png" alt="floating token 4" />
          <img className={styles.floatingToken5} src="assets/img/token/composition-token.png" alt="floating token 5" />
          <img className={styles.floatingToken6} src="assets/img/token/composition-token.png" alt="floating token 6" />
        </div>
        <span className={styles.comingSoonTxt}>- Próximamente -</span>
        <img className={styles.storeBg} src="assets/img/coming-soon/store-bg.png" alt="store-bg" />
      </div>
    </div>
  );
};
