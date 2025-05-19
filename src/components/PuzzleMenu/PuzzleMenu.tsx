import React from 'react';
import PuzzleCard from '../PuzzleCard/PuzzleCard.tsx';
import styles from './PuzzleMenu.module.css';
import { usePuzzle } from '../../context/Puzzle/PuzzleContext';

interface Puzzle {
  id: number;
  name: string;
  logoPuzzle: string;
  difficultysLogo: string[];
}

interface PuzzleMenuProps {
  onPuzzleSelect: (puzzle: Puzzle) => void;
}

const puzzles = [
  {
    id: 1,
    name: "Tyranosaurus Rex",
    logoPuzzle: "/assets/img/puzzles/puzzle-1/puzzle-1.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  },
  {
    id: 2,
    name: "Spinosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-2/puzzle-2.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  },
  {
    id: 3,
    name: "Gigantosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-3/puzzle-3.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  },
  {
    id: 4,
    name: "Baryonyx",
    logoPuzzle: "/assets/img/puzzles/puzzle-4/puzzle-4.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  },
  {
    id: 5,
    name: "Allosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-5/puzzle-5.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  },
  {
    id: 6,
    name: "Velociraptor",
    logoPuzzle: "/assets/img/puzzles/puzzle-6/puzzle-6.jpg",
    difficultysLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ]
  }
];

const PuzzleMenu: React.FC<PuzzleMenuProps> = ({ onPuzzleSelect }) => {
  const { handleLevel } = usePuzzle();

  const handlePuzzleAndLevel = (puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard') => {
    if (handleLevel) {
      handleLevel(puzzle.id, difficulty);
      onPuzzleSelect(puzzle);
    }
  };

  return (
    <div className={styles.puzzleMenu}>
      <div className={styles.puzzlesGrid}>
        {puzzles.map((puzzle) => (
          <PuzzleCard 
            key={puzzle.id} 
            puzzle={puzzle}
            onClick={(difficulty) => handlePuzzleAndLevel(puzzle, difficulty)}
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleMenu; 