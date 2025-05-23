import styles from "./BookProgress.module.css";

type BookProgressProps = {
  pages: number;
  progress: number;
};

export const BookProgress: React.FC<BookProgressProps> = ({ pages, progress }) => {
  const petLeftPercentage = pages > 1 ? (progress / (pages - 1)) * 100 : 0;

  console.log(progress, 'progress')

  return (
    <div className={styles["container-book-progress"]}>

      <div className={styles["container-line-progress"]}>
        <div
          className={styles["container-pet"]}
          style={{ left: `${petLeftPercentage}%`, transform: "translateX(-50%)" }}
        >
          <img
            src="/public/assets/img/evolutions/profile/profile-t-rex-1-flipped.png"
            alt="pet" className={styles["img-pet"]}
          />
        </div>

        <div className={styles["line-progress"]}></div>

        {[...Array(pages + 1)].map((_, index) => (
          <img
            key={index}
            src={
              index < progress
                ? "/public/assets/img/paws/level-paw-complete.png"
                : "/public/assets/img/paws/level-paw-incomplete.png"
            }
            alt={`progress paw ${index + 1}`}
            className={styles["img-paw"]}
          />
        ))}
      </div>
    </div>
  );
};

export default BookProgress;

{/* <div className="profile">
          <div onClick={accederAPerfil} className="profilePageLink"></div>
          <div className="pet-profile-img"></div>
        </div> */}