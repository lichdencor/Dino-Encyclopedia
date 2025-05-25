export interface TipsState {
    puzzleaurusEnabled: boolean;
    memoDynEnabled: boolean;
}

export class TipsModel {
    private state: TipsState;
    private listeners: ((state: TipsState) => void)[] = [];
    private readonly PUZZLEAURUS_TIPS_KEY = 'showPuzzleaurusTipsDialog';
    private readonly MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';

    constructor() {
        this.state = {
            puzzleaurusEnabled: false,
            memoDynEnabled: false
        };
    }

    public initialize() {
        const puzzleaurusStored = localStorage.getItem(this.PUZZLEAURUS_TIPS_KEY);
        const memoDynStored = localStorage.getItem(this.MEMODYN_TIPS_KEY);
        
        this.setState({
            puzzleaurusEnabled: puzzleaurusStored === 'true',
            memoDynEnabled: memoDynStored === 'true'
        });
        this.notifyListeners();
    }

    public getState(): TipsState {
        return { ...this.state };
    }

    public subscribe(listener: (state: TipsState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(newState: Partial<TipsState>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    public togglePuzzleaurusTipsEnabled() {
        let togglePuzzleaurusEnabled = !this.state.puzzleaurusEnabled;
        localStorage.setItem(this.PUZZLEAURUS_TIPS_KEY, String(togglePuzzleaurusEnabled));
        this.setState({ puzzleaurusEnabled: togglePuzzleaurusEnabled });
    }

    public toggleMemoDynTipsEnabled() {
        let toggleMemoDynEnabled = !this.state.memoDynEnabled;
        localStorage.setItem(this.MEMODYN_TIPS_KEY, String(toggleMemoDynEnabled));
        this.setState({ memoDynEnabled: toggleMemoDynEnabled });
    }
} 