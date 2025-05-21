import React, { useState } from 'react';
import styles from './Carousel.module.css';
import { useNavigate } from 'react-router-dom';

const TOTAL_CARDS = 6;

interface CarouselProps {
  children: React.ReactNode;
  links: [string];
  accessText: string;
}

export function Carousel({ children, accessText, links }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();

  const getClass = (index: number) => {
    if (index === currentIndex) {
      return `${styles["carousel__item"]} ${styles["carousel__item--main"]}`;
    }
    if (index === (currentIndex - 1 + TOTAL_CARDS) % TOTAL_CARDS) {
      return `${styles["carousel__item"]} ${styles["carousel__item--left"]}`;
    }
    if (index === (currentIndex + 1) % TOTAL_CARDS) {
      return `${styles["carousel__item"]} ${styles["carousel__item--right"]}`;
    }
    return `${styles["carousel__item"]} ${styles["carousel__item--hidden"]}`;
  };

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  };

  const handleRight = () => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
  };

  const navigatePage = (route: string) => {
    navigate(route);
  };

  return (
    <div id="carousel-container" className={styles["carousel__container"]}>
      <div className={styles["carousel__container--left"]}>
        <button
          className={`${styles["carousel__btn"]} ${styles["carousel__arrow--left"]}`}
          onClick={handleLeft}
        >
        </button>
      </div>
      {/* CAROUSEL ITEM */}



      <div className={styles["carousel"]}>
        {React.Children.map(children,(child,index)=> {

          console.log(child);

          return(
          <div className={`${getClass(index)} ${styles["carousel__item"]}`}>
            {child}
            <button
            className={styles["carousel__visit-btn"]}
            onClick={() => navigatePage(links[index])}
          >
          </button>
          </div> )
          }
        )}
      </div>
      <div className={styles["carousel__container--right"]}>
        <button
          className={`${styles["carousel__btn"]} ${styles["carousel__arrow--right"]}`}
          onClick={handleRight}
        >
        </button>
      </div>
    </div>

  )
}

