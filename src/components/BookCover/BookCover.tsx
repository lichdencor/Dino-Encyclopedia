import styles from "./BookCover.module.css";

interface BookCoverProps {
    image: string;
    title: string;
}

export const BookCover = ({ image, title }: BookCoverProps) => {
    return (
        <div className={styles["container-book"]}>

            <h1 id="title" className={styles.title}>{title}</h1>
            <img src={image} alt="book cover" className={styles.book} />
            <div className={styles["container-progress"]}>
                <div className={styles["progress-bar"]}></div>
            </div>
        </div>
    )
}