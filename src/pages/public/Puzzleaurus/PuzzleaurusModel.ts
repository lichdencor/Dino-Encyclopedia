export interface PuzzleDifficultyConfig {
    name: string;
    rows: number;
    cols: number;
    color: string;
    time: number;
}

export interface Puzzle {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultiesLogo: string[];
    difficulties: {
        easy: PuzzleDifficultyConfig;
        medium: PuzzleDifficultyConfig;
        hard: PuzzleDifficultyConfig;
    };
}

export interface PuzzleaurusState {
    selectedPuzzle: Puzzle | null;
    showTransition: boolean;
    showTips: boolean;
}

export class PuzzleaurusModel {
    private state: PuzzleaurusState;
    private listeners: ((state: PuzzleaurusState) => void)[] = [];
    private readonly PUZZLEAURUS_TIPS_KEY = 'showPuzzleaurusTipsDialog';

    constructor() {
        this.state = {
            selectedPuzzle: null,
            showTransition: false,
            showTips: false
        };
    }

    public initialize() { // M4-32
        this.setState({ // M4-35
            showTips: localStorage.getItem(this.PUZZLEAURUS_TIPS_KEY) === 'true'// M4-33/34
        });
    }

    public getState(): PuzzleaurusState {
        return { ...this.state };
    }

    public subscribe(listener: (state: PuzzleaurusState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(newState: Partial<PuzzleaurusState>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    public handleStorageChange() {
        this.setState({
            showTips: localStorage.getItem(this.PUZZLEAURUS_TIPS_KEY) === 'true'
        });
    }

    public selectPuzzle(puzzle: Puzzle) { // M4-46
        this.setState({
            selectedPuzzle: puzzle,
            showTransition: true
        });
    }

    public returnToMenu() { // M4-57
        this.setState({ // M4-58
            selectedPuzzle: null,
            showTransition: false
        });
    }

    public continue() { // M4-51
        this.setState({ showTransition: false }); // M4-52
    }

    public navigateToPuzzle(puzzleId: number, puzzles: Puzzle[]) {
        const puzzle = puzzles.find(p => p.id === puzzleId);
        if (puzzle) {
            this.setState({ selectedPuzzle: puzzle });
        }
    }
} 