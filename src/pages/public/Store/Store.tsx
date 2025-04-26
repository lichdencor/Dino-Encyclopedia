import { useState } from "react";
import styles from "./Store.module.css";
import { Nav } from "../../../components";

export const Store = () => {
  return (
    <div className={styles.store_container}>
      <Nav />

      <div className={styles.floating_tokens}>
        <img className={styles.floating_token_1} src="assets/img/token/composition-token.png" alt="floating token 1" />
        <img className={styles.floating_token_2} src="assets/img/token/composition-token-rotation.png" alt="floating token 2" />
        <img className={styles.floating_token_3} src="assets/img/token/composition-token-rotation.png" alt="floating token 3" />
        <img className={styles.floating_token_4} src="assets/img/token/composition-token-rotation.png" alt="floating token 4" />
        
      </div>
      <span className={styles.coming_soon_txt}>- COMING SOON -</span>
      <img className={styles.store_bg} src="assets/img/coming-soon/store-bg.png" alt="store-bg" />
    </div>
  );
};
