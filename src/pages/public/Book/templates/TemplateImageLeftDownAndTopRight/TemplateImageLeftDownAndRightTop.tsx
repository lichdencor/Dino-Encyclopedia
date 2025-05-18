import styles from "./TemplateImageLeftDownAndRightTop.module.css";
import bookStyles from "../../Book.module.css";

type TemplateImageLeftDownAndTopRightProps = {
    upperText: string;
    imageLeftDownSrc: string;
    imageRightUpSrc: string;
    lowerText: string;
}


export const TemplateImageLeftDownAndTopRight = ({upperText, imageLeftDownSrc, imageRightUpSrc, lowerText} : TemplateImageLeftDownAndTopRightProps) => {
    return (
        <div className={bookStyles.page}>
            <div className={styles.upperText}>{upperText}</div>
            <img src={imageLeftDownSrc} alt="" className={styles.imageLeftDown}/>
            <div className={styles.lowerText}>{lowerText}</div>
            <img src={imageRightUpSrc} alt="" className={styles.imageRightTop}/>
        </div>
    );
};

export default TemplateImageLeftDownAndTopRight;
