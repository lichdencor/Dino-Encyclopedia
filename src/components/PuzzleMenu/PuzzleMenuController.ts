import { PuzzleMenuModel } from './PuzzleMenuModel';
import { Puzzle } from '../../pages/public/Puzzleaurus/PuzzleaurusModel';

export class PuzzleMenuController {
  private model: PuzzleMenuModel;
  private onPuzzleSelect: (puzzle: Puzzle) => void;
  private puzzleContext: any;

  constructor(model: PuzzleMenuModel, onPuzzleSelect: (puzzle: Puzzle) => void, puzzleContext: any) {
    this.model = model;
    this.onPuzzleSelect = onPuzzleSelect;
    this.puzzleContext = puzzleContext;

    // Bind methods to preserve 'this' context
    this.initialize = this.initialize.bind(this);
    this.handlePuzzleSelection = this.handlePuzzleSelection.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleNextLevel = this.handleNextLevel.bind(this);
  }

  public initialize(): void { // M4-17
    this.model.initialize();
    this.model.setContextData(this.puzzleContext);
  }

  public handlePuzzleSelection(puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard'): void { // M4-29
    // Validate access before proceeding
    if (this.model.validatePuzzleAccess(puzzle)) { // M4-30
      // Configure puzzle in context
      if (this.puzzleContext.handleLevel && typeof this.puzzleContext.handleLevel === 'function') {
        this.puzzleContext.handleLevel(puzzle.id, difficulty); // M4-32
      }

      // Update model state
      this.model.selectPuzzleWithDifficulty(puzzle, difficulty); // M4-40

      // Notify parent component
      this.onPuzzleSelect(puzzle); // M4-44
    }
  }

  public handleDragStart(piece: any): void { // M4-62
    this.model.dragStarted(piece);

    // Delegate to puzzle context if available
    if (this.puzzleContext.handleDragStart) {
      this.puzzleContext.handleDragStart(piece); // M4-68
    }
  }

  public handleDrop(targetPiece: any): void { // M4-72
    // Delegate to puzzle context if available
    if (this.puzzleContext.handleDrop) {
      this.puzzleContext.handleDrop(targetPiece);
    }

    // Check if puzzle is complete
    const isComplete = this.puzzleContext.isComplete || false;
    this.model.piecesDropped(targetPiece, isComplete);

    if (isComplete) {
      this.handlePuzzleCompletion();
    }
  }

  public handlePlayAgain(): void { // M4-98
    // Reset puzzle in context
    if (this.puzzleContext.handlePlayAgain) {
      this.puzzleContext.handlePlayAgain();
    }

    // Reset model state
    this.model.resetPuzzle();
  }

  public handleNextLevel(): void { // M4-111
    // Advance to next level in context
    if (this.puzzleContext.handleNextLevel) {
      this.puzzleContext.handleNextLevel();
    }

    // Update model state
    this.model.advanceToNextLevel();
  }

  private handlePuzzleCompletion(): void { // M4-86
    // Get elapsed time from context
    const elapsedTime = this.puzzleContext.elapsedTime || 0;

    // Calculate completion stats
    this.model.calculateCompletionStats(elapsedTime);

    // Mark puzzle as completed
    this.model.puzzleCompleted();
  }

  public getModel(): PuzzleMenuModel {
    return this.model;
  }
} 