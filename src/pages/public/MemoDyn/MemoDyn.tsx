import { Component } from 'react';
import { Nav } from "../../../components";
import MemoDynMenu from "../../../components/MemoDynMenu/MemoDynMenu";
import DialogoTips from "../../../components/DialogoTips/DialogoTips";
import "./MemoDyn.css";
import { MemoDynModel, MemoDynState } from './MemoDynModel';
import { MemoDynController } from './MemoDynController';

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

export class MemoDyn extends Component<{}, MemoDynState> {
    private model: MemoDynModel;
    private controller: MemoDynController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: {}) {
        super(props);
        this.model = new MemoDynModel();
        this.controller = new MemoDynController(this.model);
        this.state = this.model.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((newState) => {
            this.setState(newState);
        });
        this.model.initialize();
        window.addEventListener('storage', this.controller.handleStorageChange);
    }

    componentDidUpdate(prevProps: {}, prevState: MemoDynState) {
        // Reproducir sonido cuando se encuentra un par
        if (this.state.wins > prevState.wins) {
            playSound('assets/Sounds/Win.wav');
        }

        // Reproducir sonido cuando no coinciden las cartas
        if (this.state.currentSelection.length === 2 && prevState.currentSelection.length === 1) {
            const [first, second] = this.state.currentSelection;
            const firstCard = this.state.cardOrder[first];
            const secondCard = this.state.cardOrder[second];
            
            if (firstCard !== secondCard) {
                playSound('assets/Sounds/Lose.wav');
            }
        }

        // Reproducir sonido cuando se gana el juego
        if (!prevState.gameOver && this.state.gameOver && 
            this.state.wins === Math.floor(this.state.selectedGame!.game.gridSize / 2)) {
            playSound('assets/Sounds/End.wav');
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        window.removeEventListener('storage', this.controller.handleStorageChange);
    }

    formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    render() {
        const { selectedGame, showTransition, showTips, timeLeft, gameOver, wins, cardStates, cardOrder } = this.state;

        return (
            <>
                <Nav />
                {!selectedGame ? (
                    <div className="menu-container">
                        <div className="gamesContainer">
                            <MemoDynMenu onGameSelect={this.controller.handleGameSelect} />
                        </div>
                    </div>
                ) : (
                    <div className="memoDyn-container">
                        {showTransition && showTips ? (
                            <DialogoTips
                                onContinue={this.controller.handleContinue}
                                puzzleName={selectedGame.game.name}
                            />
                        ) : (
                            <div className="game-content">
                                <div className="game-header">
                                    <div className="game-info">
                                        <h2>{selectedGame.game.name}</h2>
                                        <p className="difficulty-info">
                                            Dificultad: {selectedGame.game.difficulties[selectedGame.difficulty].name}
                                        </p>
                                    </div>
                                    <div className="timer">Tiempo: {this.formatTime(timeLeft)}</div>
                                    <button className="back-button" onClick={this.controller.handleBackToMenu}>
                                        Volver al Menú
                                    </button>
                                </div>

                                <div className="game-area">
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
                                                onClick={() => this.controller.handleCardClick(index)}
                                            />
                                        ))}
                                    </div>

                                    <div className="pairs-counter">
                                        Pares encontrados: {wins} de {Math.floor(selectedGame.game.gridSize / 2)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    }
}

export default MemoDyn;