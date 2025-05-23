import React from 'react';
import styles from './PuzzleCard.module.css';

interface PuzzleCardProps {
  puzzle: {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultysLogo: string[];
  };
  onClick: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, onClick }) => {
  const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

  return (
    <div className={styles.puzzleCard}>
      <div className={styles.imageContainer}>
        {/* <img
          src={puzzle.logoPuzzle}
          alt={puzzle.name}
          className={styles.puzzleImage}
        /> */}
        <div className={styles.puzzleImage} style={{
          backgroundImage: `url(${puzzle.logoPuzzle})`
        }}></div>
        <div className={styles.overlay} />
      </div>
      <h3 className={styles.title}>{puzzle.name}</h3>

      <div className={styles.difficultyContainer}>
        {puzzle.difficultysLogo.map((logo, index) => (
          <button
            key={index}
            onClick={() => onClick(difficulties[index])}
            className={styles.difficultyButton}
          >
            <img
              src={logo}
              alt={`Dificultad ${difficulties[index]}`}
              className={styles.difficultyIcon}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PuzzleCard; 