import { PuzzleaurusModel, Puzzle } from './PuzzleaurusModel';

export class PuzzleaurusController {
    private model: PuzzleaurusModel;

    constructor(model: PuzzleaurusModel) {
        this.model = model;

        // Bind methods to preserve 'this' context
        this.handlePuzzleSelect = this.handlePuzzleSelect.bind(this);
        this.handleReturnToMenu = this.handleReturnToMenu.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleStorageChange = this.handleStorageChange.bind(this);
    }

    public handlePuzzleSelect(puzzle: Puzzle) {
        this.model.selectPuzzle(puzzle); // M4-39
    }

    public handleReturnToMenu() { // M4-56
        this.model.returnToMenu();
    }

    public handleContinue() { // M4-50
        this.model.continue();
    }

    public handleStorageChange() {
        this.model.handleStorageChange();
    }
} 