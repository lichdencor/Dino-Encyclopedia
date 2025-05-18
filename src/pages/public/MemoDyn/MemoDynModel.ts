export interface MemoryGame {
    id: number;
    name: string;
    image: string;
    gridSize: number;
    difficulties: {
        easy: { name: string; time: number; };
        medium: { name: string; time: number; };
        hard: { name: string; time: number; };
    };
}

export interface GameSelection {
    game: MemoryGame;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface MemoDynState {
    selectedGame: GameSelection | null;
    currentSelection: number[];
    wins: number;
    cardOrder: number[];
    timeLeft: number;
    gameOver: boolean;
    showTips: boolean;
    showTransition: boolean;
    cardStates: string[];
}

export class MemoDynModel {
    private state: MemoDynState;
    private listeners: ((state: MemoDynState) => void)[] = [];
    private readonly MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';
    private timer: NodeJS.Timeout | null = null;

    constructor() {
        this.state = {
            selectedGame: null,
            currentSelection: [],
            wins: 0,
            cardOrder: [],
            timeLeft: 0,
            gameOver: false,
            showTips: false,
            showTransition: false,
            cardStates: []
        };
    }

    public initialize() {
        this.setState({
            showTips: localStorage.getItem(this.MEMODYN_TIPS_KEY) === 'true'
        });
    }

    public getState(): MemoDynState {
        return { ...this.state };
    }

    public subscribe(listener: (state: MemoDynState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setState(newState: Partial<MemoDynState>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    public handleStorageChange() {
        this.setState({
            showTips: localStorage.getItem(this.MEMODYN_TIPS_KEY) === 'true'
        });
    }

    public selectGame(selection: GameSelection) {
        const pairsCount = Math.floor(selection.game.gridSize / 2);
        const pairs = Array.from({ length: pairsCount }, (_, i) => [i, i]).flat();
        
        if (selection.game.gridSize % 2 !== 0) {
            pairs.push(pairsCount);
        }
        
        const shuffledOrder = this.shuffleArray(pairs);
        
        this.setState({
            selectedGame: selection,
            showTransition: true,
            cardOrder: shuffledOrder,
            cardStates: Array(selection.game.gridSize).fill("front"),
            wins: 0,
            currentSelection: [],
            gameOver: false,
            timeLeft: selection.game.difficulties[selection.difficulty].time * 60
        });

        this.startTimer();
    }

    public returnToMenu() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.setState({
            selectedGame: null,
            wins: 0,
            currentSelection: [],
            cardStates: [],
            cardOrder: [],
            gameOver: false,
            timeLeft: 0,
            showTransition: false
        });
    }

    public continue() {
        this.setState({ showTransition: false });
    }

    public handleCardClick(index: number) {
        if (!this.state.selectedGame || 
            this.state.cardStates[index] !== "front" || 
            this.state.currentSelection.includes(index) || 
            this.state.gameOver ||
            this.state.currentSelection.length >= 2) return;

        const newCardStates = [...this.state.cardStates];
        newCardStates[index] = `card-${this.state.cardOrder[index]}`;
        
        this.setState({
            cardStates: newCardStates,
            currentSelection: [...this.state.currentSelection, index]
        });

        if (this.state.currentSelection.length > 1) {
            this.checkMatch();
        }
    }

    private checkMatch() {
        const [first, second] = this.state.currentSelection;
        const firstCard = this.state.cardOrder[first];
        const secondCard = this.state.cardOrder[second];

        if (firstCard !== secondCard) {
            setTimeout(() => {
                const resetCardStates = [...this.state.cardStates];
                resetCardStates[first] = "front";
                resetCardStates[second] = "front";
                this.setState({
                    cardStates: resetCardStates,
                    currentSelection: []
                });
            }, 1200);
        } else {
            const newWins = this.state.wins + 1;
            const isGameComplete = newWins === Math.floor(this.state.selectedGame!.game.gridSize / 2);
            
            this.setState({
                wins: newWins,
                currentSelection: [],
                gameOver: isGameComplete
            });
        }
    }

    private startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            if (this.state.timeLeft <= 1) {
                this.setState({ timeLeft: 0, gameOver: true });
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            } else {
                this.setState({ timeLeft: this.state.timeLeft - 1 });
            }
        }, 1000);
    }

    private shuffleArray<T>(array: T[]): T[] {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
} 