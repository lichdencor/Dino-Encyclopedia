import styles from "./TemplateImageTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageRightBottomProps = {
    upperText: string;
    imageTopRightSrc: string;
    lowerText: string;
}

export const TemplateImageBottomRight = ({ upperText, imageTopRightSrc, lowerText} : TemplateImageRightBottomProps) => {
    return (
        <div className={bookStyles.page}>
            <p className={styles.subtitle}>BEHAVIOUR</p>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <div className={styles["container-image"]}>
                <img src="/public/assets/img/books/frame-book.png" alt="frame" className={styles["image-frame"]} />
                <img src={imageTopRightSrc} alt="" className={styles["image-right"]} />
            </div>
            <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageBottomRight;
