import styles from "./GalleryDinosaurNames.module.css";
import { useProgress } from "../../context/Progress/ProgressProvider";
import { DinosaurProgress } from "../XRay/types";

type GalleryDinosaurNamesProps = {
    dinosaurs: string[];
    era: "triassic" | "jurassic" | "cretaceous";
    period: "Inferior" | "Medium" | "Superior";
}

export const GalleryDinosaurNames = ({ dinosaurs, era, period }: GalleryDinosaurNamesProps) => {
    const { progress } = useProgress();

    const getDinosaurProgress = (index: number) => {
        const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
        const periodData = progress.galleries[0][eraKey].find(
            (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
        );
        
        if (periodData) {
            const dinosaur = periodData.dinosaurs[index] as DinosaurProgress;
            return dinosaur?.scanProgress || 0;
        }
        return 0;
    };

    const isPuzzlePieceFound = (index: number) => {
        const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
        const periodData = progress.galleries[0][eraKey].find(
            (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
        );
        
        if (periodData) {
            const dinosaur = periodData.dinosaurs[index] as DinosaurProgress;
            const foundPieces = progress.minigames.puzzleaurus.foundPieces || [];
            return foundPieces.some(
                piece => piece.era === era && 
                        piece.period === period && 
                        piece.dinosaurId === dinosaur.id
            );
        }
        return false;
    };

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
                            <span className={styles.progressText}>{Math.round(getDinosaurProgress(index))}%</span>
                            <div 
                                className={styles.progressBar}
                                style={{ width: `${getDinosaurProgress(index)}%` }}
                            ></div>
                        </div>
                        <div className={`${styles.progressBarContainer} ${
                  era === 'triassic'
                    ? styles['puzzlePieceContainer-triassic']
                    : era === 'jurassic'
                    ? styles['puzzlePieceContainer-jurassic']
                    : styles['puzzlePieceContainer-cretaceous']
                }`}>
                            <div className={`${styles.puzzlePiece} ${isPuzzlePieceFound(index) ? styles.found : ''}`}></div>
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
