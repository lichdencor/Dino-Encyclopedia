import { Nav } from "../../../components";
import { Link } from "react-router-dom";
import styles from "./Cretaceous-Superior.module.css";

export const CretaceousSuperior = () => {
  return (
      <div>
        <Nav />
        <div className={styles.triassicInferiorBg}>
          <div className={styles.plant1}></div>
          <div className={styles.plant2}></div>
          <div className={styles.plant3}></div>
          <div className={styles.bgEra}>
            <Link to="/cretaceous-medio" className={styles.arrowPrevious}>.</Link>

            <div className={`${styles.nameFrame} ${styles.nameFrame1}`}>Triceratops</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame2}`}>Ankylosaurus</div>
            <div className={`${styles.nameFrame} ${styles.nameFrame3}`}>Tyrannosaurus Rex</div>

            <div className={styles.dinosaurBg1}>
              <div className={styles.dinosaur1}></div>
            </div>
            <div className={styles.dinosaurBg2}>
              <div className={styles.dinosaur2}></div>
            </div>
            <div className={styles.dinosaurBg3}>
              <div className={styles.dinosaur3}></div>
            </div>

            <Link to="/map" className={styles.arrowNext}>.</Link>
          </div>
        </div>
      </div>
  );
};
