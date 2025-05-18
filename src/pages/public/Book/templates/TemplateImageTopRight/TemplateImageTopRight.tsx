import { useEffect, useRef } from "react";
import styles from "./TemplateImageTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageTopRightProps = {
    upperText: string;
    imageRightUpSrc: string;
    lowerText: string;
}


export const TemplateImageTopRight = ({upperText, imageRightUpSrc, lowerText} : TemplateImageTopRightProps) => {
    return (
        <div className={`${styles.templateImageTopRight} ${bookStyles.page}`}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageRightUpSrc} alt="" className={styles.imageTopRight}/>
            <div className={styles.lowerText}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageTopRight;
