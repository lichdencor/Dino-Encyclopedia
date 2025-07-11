import React, { useEffect, useState } from 'react';
import styles from './IntroSequence.module.css';

const introImages = [
  "/assets/img/dinosaurs/skeleton/skeleton-cr-3-Tyrannosaurus.png",  // El rey - T-Rex
  "/assets/img/dinosaurs/skeleton/skeleton-ju-3-Stegosaurus.png",    // Herbívoro icónico
  "/assets/img/dinosaurs/skeleton/skeleton-cr-2-Spinosaurus.png",    // Depredador acuático
  "/assets/img/dinosaurs/skeleton/skeleton-ju-3-Brachiosaurus.png",  // Gigante de cuello largo
  "/assets/img/dinosaurs/skeleton/skeleton-ju-2-Allosaurus.png",     // Depredador jurásico
  "/assets/img/dinosaurs/skeleton/skeleton-cr-3-Triceratops.png",    // Herbívoro con cuernos
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