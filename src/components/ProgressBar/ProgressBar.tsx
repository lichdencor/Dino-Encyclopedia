import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
    achievementSrc: string;
}

export const ProgressBar = ({ achievementSrc }: ProgressBarProps) => {
    return (
        <div className={styles["progress-container"]}>
            <div className={styles["progress-bar-container"]}>
                <span className={styles["progress-text"]}>n%</span>
                <div
                    className={styles["progress-bar"]}
                // style={{ width: `${getDinosaurProgress(index)}%` }}
                >
                </div>
                <div className={styles["achievement-img-container"]}>
                    <img src={achievementSrc} alt="" className="achievement-img" />
                </div>
            </div>
        </div>
    )
}
