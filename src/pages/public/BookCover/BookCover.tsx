import styles from "./BookCover.module.css"; 

export const BookCover = () => {
  return (
    <div className={styles["container-library"]}>
                    {/* BOOK 1 */}
                    <div className={styles["container-book"]}>
                        <h1 className={styles["title"]}>TITLE</h1>
                        <p className={styles["summary"]}>Lorem ipsum factum bla bla bla. Lorem ipsum factum bla bla bla. Lorem ipsum factum bla bla bla. Lorem ipsum factum bla bla bla. Lorem ipsum factum bla bla bla. Lorem ipsum factum.</p>
                        <div className={styles["book"]}></div>
                        <div className={styles["container-progress"]}>
                            <div className={styles["progress-bar"]}></div>
                        </div>
                    </div>
                </div>
  )
}
