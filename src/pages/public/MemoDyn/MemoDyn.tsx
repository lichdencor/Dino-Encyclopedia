import { Component } from 'react';
import { Nav } from "../../../components";
import MemoDynMenu from "../../../components/MemoDynMenu/MemoDynMenu";
import DialogoTips from "../../../components/DialogoTips/DialogoTips";
import "./MemoDyn.css";

interface MemoryGame {
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

interface GameSelection {
    game: MemoryGame;
    difficulty: 'easy' | 'medium' | 'hard';
}

interface MemoDynState {
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

const loadAudio = (src: string): Promise<HTMLAudioElement> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio(src);
        audio.oncanplaythrough = () => resolve(audio);
        audio.onerror = () => reject(new Error(`Failed to load audio: ${src}`));
    });
};

const playSound = async (src: string) => {
    try {
        const audio = await loadAudio(src);
        audio.play();
    } catch (error) {
        console.error(error);
    }
};

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';

export class MemoDyn extends Component<{}, MemoDynState> {
    private cardImages = [
        "Card01", "Card02", "Card03", "Card04", "Card05",
        "Card06", "Card07", "Card08", "Card09", "Card10",
        "Card11", "Card12", "Card13", "Card14", "Card15"
    ];

    private timer: NodeJS.Timeout | null = null;

    state: MemoDynState = {
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

    componentDidMount() {
        this.setState({ showTips: localStorage.getItem(MEMODYN_TIPS_KEY) === 'true' });
        window.addEventListener('storage', this.handleStorageChange);
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.handleStorageChange);
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    componentDidUpdate(prevProps: {}, prevState: MemoDynState) {
        if (prevState.selectedGame !== this.state.selectedGame && this.state.selectedGame) {
            const pairsCount = Math.floor(this.state.selectedGame.game.gridSize / 2);
            const pairs = Array.from({ length: pairsCount }, (_, i) => [i, i]).flat();
            
            if (this.state.selectedGame.game.gridSize % 2 !== 0) {
                pairs.push(pairsCount);
            }
            
            const shuffledOrder = shuffleArray(pairs);
            this.setState({
                cardOrder: shuffledOrder,
                cardStates: Array(this.state.selectedGame.game.gridSize).fill("front"),
                wins: 0,
                currentSelection: [],
                gameOver: false,
                timeLeft: this.state.selectedGame.game.difficulties[this.state.selectedGame.difficulty].time * 60
            });
        }

        if (prevState.timeLeft !== this.state.timeLeft || 
            prevState.selectedGame !== this.state.selectedGame || 
            prevState.gameOver !== this.state.gameOver) {
            if (this.state.selectedGame && this.state.timeLeft > 0 && !this.state.gameOver) {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(() => {
                    this.setState((prevState: MemoDynState) => {
                        if (prevState.timeLeft <= 1) {
                            return { timeLeft: 0, gameOver: true } as Pick<MemoDynState, 'timeLeft' | 'gameOver'>;
                        }
                        return { timeLeft: prevState.timeLeft - 1 } as Pick<MemoDynState, 'timeLeft'>;
                    });
                }, 1000);
            } else if (this.timer) {
                clearInterval(this.timer);
            }
        }

        if (prevState.currentSelection !== this.state.currentSelection && this.state.currentSelection.length === 2) {
            const [first, second] = this.state.currentSelection;
            const firstCard = this.state.cardOrder[first];
            const secondCard = this.state.cardOrder[second];

            if (firstCard !== secondCard) {
                playSound('assets/Sounds/Lose.wav');
                setTimeout(() => {
                    this.setState((prevState: MemoDynState) => {
                        const resetCardStates = [...prevState.cardStates];
                        resetCardStates[first] = "front";
                        resetCardStates[second] = "front";
                        return {
                            cardStates: resetCardStates,
                            currentSelection: []
                        } as Pick<MemoDynState, 'cardStates' | 'currentSelection'>;
                    });
                }, 1200);
            } else {
                this.setState((prevState: MemoDynState) => {
                    const newWins = prevState.wins + 1;
                    const isGameComplete = newWins === Math.floor(prevState.selectedGame!.game.gridSize / 2);
                    
                    if (isGameComplete) {
                        playSound('assets/Sounds/End.wav');
                        return {
                            wins: newWins,
                            currentSelection: [],
                            gameOver: true
                        } as Pick<MemoDynState, 'wins' | 'currentSelection' | 'gameOver'>;
                    }
                    
                    playSound('assets/Sounds/Win.wav');
                    return {
                        wins: newWins,
                        currentSelection: []
                    } as Pick<MemoDynState, 'wins' | 'currentSelection'>;
                });
            }
        }
    }

    handleStorageChange = () => {
        this.setState({ showTips: localStorage.getItem(MEMODYN_TIPS_KEY) === 'true' });
    };

    formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    handleClick = (index: number) => {
        if (!this.state.selectedGame || 
            this.state.cardStates[index] !== "front" || 
            this.state.currentSelection.includes(index) || 
            this.state.gameOver) return;

        this.setState(prevState => ({
            cardStates: prevState.cardStates.map((state, i) => 
                i === index ? this.cardImages[prevState.cardOrder[index]] : state
            ),
            currentSelection: [...prevState.currentSelection, index]
        }));
    };

    handleGameSelect = (selection: GameSelection) => {
        this.setState({
            selectedGame: selection,
            showTransition: true
        });
    };

    handleBackToMenu = () => {
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
    };

    handleContinue = () => {
        this.setState({ showTransition: false });
    };

    render() {
        const { selectedGame, showTransition, showTips, timeLeft, gameOver, wins, cardStates, cardOrder } = this.state;

        return (
            <div>
                <Nav />
                {!selectedGame ? (
                    <div className="menu-container">
                        <MemoDynMenu onGameSelect={this.handleGameSelect} />
                    </div>
                ) : (
                    <div className="memoDyn-container">
                        {showTransition && showTips ? (
                            <DialogoTips
                                onContinue={this.handleContinue}
                                puzzleName={selectedGame.game.name}
                            />
                        ) : (
                            <>
                                <div className="game-header">
                                    <div className="game-info">
                                        <h2>{selectedGame.game.name}</h2>
                                        <p className="difficulty-info">
                                            Dificultad: {selectedGame.game.difficulties[selectedGame.difficulty].name}
                                        </p>
                                    </div>
                                    <div className="timer">Tiempo: {this.formatTime(timeLeft)}</div>
                                    <button className="back-button" onClick={this.handleBackToMenu}>
                                        Volver al Menú
                                    </button>
                                </div>
                                {gameOver && (
                                    <div className="game-over-message">
                                        {wins === Math.floor(selectedGame.game.gridSize / 2) ? "¡Ganaste!" : "¡Se acabó el tiempo!"}
                                    </div>
                                )}
                                <div className={`cardcontainer grid-${selectedGame.game.gridSize}`}>
                                    {cardStates.map((state, index) => (
                                        <div
                                            key={index}
                                            className={`card ${state === "front" ? "card-front" : `card-${cardOrder[index]}`}`}
                                            onClick={() => this.handleClick(index)}
                                        />
                                    ))}
                                </div>
                                <div className="wins-counter">
                                    Pares encontrados: {wins} de {Math.floor(selectedGame.game.gridSize / 2)}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default MemoDyn;