import styles from './GalleryTitle.module.css';

type GalleryTitleProps = {
    period: string;
    subperiod: string;
}

export default function GalleryTitle({period, subperiod}:GalleryTitleProps) {
  return (
    <div className={styles["container-titles"]}>
        <span className={styles["title-period"]}>{period}</span>
        <span className={styles["title-subperiod"]}>-{subperiod}-</span>
    </div>
  )
}
