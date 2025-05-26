import React, { useState, CSSProperties } from 'react';
import styles from './Carousel.module.css';
import { useNavigate } from 'react-router-dom';

interface CarouselProps {
  children: React.ReactNode;
  links: string[];
  accessText: string;
  width: number;            // en vw
  height: number;           // en vh
  itemWidth: number;        // en %
  itemHeight: number;       // en %
  transformMain: string;    // ej. "translate(-50%, -37%) scale(1)"
  transformLeft: string;    // ej. "translate(-163%, -36%) scale(0.9)"
  transformRight: string;   // ej. "translate(68%, -37%) scale(0.9)"
  arrowOffset: number;      // en %
  visitBtnBottom: number;   // en %, puede ser negativo
  needHoverAnimation: boolean;
}

export function Carousel({
  children,
  links,
  accessText,
  width,
  height,
  itemWidth,
  itemHeight,
  transformMain,
  transformLeft,
  transformRight,
  arrowOffset,
  visitBtnBottom,
  needHoverAnimation = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();
  const TOTAL_CARDS = React.Children.count(children);

  const containerStyle: CSSProperties = {
    width: `${width}vw`,
    height: `${height}vh`
  };
  const arrowLeftStyle: CSSProperties = {
    left: `${arrowOffset}%`
  };
  const arrowRightStyle: CSSProperties = {
    right: `${arrowOffset}%`
  };

  const getItemStyle = (idx: number): CSSProperties => {
    let transform: string;
    if (idx === currentIndex) transform = transformMain;
    else if (idx === (currentIndex - 1 + TOTAL_CARDS) % TOTAL_CARDS)
      transform = transformLeft;
    else if (idx === (currentIndex + 1) % TOTAL_CARDS)
      transform = transformRight;
    else transform = '';

    return {
      width: `${itemWidth}%`,
      height: `${itemHeight}%`,
      transform
    };
  };

  const getClass = (idx: number) => {
    if (idx === currentIndex) return `${styles['carousel__item']} ${styles['carousel__item--main']} ${!needHoverAnimation ? styles['carousel__item--disabled'] : ''}`;
    if (idx === (currentIndex - 1 + TOTAL_CARDS) % TOTAL_CARDS) return `${styles['carousel__item']} ${styles['carousel__item--left']} ${!needHoverAnimation ? styles['carousel__item--disabled'] : ''}`;
    if (idx === (currentIndex + 1) % TOTAL_CARDS) return `${styles['carousel__item']} ${styles['carousel__item--right']} ${!needHoverAnimation ? styles['carousel__item--disabled'] : ''}`;
    return `${styles['carousel__item']} ${styles['carousel__item--hidden']} ${!needHoverAnimation ? styles['carousel__item--disabled'] : ''}`;
  };

  return (
    <div
      id="carousel-container"
      className={styles['carousel__container']}
      style={containerStyle}
    >
      <div className={styles['carousel__container--left']}>
        <button
          className={`${styles['carousel__btn']} ${styles['carousel__arrow--left']}`}
          style={arrowLeftStyle}
          onClick={() => setCurrentIndex(prev => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS)}
        />
      </div>
      <div className={styles['carousel']}>
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={getClass(index)}
            style={getItemStyle(index)}
          >
            {child}
            <button
              className={styles['carousel__visit-btn']}
              style={{ bottom: `${visitBtnBottom}%` }}
              onClick={() => navigate(links[index])}
            >
              {accessText}
            </button>
          </div>
        ))}
      </div>

      <div className={styles['carousel__container--right']}>
        <button
          className={`${styles['carousel__btn']} ${styles['carousel__arrow--right']}`}
          style={arrowRightStyle}
          onClick={() => setCurrentIndex(prev => (prev + 1) % TOTAL_CARDS)}
        />
      </div>
    </div>
  );
}
