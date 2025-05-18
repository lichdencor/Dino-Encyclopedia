import styles from "./TemplateImageBottomLeftAndTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageBottomLeftAndTopRightProps = {
    upperText: string;
    imageBottomLeftSrc: string;
    imageTopRightSrc: string;
    lowerText: string;
}

export const TemplateImageBottomLeftAndTopRight = ({upperText, imageBottomLeftSrc, imageTopRightSrc, lowerText} : TemplateImageBottomLeftAndTopRightProps) => {
    return (
        <div className={bookStyles.page}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageBottomLeftSrc} alt="" className={styles["image-bottom-left"]}/>
            <div className={styles.lowerText}>{lowerText}</div>
            <img src={imageTopRightSrc} alt="" className={styles["image-top-right"]}/>
        </div>
    );
};

export default TemplateImageBottomLeftAndTopRight;
