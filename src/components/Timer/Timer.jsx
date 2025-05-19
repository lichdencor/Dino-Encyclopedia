import React from 'react';
import styles from './Timer.module.css';
import { usePuzzle } from '../../context/Puzzle/PuzzleContext';
import { DIFFICULTY_LEVELS } from '../../context/Puzzle/PuzzleContext';

function Timer() {
  const { time, formatTime, showTimeoutMessage, difficulty } = usePuzzle();

  // No mostrar el timer cuando aparece el mensaje de timeout
  if (showTimeoutMessage) return null;

  // Calcular el porcentaje de tiempo restante
  const totalTime = DIFFICULTY_LEVELS[difficulty].time;
  const timePercentage = (time / totalTime) * 100;

  // Determinar si queda poco tiempo (menos del 25%)
  const isWarning = timePercentage <= 25;

  return (
    <div className={styles.timer}>
      <h2>Tiempo</h2>
      <div className={styles.timeDisplay}>
        {formatTime(time)}
      </div>
  
    </div>
  );
}

export default Timer; 