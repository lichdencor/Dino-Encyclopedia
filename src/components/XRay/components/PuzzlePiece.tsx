import React from 'react';
import styles from '../XrayModal.module.css';
import { PuzzlePieceProps } from '../types';

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  position,
  showAlert,
  onMouseEnter,
  onMouseLeave
}) => {
  const handleMouseLeave = (_: React.MouseEvent) => {
    onMouseLeave();
  };

  return (
    <img
      className={`${styles.puzzlePiece} ${showAlert ? styles.hiddenPiece : ""}`}
      src="/assets/img/puzzles/puzzle-piece.png"
      style={{
        top: `${position.top * 100}%`,
        left: `${position.left * 100}%`,
        margin: "5px"
      }}
      alt="puzzle piece"
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOut={handleMouseLeave}
    />
  );
}; 