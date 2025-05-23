import styles from "./TemplateText.module.css";
import bookStyles from "../../Book.module.css";

type TemplateText = {
    title: string;
    text: string;
    className: string;
    index: number;
}

export const TemplateText = ({ className, title, text, index }: TemplateText) => {

    const isPagePar = (index + 1) % 2 === 0;

    return (
        <div className={`${bookStyles.page} ${styles[className]}`}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.text}>{text}</div>
            <p className={`${styles["page-number"]} ${isPagePar ? styles["page-number-par"] : styles["page-number-impar"]}`}>{index + 1}</p>
        </div>
    );
};

export default TemplateText;
