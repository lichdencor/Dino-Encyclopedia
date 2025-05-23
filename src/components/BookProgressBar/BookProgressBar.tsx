import styles from "./BookProgressBar.module.css";

interface BookProgressBarProps {
    src: string;
}

export const BookProgressBar = ({ src }: BookProgressBarProps) => {
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
                    <img src={src} alt="" className="achievement-img" />
                </div>
            </div>
        </div>
    )
}
