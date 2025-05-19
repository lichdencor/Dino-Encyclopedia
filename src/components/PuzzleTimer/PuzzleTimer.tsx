import React, { useEffect, useState, useRef } from 'react';
import { usePuzzle } from '../../context/Puzzle/PuzzleContext';
import styles from './PuzzleTimer.module.css';

export const PuzzleTimer: React.FC = () => {
  const { isComplete } = usePuzzle();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (isComplete) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    startTimeRef.current = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - (startTimeRef.current || 0)) / 1000);
      const newTimeLeft = Math.max(0, 300 - elapsed); // 300 segundos = 5 minutos

      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        // Aquí podrías manejar el evento de tiempo agotado
      }
    };

    timerRef.current = setInterval(updateTimer, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / 300) * 100; // Porcentaje de tiempo restante
  const isTimeRunningOut = timeLeft <= 60; // Último minuto

  return (
    <div className={styles.timerContainer}>
      <div className={`${styles.timerBar} ${isTimeRunningOut ? styles.timeRunningOut : ''}`}>
        <div 
          className={styles.timerProgress} 
          style={{ width: `${progress}%` }}
        />
        <span className={styles.timerText}>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}; 