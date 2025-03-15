import styles from "./Cretaceous-Inferior.module.css";

import { Nav } from "../../../components";
import { Link } from "react-router-dom";

export const CretaceousInferior = () => {
  return (
      <div>
        <Nav />
        <div className={styles.triassicInferiorBg}>
          <div className={styles.plant1}></div>
          <div className={styles.plant2}></div>
          <div className={styles.plant3}></div>
          <div className={styles.bgEra}>
            <div className={styles.arrowPrevious}>
              <Link to="/map">.</Link>
            </div>

            <div className={`${styles.nameFrame} ${styles.nameFrame1}`}>Pachycephalosaurus</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame2}`}>Microceratus</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame3}`}>Gallimimus</div>

            <div className={styles.geneticBg1}>
              <div className={styles.dinosaur1}></div>
            </div>
            <div className={styles.geneticBg2}>
              <div className={styles.dinosaur2}></div>
            </div>
            <div className={styles.geneticBg3}>
              <div className={styles.dinosaur3}></div>
            </div>

            <div className={styles.arrowNext}>
              <Link to="/triassic-medio">.</Link>
            </div>
          </div>
        </div>
      </div>
  );
};
