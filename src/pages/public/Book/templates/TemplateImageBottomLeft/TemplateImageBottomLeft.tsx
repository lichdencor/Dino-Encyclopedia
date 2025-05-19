import styles from "./TemplateImageBottomLeft.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageBottomLeftProps = {
    imageBottomLeftSrc: string;
    upperText: string;
    lowerText: string;
}

export const TemplateImageBottomLeft = ({imageBottomLeftSrc, upperText, lowerText} : TemplateImageBottomLeftProps) => {
    return (
        <div className={bookStyles.page}>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <img src={imageBottomLeftSrc} alt="" className={styles["image-left"]} />
             <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
            <p className={styles["page-number"]}>n</p>
        </div>
    );
};

export default TemplateImageBottomLeft;
           