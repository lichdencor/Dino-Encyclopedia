import { PuzzleaurusModel, Puzzle } from './PuzzleaurusModel';

export class PuzzleaurusController {
    private model: PuzzleaurusModel;
    private puzzles: Puzzle[];

    constructor(model: PuzzleaurusModel, puzzles: Puzzle[]) {
        this.model = model;
        this.puzzles = puzzles;

        // Bind methods to preserve 'this' context
        this.handlePuzzleSelect = this.handlePuzzleSelect.bind(this);
        this.handleReturnToMenu = this.handleReturnToMenu.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handlePrevPuzzle = this.handlePrevPuzzle.bind(this);
        this.handleNextPuzzle = this.handleNextPuzzle.bind(this);
        this.handleStorageChange = this.handleStorageChange.bind(this);
    }

    public handlePuzzleSelect(puzzle: Puzzle) {
        this.model.selectPuzzle(puzzle);
    }

    public handleReturnToMenu() {
        this.model.returnToMenu();
    }

    public handleContinue() {
        this.model.continue();
    }

    public handlePrevPuzzle() {
        const currentPuzzle = this.model.getState().selectedPuzzle;
        if (currentPuzzle && currentPuzzle.id > 1) {
            this.model.navigateToPuzzle(currentPuzzle.id - 1, this.puzzles);
        }
    }

    public handleNextPuzzle() {
        const currentPuzzle = this.model.getState().selectedPuzzle;
        if (currentPuzzle && currentPuzzle.id < this.puzzles.length) {
            this.model.navigateToPuzzle(currentPuzzle.id + 1, this.puzzles);
        }
    }

    public handleStorageChange() {
        this.model.handleStorageChange();
    }
} 