import styles from "./TemplateImageTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageRightBottomProps = {
    upperText: string;
    imageTopRightSrc: string;
    lowerText: string;
    className: string;
}

export const TemplateImageBottomRight = ({ className, upperText, imageTopRightSrc, lowerText} : TemplateImageRightBottomProps) => {

    console.log(className, 'from template image bottom right');

    return (
        <div className={`${bookStyles.page} ${styles[className]}`}>
            <p className={styles.subtitle}>BEHAVIOUR</p>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <div className={styles["container-image"]}>
                <img src="/assets/img/books/frame-book.png" alt="frame" className={styles["image-frame"]} />
                <img src={imageTopRightSrc} alt="" className={styles["image-right"]} />
            </div>
            <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageBottomRight;
