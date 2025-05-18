import styles from "./TemplateImageTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageTopRightProps = {
    imageTopRightSrc: string;
    upperText: string;
    lowerText: string;
}

export const TemplateImageTopRight = ({imageTopRightSrc, upperText, lowerText} : TemplateImageTopRightProps) => {
    return (
        <div className={bookStyles.page}>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <img src={imageTopRightSrc} alt="" className={styles["image-right"]} />
             <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
            <p className={styles["page-number"]}>n</p>
        </div>
    );
};

export default TemplateImageTopRight;
           