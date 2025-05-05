import React from 'react';
import styles from './PuzzleCard.module.css';

interface PuzzleCardProps {
  puzzle: {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultysLogo: string[];
  };
  onClick: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, onClick }) => {
  return (
    <div className={styles.puzzleCard} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img 
          src={puzzle.logoPuzzle} 
          alt={puzzle.name} 
          className={styles.puzzleImage}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{puzzle.name}</h3>
        <div className={styles.difficultyContainer}>
          {puzzle.difficultysLogo.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Dificultad ${index + 1}`}
              className={styles.difficultyIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleCard; 