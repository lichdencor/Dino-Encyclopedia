import styles from "./ProgressBar.module.css";

interface CustomStyles {
    container?: string;
    barContainer?: string;
    text?: string;
    bar?: string;
    imgContainer?: string;
}

interface ProgressBarProps {
    imgSrc: string;
    customStyles?: CustomStyles;
}

export const ProgressBar = ({ imgSrc, customStyles = {} }: ProgressBarProps) => {
    const containerClass = customStyles.container || styles["progress-container"];
    const barContainerClass = customStyles.barContainer || styles["progress-bar-container"];
    const textClass = customStyles.text || styles["progress-text"];
    const barClass = customStyles.bar || styles["progress-bar"];
    const imgContainerClass = customStyles.imgContainer || styles["achievement-img-container"];

    return (
        <div className={containerClass}>
            <div className={barContainerClass}>
                <span className={textClass}>n%</span>
                <div className={barClass}
                // style={{ width: `${getDinosaurProgress(index)}%` }}
                >
                </div>
                <div className={imgContainerClass}>
                    <img src={imgSrc} alt="" className="achievement-img" />
                </div>
            </div>
        </div>
    )
}
