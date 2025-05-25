import React from 'react';
import styles from './PuzzleCard.module.css';

interface PuzzleCardProps {
  puzzle: {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultiesLogo: string[];
  };
  onClick: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, onClick }) => {
  const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

  return (
    <div className={styles["puzzle-card"]}>

      <img src={puzzle.logoPuzzle} className={styles["puzzle-img"]} alt="puzzle" />

      <h3 className={styles.title}>{puzzle.name}</h3>

      <div className={styles["difficulties-container"]}>
        {puzzle.difficultiesLogo.map((logo, index) => (
          <div className={styles["difficulty-container"]}>


            <button
              key={index}
              onClick={() => onClick(difficulties[index])}
              className={styles["difficulty-button"]}
            >

              <img
                src={logo}
                alt={`Dificultad ${difficulties[index]}`}
                className={styles["difficulty-icon"]}
              />
            </button>
            <p className={styles["difficulty"]}>{difficulties[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleCard; 