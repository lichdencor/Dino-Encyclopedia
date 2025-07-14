import React, { Component } from 'react';
import PuzzleCard from '../PuzzleCard/PuzzleCard.tsx';
import styles from './PuzzleMenu.module.css';
import { usePuzzle } from '../../context/Puzzle/PuzzleContext';
import { Puzzle } from '../../pages/public/Puzzleaurus/PuzzleaurusModel';
import { PuzzleMenuModel, PuzzleMenuState } from './PuzzleMenuModel';
import { PuzzleMenuController } from './PuzzleMenuController';

interface PuzzleMenuProps {
  onPuzzleSelect: (puzzle: Puzzle) => void;
  puzzleContext: any;
}

export class PuzzleMenuComponent extends Component<PuzzleMenuProps, PuzzleMenuState> {
  private model: PuzzleMenuModel;
  private controller: PuzzleMenuController;
  private unsubscribe: () => void;

  constructor(props: PuzzleMenuProps) {
    super(props);
    this.model = new PuzzleMenuModel(); // M4-13
    this.controller = new PuzzleMenuController(this.model, props.onPuzzleSelect, props.puzzleContext); // M4-15
    this.unsubscribe = this.model.subscribe(this.listenState.bind(this)); // M4-16
    this.state = this.model.getState();
  }

  componentDidMount(): void {
    this.controller.initialize();
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  listenState(newState: PuzzleMenuState): void { // M4-20 M4-66 M4-82 M4-94 M4-107 M4-123
    this.setState(newState); // M4-67 M4-83 M4-90 M4-95 M4-108 M4-124
  }

  render(): React.ReactNode {
    const { puzzles } = this.state;

    return (
      <div className={styles.puzzleMenu}>
        {puzzles.map((puzzle) => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            onClick={(difficulty) => this.onPuzzleSelect(puzzle, difficulty)}
          />
        ))}
      </div>
    );
  }

  private onPuzzleSelect(puzzle: Puzzle, difficulty: "easy" | "medium" | "hard") {// M4-28
    this.controller.handlePuzzleSelection(puzzle, difficulty);
  }
}

// HOC to inject puzzle context into class component
function withPuzzleContext(WrappedComponent: typeof PuzzleMenuComponent) {
  return function WithPuzzleContextComponent(props: Omit<PuzzleMenuProps, 'puzzleContext'>) {
    const puzzleContext = usePuzzle();
    return <WrappedComponent {...props} puzzleContext={puzzleContext} />;
  };
}

export default withPuzzleContext(PuzzleMenuComponent); 