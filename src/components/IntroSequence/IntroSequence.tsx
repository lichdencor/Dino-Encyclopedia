import React, { useEffect, useState } from 'react';
import styles from './IntroSequence.module.css';

const introImages = [
  '/public/assets/img/intro/intro_01.jpg',
  '/public/assets/img/intro/intro_02.jpg',
  '/public/assets/img/intro/intro_03.jpg',
  '/public/assets/img/intro/intro_04.jpg',
  '/public/assets/img/intro/intro_05.jpg',
  '/public/assets/img/intro/intro_06.jpg',
];

export const IntroSequence: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const transitionTime = 6000; // 6 segundos por imagen
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % introImages.length);
        setIsTransitioning(false);
      }, 1000); // 1 segundo para el fade out/in
    }, transitionTime);

    return () => clearInterval(timer);
  }, [nextImageIndex]);

  return (
    <div className={styles.introSequence}>
      <div 
        className={`${styles.imageContainer} ${isTransitioning ? styles.fadeOut : ''}`}
        style={{
          backgroundImage: `url(${introImages[currentImageIndex]})`,
        }}
      />
      <div 
        className={`${styles.imageContainer} ${styles.nextImage} ${isTransitioning ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: `url(${introImages[nextImageIndex]})`,
        }}
      />
    </div>
  );
};

export default IntroSequence; 