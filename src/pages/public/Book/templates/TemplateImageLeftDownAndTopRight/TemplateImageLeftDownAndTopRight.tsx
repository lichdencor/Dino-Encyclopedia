import { useEffect, useRef } from "react";
import styles from "./TemplateImageLeftDownAndTopRight.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageLeftDownAndTopRightProps = {
    upperText: string;
    imageLeftDownSrc: string;
    imageRightUpSrc: string;
    lowerText: string;
}


export const TemplateImageLeftDownAndTopRight = ({upperText, imageLeftDownSrc, imageRightUpSrc, lowerText} : TemplateImageLeftDownAndTopRightProps) => {
    return (
        <div className={`${styles.templateImageLeftDownAndTopRight} ${bookStyles.page}`}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageLeftDownSrc} alt="" className={styles.imageLeftDown}/>
            <div className={styles.lowerText}>{lowerText}</div>
            <img src={imageRightUpSrc} alt="" className={styles.imageLeftDown}/>
        </div>
    );
};

export default TemplateImageLeftDownAndTopRight;
