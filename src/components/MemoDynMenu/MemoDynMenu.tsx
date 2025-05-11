import React from 'react';
import styles from './MemoDynMenu.module.css';

interface MemoryGame {
  id: number;
  name: string;
  image: string;
  gridSize: number;
  difficulties: {
    easy: { name: string; time: number; };
    medium: { name: string; time: number; };
    hard: { name: string; time: number; };
  };
}

interface MemoryGameSelection {
  game: MemoryGame;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface MemoDynMenuProps {
  onGameSelect: (selection: MemoryGameSelection) => void;
}

const memoryGames: MemoryGame[] = [
  {
    id: 1,
    name: "Memodyn Básico",
    image: "/assets/img/memorama/basic.jpg",
    gridSize: 14,
    difficulties: {
      easy: { name: "Fácil", time: 5 },
      medium: { name: "Medio", time: 3 },
      hard: { name: "Difícil", time: 1 }
    }
  },
  {
    id: 2,
    name: "Memodyn Intermedio",
    image: "/assets/img/memorama/intermediate.jpg",
    gridSize: 20,
    difficulties: {
      easy: { name: "Fácil", time: 6 },
      medium: { name: "Medio", time: 4 },
      hard: { name: "Difícil", time: 2 }
    }
  },
  {
    id: 3,
    name: "Memodyn Avanzado",
    image: "/assets/img/memorama/advanced.jpg",
    gridSize: 30,
    difficulties: {
      easy: { name: "Fácil", time: 8 },
      medium: { name: "Medio", time: 5 },
      hard: { name: "Difícil", time: 3 }
    }
  }
];

const MemoDynMenu: React.FC<MemoDynMenuProps> = ({ onGameSelect }) => {
  return (
    <div className={styles.memoDynMenu}>
      <div className={styles.gamesGrid}>
        {memoryGames.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <img src={game.image} alt={game.name} className={styles.gameImage} />
            <div className={styles.gameInfo}>
              <h3>{game.name}</h3>
              <div className={styles.difficultyContainer}>
                <div 
                  className={styles.difficultyOption} 
                  onClick={() => onGameSelect({ game, difficulty: 'easy' })}
                >
                  <img src="/assets/img/puzzles/dificultad/incomplete.png" alt="Fácil" />
                </div>
                <div 
                  className={styles.difficultyOption}
                  onClick={() => onGameSelect({ game, difficulty: 'medium' })}
                >
                  <img src="/assets/img/puzzles/dificultad/incomplete.png" alt="Medio" />
                </div>
                <div 
                  className={styles.difficultyOption}
                  onClick={() => onGameSelect({ game, difficulty: 'hard' })}
                >
                  <img src="/assets/img/puzzles/dificultad/incomplete.png" alt="Difícil" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoDynMenu; 