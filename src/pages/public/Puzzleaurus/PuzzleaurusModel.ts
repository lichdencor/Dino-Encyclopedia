export interface Puzzle {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultysLogo: string[];
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

    public initialize() {
        this.setState({
            showTips: localStorage.getItem(this.PUZZLEAURUS_TIPS_KEY) === 'true'
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

    public selectPuzzle(puzzle: Puzzle) {
        this.setState({
            selectedPuzzle: puzzle,
            showTransition: true
        });
    }

    public returnToMenu() {
        this.setState({
            selectedPuzzle: null,
            showTransition: false
        });
    }

    public continue() {
        this.setState({ showTransition: false });
    }

    public navigateToPuzzle(puzzleId: number, puzzles: Puzzle[]) {
        const puzzle = puzzles.find(p => p.id === puzzleId);
        if (puzzle) {
            this.setState({ selectedPuzzle: puzzle });
        }
    }
} 