import React from 'react';
import PuzzleCard from '../PuzzleCard/PuzzleCard.tsx';
import styles from './PuzzleMenu.module.css';
import {DIFFICULTY_LEVELS, usePuzzle} from '../../context/Puzzle/PuzzleContext';
import { Puzzle } from '../../pages/public/Puzzleaurus/PuzzleaurusModel';

interface PuzzleMenuProps {
  onPuzzleSelect: (puzzle: Puzzle) => void;
}

const puzzles = [
  {
    id: 1,
    name: "Tyranosaurus Rex",
    logoPuzzle: "/assets/img/puzzles/puzzle-1/puzzle-1.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  },
  {
    id: 2,
    name: "Spinosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-2/puzzle-2.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  },
  {
    id: 3,
    name: "Gigantosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-3/puzzle-3.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  },
  {
    id: 4,
    name: "Baryonyx",
    logoPuzzle: "/assets/img/puzzles/puzzle-4/puzzle-4.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  },
  {
    id: 5,
    name: "Allosaurus",
    logoPuzzle: "/assets/img/puzzles/puzzle-5/puzzle-5.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  },
  {
    id: 6,
    name: "Velociraptor",
    logoPuzzle: "/assets/img/puzzles/puzzle-6/puzzle-6.jpg",
    difficultiesLogo: [
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png",
      "/assets/img/puzzles/dificultad/incomplete.png"
    ],
    difficulties: {
      easy: { ...DIFFICULTY_LEVELS.easy },
      medium: { ...DIFFICULTY_LEVELS.medium },
      hard: { ...DIFFICULTY_LEVELS.hard }
    }
  }
];

const PuzzleMenu: React.FC<PuzzleMenuProps> = ({ onPuzzleSelect }) => {
  const puzzleContext = usePuzzle() as any;
  const { handleLevel } = puzzleContext;

  const handlePuzzleAndLevel = (puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard') => {
    if (handleLevel && typeof handleLevel === 'function') {
      handleLevel(puzzle.id, difficulty);
      onPuzzleSelect(puzzle);
    }
  };

  return (
    <div className={styles.puzzleMenu}>
      
        {puzzles.map((puzzle) => (
          <PuzzleCard 
            key={puzzle.id} 
            puzzle={puzzle}
            onClick={(difficulty) => handlePuzzleAndLevel(puzzle, difficulty)}
          />
        ))}
      </div>
   
  );
};

export default PuzzleMenu; 