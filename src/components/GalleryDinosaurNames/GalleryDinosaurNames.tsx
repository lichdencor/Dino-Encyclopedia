import React from 'react'
import styles from "./GalleryDinosaurNames.module.css";
import { useProgress } from "../../context/Progress/ProgressProvider";
import { DinosaurProgress } from "../XRay/types";

type GalleryDinosaurNamesProps = {
    dinosaurs: string[];
    era: "triassic" | "jurassic" | "cretaceous";
    period: "Early" | "Medium" | "Superior" | "Late";
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

    return (
        <div>
            {dinosaurs.map((dinosaur, index) => (
                <div key={index} className={`${styles.dinosaurData} ${styles[`dinosaurData${index + 1}`]}`}>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBarContainer}>
                            <span className={styles.progressText}>{Math.round(getDinosaurProgress(index))}%</span>
                            <div 
                                className={styles.progressBar}
                                style={{ width: `${getDinosaurProgress(index)}%` }}
                            ></div>
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
