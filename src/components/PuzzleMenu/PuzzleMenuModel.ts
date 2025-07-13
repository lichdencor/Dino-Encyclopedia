import { DIFFICULTY_LEVELS } from '../../context/Puzzle/PuzzleContext';
import { Puzzle } from '../../pages/public/Puzzleaurus/PuzzleaurusModel';

export interface PuzzleMenuState {
  puzzles: Puzzle[];
  selectedPuzzle: Puzzle | null;
  selectedDifficulty: 'easy' | 'medium' | 'hard' | null;
  contextData: any;
  draggedPiece: any;
  isComplete: boolean;
  completionStats: any;
  resetCounter: number;
}

export class PuzzleMenuModel {
  private state: PuzzleMenuState;
  private listeners: ((state: PuzzleMenuState) => void)[] = [];

  constructor() {
    this.state = {
      puzzles: this.initializePuzzles(),
      selectedPuzzle: null,
      selectedDifficulty: null,
      contextData: null,
      draggedPiece: null,
      isComplete: false,
      completionStats: null,
      resetCounter: 0
    };
  }

  private initializePuzzles(): Puzzle[] {
    return [
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
  }

  public getState(): PuzzleMenuState {
    return { ...this.state };
  }

  public subscribe(listener: (state: PuzzleMenuState) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private setState(newState: Partial<PuzzleMenuState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  public initialize(): void {
    // Initialize puzzles are already loaded in constructor
    this.notifyListeners();
  }

  public setContextData(contextData: any): void {
    this.setState({ contextData });
  }

  public selectPuzzleWithDifficulty(puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard'): void {
    if (this.validatePuzzleAccess(puzzle)) {
      this.setState({
        selectedPuzzle: puzzle,
        selectedDifficulty: difficulty
      });
    }
  }

  public validatePuzzleAccess(puzzle: Puzzle): boolean {
    // All puzzles are accessible in the menu
    return true;
  }

  public dragStarted(piece: any): void {
    this.setState({ draggedPiece: piece });
  }

  public piecesDropped(targetPiece: any, isComplete: boolean): void {
    this.setState({
      draggedPiece: null,
      isComplete
    });
  }

  public resetPuzzle(): void {
    this.setState({
      isComplete: false,
      resetCounter: this.state.resetCounter + 1
    });
  }

  public advanceToNextLevel(): void {
    if (this.state.selectedDifficulty) {
      const nextDifficulty = this.getNextDifficulty(this.state.selectedDifficulty);
      this.setState({
        selectedDifficulty: nextDifficulty,
        isComplete: false,
        resetCounter: this.state.resetCounter + 1
      });
    }
  }

  private getNextDifficulty(currentDifficulty: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'hard' {
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const currentIndex = difficulties.indexOf(currentDifficulty);
    return difficulties[Math.min(currentIndex + 1, difficulties.length - 1)];
  }

  public calculateCompletionStats(elapsedTime: number): void {
    const stats = {
      elapsedTime,
      completedAt: new Date(),
      difficulty: this.state.selectedDifficulty
    };
    this.setState({ completionStats: stats });
  }

  public puzzleCompleted(): void {
    this.setState({ isComplete: true });
  }
} 