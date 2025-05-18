import { useEffect, useRef } from "react";
import styles from "./TemplateImageLeft.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageLeftDownProps = {
    title: string;
    subtitle: string;
    imageLeftSrc: string;
    text: string;
}


export const TemplateImageLeft = ({ imageLeftSrc, title, subtitle, text }: TemplateImageLeftDownProps) => {
    return (
        <div className={bookStyles.page}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>
            <img src={imageLeftSrc} alt="" className={styles["image-left"]} />
            <div className={styles.text}>{text}</div>
        </div>
    );
};

export default TemplateImageLeft;
