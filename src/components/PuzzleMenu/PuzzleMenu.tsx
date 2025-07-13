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
    this.model = new PuzzleMenuModel();
    this.controller = new PuzzleMenuController(this.model, props.onPuzzleSelect, props.puzzleContext);
    this.unsubscribe = this.model.subscribe(this.handleStateChange.bind(this));
    this.state = this.model.getState();
  }

  componentDidMount(): void {
    this.controller.initialize();
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  handleStateChange(newState: PuzzleMenuState): void {
    this.setState(newState);
  }

  render(): React.ReactNode {
    const { puzzles } = this.state;

    return (
      <div className={styles.puzzleMenu}>
        {puzzles.map((puzzle) => (
          <PuzzleCard 
            key={puzzle.id} 
            puzzle={puzzle}
            onClick={(difficulty) => this.controller.handlePuzzleSelection(puzzle, difficulty)}
          />
        ))}
      </div>
    );
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