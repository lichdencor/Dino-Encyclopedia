import styles from "./TemplateImageLeft.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageLeftDownProps = {
    title: string;
    subtitle: string;
    imageLeftSrc: string;
    text: string;
    className: string;
}


export const TemplateImageLeft = ({ className, imageLeftSrc, title, subtitle, text }: TemplateImageLeftDownProps) => {
    return (
        <div className={`${bookStyles.page} ${styles[className]}`}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles["container-image"]}>
                <img src="/public/assets/img/books/frame-book.png" alt="frame" className={styles["image-frame"]} />
                <img src={imageLeftSrc} alt="dinosaur" className={styles["image-left"]} />
            </div>
            <div className={styles.text}>{text}</div>
        </div>
    );
};

export default TemplateImageLeft;
