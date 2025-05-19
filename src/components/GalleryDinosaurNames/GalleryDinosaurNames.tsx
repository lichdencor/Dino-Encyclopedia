import styles from "./GalleryDinosaurNames.module.css";
import { DinosaurModel } from "../../models/PeriodModel";

type GalleryDinosaurNamesProps = {
    dinosaurs: DinosaurModel[];
    era: "triassic" | "jurassic" | "cretaceous";
    period: "Inferior" | "Medium" | "Superior";
}

export const GalleryDinosaurNames = ({ dinosaurs, era, period }: GalleryDinosaurNamesProps) => {
    return (
        <div>
            {dinosaurs.map((dinosaur, index) => (
                <div key={index} className={`${styles.dinosaurData} ${styles[`dinosaurData${index + 1}`]}`}>
                    <div className={styles.progressContainer}>
                        <div className={`${styles.progressBarContainer} ${
                            era === 'triassic'
                                ? styles['progressBarContainer-triassic']
                                : era === 'jurassic'
                                    ? styles['progressBarContainer-jurassic']
                                    : styles['progressBarContainer-cretaceous']
                        }`}>
                            <span className={styles.progressText}>{Math.round(dinosaur.progress)}%</span>
                            <div 
                                className={styles.progressBar}
                                style={{ width: `${dinosaur.progress}%` }}
                            ></div>
                        </div>
                        <div className={`${styles.puzzlePieceContainer} ${
                            era === 'triassic'
                                ? styles['puzzlePieceContainer-triassic']
                                : era === 'jurassic'
                                    ? styles['puzzlePieceContainer-jurassic']
                                    : styles['puzzlePieceContainer-cretaceous']
                        }`}>
                            <div className={`${styles.puzzlePiece} ${dinosaur.puzzlePieceDiscovered ? styles.found : ''}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.nameFrame} ${styles[`nameFrame${index + 1}`]}`}>
                        {dinosaur.info.name}
                    </div>
                </div>
            ))}
        </div>
    )
}
