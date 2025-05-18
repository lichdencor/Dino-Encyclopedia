import React, { useEffect, useRef } from 'react';
import styles from './TransitionScreen.module.css';

interface TransitionScreenProps {
  eraName: string;
  onTransitionEnd: () => void;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({ eraName, onTransitionEnd }) => {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = screenRef.current;
    if (!element) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName.includes('transitionFadeOut')) {
        onTransitionEnd();
      }
    };

    element.addEventListener('animationend', handleAnimationEnd as EventListener);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd as EventListener);
    };
  }, [onTransitionEnd]);

  return (
    <div ref={screenRef} className={styles["screen-transition"]}>
      <div className={styles["container-title"]}>
        <h1 className={styles["title-era"]}>{eraName}</h1>
      </div>
    </div>
  );
}; 