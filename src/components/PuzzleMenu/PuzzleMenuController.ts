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

  public initialize(): void {
    this.model.initialize();
    this.model.setContextData(this.puzzleContext);
  }

  public handlePuzzleSelection(puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard'): void {
    // Validate access before proceeding
    if (this.model.validatePuzzleAccess(puzzle)) {
      // Configure puzzle in context
      if (this.puzzleContext.handleLevel && typeof this.puzzleContext.handleLevel === 'function') {
        this.puzzleContext.handleLevel(puzzle.id, difficulty);
      }
      
      // Update model state
      this.model.selectPuzzleWithDifficulty(puzzle, difficulty);
      
      // Notify parent component
      this.onPuzzleSelect(puzzle);
    }
  }

  public handleDragStart(piece: any): void {
    this.model.dragStarted(piece);
    
    // Delegate to puzzle context if available
    if (this.puzzleContext.handleDragStart) {
      this.puzzleContext.handleDragStart(piece);
    }
  }

  public handleDrop(targetPiece: any): void {
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

  public handlePlayAgain(): void {
    // Reset puzzle in context
    if (this.puzzleContext.handlePlayAgain) {
      this.puzzleContext.handlePlayAgain();
    }
    
    // Reset model state
    this.model.resetPuzzle();
  }

  public handleNextLevel(): void {
    // Advance to next level in context
    if (this.puzzleContext.handleNextLevel) {
      this.puzzleContext.handleNextLevel();
    }
    
    // Update model state
    this.model.advanceToNextLevel();
  }

  private handlePuzzleCompletion(): void {
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