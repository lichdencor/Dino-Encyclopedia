import { useEffect, useRef } from "react";
import styles from "./TemplateImageLeftDown.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageLeftDownProps = {
    upperText: string;
    imageLeftDownSrc: string;
    lowerText: string;
}


export const TemplateImageLeftDown = ({upperText, imageLeftDownSrc, lowerText} : TemplateImageLeftDownProps) => {
    return (
        <div className={`${styles.templateImageLeftDown} ${bookStyles.page}`}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageLeftDownSrc} alt="" className={styles.imageLeftDown}/>
            <div className={styles.lowerText}>{lowerText}</div>
        </div>
    );
};

export default TemplateImageLeftDown;
