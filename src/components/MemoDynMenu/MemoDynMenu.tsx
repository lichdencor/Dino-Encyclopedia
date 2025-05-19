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
    name: "Básico",
    image: "assets/img/cards/8.png",
    gridSize: 14,
    difficulties: {
      easy: { name: "Fácil", time: 5 },
      medium: { name: "Medio", time: 3 },
      hard: { name: "Difícil", time: 1 }
    }
  },
  {
    id: 2,
    name: "Intermedio",
    image: "assets/img/cards/15.png",
    gridSize: 20,
    difficulties: {
      easy: { name: "Fácil", time: 6 },
      medium: { name: "Medio", time: 4 },
      hard: { name: "Difícil", time: 2 }
    }
  },
  {
    id: 3,
    name: "Avanzado",
    image: "assets/img/cards/1.png",
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
    <div className={styles['memo-dyn-menu']}>
      <div className={styles['games-grid']}>
        {memoryGames.map((game) => (
          <div key={game.id} className={styles['game-card']}>
            <div className={styles['game-image']}>
              <img src={game.image} alt={game.name} />
            </div>
            <div className={styles['game-info']}>
              <h3>{game.name}</h3>
              <div className={styles['difficulty-container']}>
                <button 
                  className={styles['difficulty-option']} 
                  onClick={() => onGameSelect({ game, difficulty: 'easy' })}
                  title="Fácil"
                >
                  <img src="assets/img/puzzles/dificultad/incomplete.png" alt="Fácil" />
                </button>
                <button 
                  className={styles['difficulty-option']}
                  onClick={() => onGameSelect({ game, difficulty: 'medium' })}
                  title="Medio"
                >
                  <img src="assets/img/puzzles/dificultad/incomplete.png" alt="Medio" />
                </button>
                <button 
                  className={styles['difficulty-option']}
                  onClick={() => onGameSelect({ game, difficulty: 'hard' })}
                  title="Difícil"
                >
                  <img src="assets/img/puzzles/dificultad/incomplete.png" alt="Difícil" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoDynMenu; 