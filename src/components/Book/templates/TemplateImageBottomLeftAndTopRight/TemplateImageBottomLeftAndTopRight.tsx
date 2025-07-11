import styles from "./TemplateImageBottomLeftAndTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageBottomLeftAndTopRightProps = {
    foodName: string;
    imageBottomLeftSrc: string;
    imageTopRightSrc: string;
    upperText: string;
    lowerText: string;
    className: string;
}

export const TemplateImageBottomLeftAndTopRight = ({ className, upperText, imageBottomLeftSrc, foodName, imageTopRightSrc, lowerText }: TemplateImageBottomLeftAndTopRightProps) => {
    return (
        <div className={`${bookStyles.page} ${styles[className]}`}>
        <p className={styles.subtitle}>FEEDING</p>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <div className={styles["container-image-bottom-left"]}>
                <img src="/assets/img/books/frame-book-small.png" alt="frame" className={styles["image-frame"]} />
                <img src={imageBottomLeftSrc} alt="" className={styles["image-bottom-left"]} />
            </div>
            
            <div className={styles["container-food"]}><p>{foodName}</p></div>
            <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>

            <div className={styles["container-image-top-right"]}>
                <img src="/assets/img/books/frame-book.png" alt="frame" className={styles["image-frame"]} />
                <img src={imageTopRightSrc} alt="" className={styles["image-top-right"]} />
            </div>
            
        </div>
    );
};

export default TemplateImageBottomLeftAndTopRight;
