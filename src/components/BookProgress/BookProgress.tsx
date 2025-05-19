import React from 'react'
import styles from "./BookProgress.module.css";

export const BookProgress = () => {
  return (
    <div className={styles["container-book-progress"]}>
        <div className={styles["container-pet"]}>
            <img src="/public/assets/img/pets/t-rex/pet-t-rex-1.png" alt="pet" />
        </div>
        <div className={styles["container-line-progress"]}>
            <div className={styles["line-progress"]}></div>
            <img src="/public/assets/img/paws/level-paw-incomplete.png" alt="progress paw" />
            <img src="/public/assets/img/paws/level-paw-incomplete.png" alt="progress paw" />
            <img src="/public/assets/img/paws/level-paw-incomplete.png" alt="progress paw" />
            <img src="/public/assets/img/paws/level-paw-incomplete.png" alt="progress paw" />
            <img src="/public/assets/img/paws/level-paw-incomplete.png" alt="progress paw" />
        </div>
    </div>
  )
}

export default BookProgress;