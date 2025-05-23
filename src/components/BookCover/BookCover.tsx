import { BookProgressBar } from "../BookProgressBar/BookProgressBar";
import styles from "./BookCover.module.css";

interface BookCoverProps {
    image: string;
    title: string;
    backImage: string;
    backText?: string;
}

export const BookCover = ({ image, title, backImage, backText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }: BookCoverProps) => {
    return (
        <div className={styles["container-book"]}>
            <h1 id="title" className={styles.title}>{title}</h1>
            
            <div className={styles["flip-card"]}>
                <div className={styles["book-front"]}>
                    <img src={image} alt="front cover" />
                </div>
                <div className={styles["book-back"]}>
                    <img src={backImage} alt="back cover" />
                    <div className={styles["back-content"]}>
                        <p className={styles["back-text"]}>{backText}</p>
                    </div>
                </div>
            </div>
            <div className={styles["container-progress"]}>
                <BookProgressBar src="/public/assets/img/achievements/icons/achievement-book-icon.png"></BookProgressBar>
            </div>
        </div>
    )
}