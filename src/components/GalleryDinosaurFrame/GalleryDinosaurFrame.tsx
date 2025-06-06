import styles from "./GalleryDinosaurFrame.module.css";
import { useProgress } from "../../context/Progress/ProgressProvider";
import { DinosaurProgress } from "../XRay/types";
import { ProgressBar } from "../ProgressBar/ProgressBar";

type GalleryDinosaurNamesProps = {
    dinosaurs: string[];
    era: "triassic" | "jurassic" | "cretaceous";
    period: "Inferior" | "Medium" | "Superior";
}

export const GalleryDinosaurFrame = ({ dinosaurs, era, period }: GalleryDinosaurNamesProps) => {
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
                <div key={index} className={`${styles['dinosaur-data']} ${styles[`dinosaur-data-${index + 1}`]}`}>
                    <div className={styles['progress-container']}>
                        <ProgressBar 
                            progress={getDinosaurProgress(index)}
                            customStyles={{
                                barContainer: `${styles['progress-bar-container']} ${
                                    era === 'triassic'
                                        ? styles['progress-bar-container-triassic']
                                        : era === 'jurassic'
                                            ? styles['progress-bar-container-jurassic']
                                            : styles['progress-bar-container-cretaceous']
                                }`,
                                text: styles['progress-text'],
                                bar: styles['progress-bar'],
                                imgContainer: `${styles['puzzle-piece-container']} ${
                                    era === 'triassic'
                                        ? styles['puzzle-piece-container-triassic']
                                        : era === 'jurassic'
                                            ? styles['puzzle-piece-container-jurassic']
                                            : styles['puzzle-piece-container-cretaceous']
                                }`,
                                img: `${styles['puzzle-piece']} ${isPuzzlePieceFound(index) ? styles.found : ''}`
                            }}
                            imgSrc="/assets/img/puzzles/puzzle-piece.png"
                        />
                    </div>
                    <div className={styles['name-frame']}>
                        {dinosaur}
                    </div>
                </div>
            ))}
        </div>
    )
}
