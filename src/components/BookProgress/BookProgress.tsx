import styles from "./BookProgress.module.css";
import React, { useRef, useEffect, useState } from "react";

type BookProgressProps = {
  pages: number;
  progress: number;
  currentIndex: number;
};

export const BookProgress: React.FC<BookProgressProps> = ({ pages, progress, currentIndex }) => {
  const totalPaws = pages + 1;
  const pawRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [petLeft, setPetLeft] = useState<string>("0px");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePetPosition = (index: number) => {
      const paw = pawRefs.current[index];
      if (paw) {
        const pawRect = paw.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const pawCenter = pawRect.left + pawRect.width / 2;
        const left = pawCenter - containerRect.left;
        setPetLeft(`${left}px`);
      }
    };

    updatePetPosition(currentIndex);
  }, [currentIndex, pages]);

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