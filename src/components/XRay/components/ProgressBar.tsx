import React from 'react';
import styles from '../XrayModal.module.css';
import { ProgressBarProps } from '../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ era, progress, puzzlePieceFound }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={`${styles.progressBarContainer} ${
                  era === 'triassic'
                    ? styles['progressBarContainer-triassic']
                    : era === 'jurassic'
                    ? styles['progressBarContainer-jurassic']
                    : styles['progressBarContainer-cretaceous']
                }`}>
        <span className={styles.progressText}>{Math.round(progress)}%</span>
        <div 
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`${styles.puzzlePieceContainer} ${
                  era === 'triassic'
                    ? styles['puzzlePieceContainer-triassic']
                    : era === 'jurassic'
                    ? styles['puzzlePieceContainer-jurassic']
                    : styles['puzzlePieceContainer-cretaceous']
                }`}>
        <div className={`${styles.puzzlePieceBar} ${puzzlePieceFound ? styles.found : ''}`} />
      </div>
    </div>
  );
}; 