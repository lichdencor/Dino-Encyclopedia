import styles from "./Triassic-Superior.module.css";
import { Nav } from "../../../components";
import { Link } from "react-router-dom";

export const TriassicSuperior = () => {
  return (
      <div>
        <Nav />
        <div className={styles.triassicInferiorBg}>
          <div className={styles.plant1}></div>
          <div className={styles.plant2}></div>
          <div className={styles.plant3}></div>
          <div className={styles.bgEra}>
            <Link to="/triassic-medio" className={styles.arrowPrevious}>.</Link>

            <div className={`${styles.nameFrame} ${styles.nameFrame1}`}>Shuvosaurus</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame2}`}>Chindesaurus</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame3}`}>Fukuiraptor</div>

            <div className={styles.geneticBg1}>
              <div className={styles.dinosaur1}></div>
            </div>
            <div className={styles.geneticBg2}>
              <div className={styles.dinosaur2}></div>
            </div>
            <div className={styles.geneticBg3}>
              <div className={styles.dinosaur3}></div>
            </div>

            <Link to="/jurassic-inferior" className={styles.arrowNext}>.</Link>
          </div>
        </div>
      </div>
  );
};
