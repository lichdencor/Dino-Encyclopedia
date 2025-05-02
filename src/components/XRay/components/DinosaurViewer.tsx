import React from 'react';
import styles from '../XrayModal.module.css';
import stylesContainer from '../../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css';
import { DinosaurViewerProps } from '../types';

export const DinosaurViewer: React.FC<DinosaurViewerProps> = ({
  selectedDinosaur,
  activeDinosaur,
  onMouseMove,
  onMouseLeave,
  children
}) => {
  return (
    <div className={styles.dinosaurContainer}>
      <div
        key={`preview-${selectedDinosaur}`}
        className={stylesContainer.scannerCursorBg}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={
            `${stylesContainer.dinosaur} ${stylesContainer[`dinosaur${selectedDinosaur + 1}`]} ` +
            `${activeDinosaur === selectedDinosaur ? stylesContainer.activeBone : ""}`
          }
        >
          <div className={styles.containerPuzzlePiece}>
            {children}
          </div>
          <div
            className={
              `${stylesContainer[`dinosaur${selectedDinosaur + 1}Bone`]} ` +
              `${activeDinosaur === selectedDinosaur ? stylesContainer.activeBone : ""}`
            }
          />
        </div>
      </div>
    </div>
  );
}; 