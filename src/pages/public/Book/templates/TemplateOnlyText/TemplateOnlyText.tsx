import { useEffect, useRef } from "react";
import styles from "./TemplateOnlyText.module.css";
import bookStyles from "../../Book.module.css";

type TemplateOnlyTextProps = {
    text: string;
}


export const TemplateOnlyText = ({text} : TemplateOnlyTextProps) => {
    return (
        <div className={`${styles.templateOnlyTextContainer} ${bookStyles.page}`}>
            <div className={styles.upperText}>{text}</div>
        </div>
    );
};

export default TemplateOnlyText;
