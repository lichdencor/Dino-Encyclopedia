import styles from "./TemplateText.module.css";
import bookStyles from "../../Book.module.css";

type TemplateText = {
    title: string;
    text: string;
}

export const TemplateText = ({ title, text }: TemplateText) => {
    return (
        <div className={bookStyles.page}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.text}>{text}</div>
            <p className={styles["page-number"]}>n</p>
        </div>
    );
};

export default TemplateText;
