import styles from "./TemplateText.module.css";
import bookStyles from "../../Book.module.css";

type TemplateText = {
    title: string;
    text: string;
    className: string;
}

export const TemplateText = ({ className, title, text }: TemplateText) => {

    console.log(className, 'from template text');

    return (
        <div className={`${bookStyles.page} ${styles[className]}`}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
            </div>
            <div className={styles.text}>{text}</div>
            <p className={styles["page-number"]}>n</p>
        </div>
    );
};

export default TemplateText;
