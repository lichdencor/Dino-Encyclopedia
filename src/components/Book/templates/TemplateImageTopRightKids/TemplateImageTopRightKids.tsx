import styles from "./TemplateImageTopRightKids.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageTopRightProps = {
    imageTopRightKidsSrc: string;
    upperText: string;
    lowerText: string;
}

export const TemplateImageTopRight = ({imageTopRightKidsSrc, upperText, lowerText} : TemplateImageTopRightProps) => {
    return (
        <div className={bookStyles.page}>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <img src={imageTopRightKidsSrc} alt="" className={styles["image-top-right"]}/>
             <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
            <p className={styles["page-number"]}>n</p>
        </div>
    );
};

export default TemplateImageTopRight;
           