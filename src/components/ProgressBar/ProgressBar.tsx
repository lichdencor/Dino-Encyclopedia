import styles from "./ProgressBar.module.css";

interface CustomStyles {
    container?: string;
    barContainer?: string;
    text?: string;
    bar?: string;
    imgContainer?: string;
    img?: string;
}

interface ProgressBarProps {
    imgSrc?: string;
    customStyles?: CustomStyles;
    progress: number;
}

export const ProgressBar = ({ imgSrc, customStyles = {}, progress }: ProgressBarProps) => {
    const containerClass = customStyles.container || styles["progress-container"];
    const barContainerClass = customStyles.barContainer || styles["progress-bar-container"];
    const textClass = customStyles.text || styles["progress-text"];
    const barClass = customStyles.bar || styles["progress-bar"];
    const imgContainerClass = customStyles.imgContainer || styles["achievement-img-container"];
    const imgClass = customStyles.img || styles["achievement-img"];

    return (
        <div className={containerClass}>
            <div className={barContainerClass}>
                <span className={textClass}>{progress}%</span>
                <div className={barClass} style={{ width: `${progress}%` }}>
                </div>
                <div className={imgContainerClass}>
                    <img src={imgSrc} alt="" className={imgClass} />
                </div>
            </div>
        </div>
    )
}
