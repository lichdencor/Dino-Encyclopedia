import styles from "./TemplateImage.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImage = {
    image: string;
    className: string;
}

export const TemplateImageTopRight = ({ className, image }: TemplateImage) => {
    return (
      <div className={`${bookStyles.page} ${styles.kidsPage} ${styles[className]}`}>
            <div className={styles["page-content"]}>
                <img src={image} alt="" className={styles["image"]} />
                <p className={styles["page-number"]}>n</p>
            </div>
        </div>
    );
};

export default TemplateImageTopRight;
