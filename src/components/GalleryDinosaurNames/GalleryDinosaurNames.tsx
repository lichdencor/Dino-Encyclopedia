import React from 'react'
import styles from "./GalleryDinosaurNames.module.css";

type GalleryDinosaurNames = {
    dinosaurs: Dinosaur[];
}

export const GalleryDinosaurNames = ({ dinosaurs }: GalleryDinosaurNames) => {
    return (
        <div>
            {dinosaurs.map((dinosaur, index) => (
                <div className={`${styles.dinosaurData} ${styles[`dinosaurData${index + 1}`]}`}>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBarContainer}>
                            <span className={styles.progressText}>62%</span>
                            <div className={styles.progressBar}></div>
                        </div>
                        <div className={styles.puzzlePieceContainer}>
                            <div className={styles.puzzlePiece}></div>
                        </div>
                    </div>

                    <div className={`${styles.nameFrame} ${styles[`nameFrame${index + 1}`]}`}>
                        {dinosaur}
                    </div>
                </div>
            ))}
        </div>
    )
}
