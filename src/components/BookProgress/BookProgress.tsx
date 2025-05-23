import styles from "./BookProgress.module.css";
import React, { useRef, useEffect, useState } from "react";

type BookProgressProps = {
  pages: number;
  progress: number;
};

export const BookProgress: React.FC<BookProgressProps> = ({ pages, progress }) => {
  const totalPaws = pages + 1;
  const pawRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [petLeft, setPetLeft] = useState<string>("0px");

  useEffect(() => {
    //Cuando se dibuja la pantalla toma los valores de paw y del dino
    const paw = pawRefs.current[progress];
    const container = containerRef.current;
    if (paw && container) {
      const pawRect = paw.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const pawCenter = pawRect.left + pawRect.width / 2;
      const left = pawCenter - containerRect.left;
      setPetLeft(`${left}px`);
    }
  }, [progress, pages]);

  return (
    <div className={styles["container-book-progress"]}>
      <div className={styles["container-line-progress"]} ref={containerRef}>
        <div
          className={styles["container-pet"]}
          style={{ 
            left: petLeft,
            transform: "translateX(-50%)"
          }}
        >
          <img
            src="/public/assets/img/evolutions/profile/profile-t-rex-1-flipped.png"
            alt="pet" 
            className={styles["img-pet"]}
          />
        </div>

        <div className={styles["line-progress"]}></div>

        {[...Array(totalPaws)].map((_, index) => (
          <img
            key={index}
            ref={el => pawRefs.current[index] = el}
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