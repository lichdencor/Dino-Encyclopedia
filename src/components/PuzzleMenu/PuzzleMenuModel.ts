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

  private initializePuzzles(): Puzzle[] { // M4-14
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

  private setState(newState: Partial<PuzzleMenuState>): void { // M4-64 M4-80 M4-88   M4-92 M4-121
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void { // M4-42 M4-65 M4-81 M4-89 M4-93 M4-106 M4-122
    this.listeners.forEach(listener => listener(this.getState()));
  }

  public initialize(): void { // M4-18
    // Initialize puzzles are already loaded in constructor
    this.notifyListeners(); // M4-19
  }

  public setContextData(contextData: any): void { // M4-21
    this.setState({ contextData }); // M4-22
  }

  public selectPuzzleWithDifficulty(puzzle: Puzzle, difficulty: 'easy' | 'medium' | 'hard'): void {
    if (this.validatePuzzleAccess(puzzle)) {
      this.setState({ // M4-41
        selectedPuzzle: puzzle,
        selectedDifficulty: difficulty
      });
    }
  }

  public validatePuzzleAccess(puzzle: Puzzle): boolean { // M4-30
    // All puzzles are accessible in the menu
    return true; // M4-31
  }

  public dragStarted(piece: any): void { // M4-63
    this.setState({ draggedPiece: piece });
  }

  public piecesDropped(targetPiece: any, isComplete: boolean): void { // M4-79
    this.setState({
      draggedPiece: null,
      isComplete
    });
  }

  public resetPuzzle(): void { // M4-104
    this.setState({ // M4-105
      isComplete: false,
      resetCounter: this.state.resetCounter + 1
    });
  }

  public advanceToNextLevel(): void { // M4-119
    if (this.state.selectedDifficulty) {
      const nextDifficulty = this.getNextDifficulty(this.state.selectedDifficulty);
      this.setState({
        selectedDifficulty: nextDifficulty,
        isComplete: false,
        resetCounter: this.state.resetCounter + 1
      });
    }
  }

  private getNextDifficulty(currentDifficulty: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'hard' { // M4-120
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const currentIndex = difficulties.indexOf(currentDifficulty);
    return difficulties[Math.min(currentIndex + 1, difficulties.length - 1)];
  }

  public calculateCompletionStats(elapsedTime: number): void { // M4-87
    const stats = {
      elapsedTime,
      completedAt: new Date(),
      difficulty: this.state.selectedDifficulty
    };
    this.setState({ completionStats: stats });
  }

  public puzzleCompleted(): void { // M4-91
    this.setState({ isComplete: true });
  }
} 