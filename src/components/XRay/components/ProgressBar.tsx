import React from 'react';
import styles from '../XrayModal.module.css';
import { ProgressBarProps } from '../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, puzzlePieceFound }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBarContainer}>
        <span className={styles.progressText}>{Math.round(progress)}%</span>
        <div 
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.puzzlePieceContainer}>
        <div className={`${styles.puzzlePieceBar} ${puzzlePieceFound ? styles.found : ''}`} />
      </div>
    </div>
  );
}; 