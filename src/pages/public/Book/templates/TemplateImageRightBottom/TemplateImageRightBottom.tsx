import { useEffect, useRef } from "react";
import styles from "./TemplateImageRightBottom.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageRightBottomProps = {
    upperText: string;
    imageRightBottomSrc: string;
    lowerText: string;
}

export const TemplateImageRightBottom = ({upperText, imageRightBottomSrc, lowerText} : TemplateImageRightBottomProps) => {
    return (
        <div className={`${styles.templateImageRightTop} ${bookStyles.page}`}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageRightBottomSrc} alt="" className={styles.imageRightTop}/>
            <div className={styles.lowerText}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageRightBottom;
