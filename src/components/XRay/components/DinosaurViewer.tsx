import React from 'react';
import styles from '../XrayModal.module.css';
import { DinosaurViewerProps } from '../types';

export const DinosaurViewer: React.FC<DinosaurViewerProps> = ({
  selectedDinosaur,
  activeDinosaur,
  onMouseMove,
  onMouseLeave,
  children,
  dinosaurImage,
  dinosaurBone,
  stylesContainer
}) => {
  return (
    <div className={styles["dinosaur-container"]}>
      <div
        key={`preview-${selectedDinosaur}`}
        className={stylesContainer.scannerCursorBg}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={
            `${stylesContainer.dinosaur} ${stylesContainer[`dinosaur-${selectedDinosaur + 1}`]} ` +
            `${activeDinosaur === selectedDinosaur ? stylesContainer["active-bone"] : ""}`
          }
          style={{ backgroundImage: `url(${dinosaurImage})` }}
        >
          <div className={styles.containerPuzzlePiece}>
            {children}
          </div>
          <div
            className={
              `${stylesContainer[`dinosaur-${selectedDinosaur + 1}-bone`]} ` +
              `${activeDinosaur === selectedDinosaur ? stylesContainer["active-bone"] : ""}`
            }
            style={{ backgroundImage: `url(${dinosaurBone})` }}
          />
        </div>
      </div>
    </div>
  );
}; 