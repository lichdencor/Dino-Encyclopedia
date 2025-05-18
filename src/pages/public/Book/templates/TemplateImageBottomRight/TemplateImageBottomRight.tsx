import { useEffect, useRef } from "react";
import styles from "./TemplateImageBottomRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageRightBottomProps = {
    upperText: string;
    imageBottomRightSrc: string;
    lowerText: string;
}

export const TemplateImageBottomRight = ({ upperText, imageBottomRightSrc, lowerText} : TemplateImageRightBottomProps) => {
    return (
        <div className={bookStyles.page}>
            <p className={styles.subtitle}>BEHAVIOUR</p>
            <div className={`${styles.text} ${styles['text-upper']}`}>{upperText}</div>
            <img src={imageBottomRightSrc} alt="" className={styles["image-bottom-right"]}/>
            <div className={`${styles.text} ${styles['text-lower']}`}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageBottomRight;
