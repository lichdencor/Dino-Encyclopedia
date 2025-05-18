import styles from "./TemplateImageBottomLeftAndTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageBottomLeftAndTopRightProps = {
    subtitle: string;
    imageBottomLeftSrc: string;
    imageTopRightSrc: string;
    upperText: string;
    lowerText: string;
}

export const TemplateImageBottomLeftAndTopRight = ({ subtitle, upperText, imageBottomLeftSrc, imageTopRightSrc, lowerText }: TemplateImageBottomLeftAndTopRightProps) => {
    return (
        <div className={bookStyles.page}>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.text}>{upperText}</div>
            <img src={imageBottomLeftSrc} alt="" className={styles["image-bottom-left"]} />
            <div className={styles.text}>{lowerText}</div>
            <img src={imageTopRightSrc} alt="" className={styles["image-top-right"]} />
        </div>
    );
};

export default TemplateImageBottomLeftAndTopRight;
