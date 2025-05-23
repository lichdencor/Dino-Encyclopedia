import styles from "./TemplateImage.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImage = {
    image: string;
    className: string;
    index: number;
}

export const TemplateImage = ({ className, image, index }: TemplateImage) => {
    const isPagePar = (index + 1) % 2 === 0;
    return (
      <div className={`${bookStyles.page} ${styles.kidsPage} ${styles[className]}`}>
            <div className={styles["page-content"]}>
                <img src={image} alt="" className={styles["image"]} />
            </div>
            <p className={`${styles["page-number"]} ${isPagePar ? styles["page-number-par"] : styles["page-number-impar"]}` }>{index + 1}</p>
        </div>
    );
};

export default TemplateImage;
