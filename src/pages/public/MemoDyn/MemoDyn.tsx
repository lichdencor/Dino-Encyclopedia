import { useState, useEffect } from 'react';
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

const getPairsCount = (totalCards: number) => {
    return Math.floor(totalCards / 2);
};

const MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';

export const MemoDyn = () => {
    const [selectedGame, setSelectedGame] = useState<GameSelection | null>(null);
    const [currentSelection, setCurrentSelection] = useState<number[]>([]);
    const [wins, setWins] = useState<number>(0);
    const [cardOrder, setCardOrder] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [showTips, setShowTips] = useState<boolean>(false);
    const [showTransition, setShowTransition] = useState<boolean>(false);

    const cardImages = [
        "Card01", "Card02", "Card03", "Card04", "Card05",
        "Card06", "Card07", "Card08", "Card09", "Card10",
        "Card11", "Card12", "Card13", "Card14", "Card15"
    ];

    const [cardStates, setCardStates] = useState<string[]>([]);

    useEffect(() => {
        if (selectedGame) {
            const pairsCount = Math.floor(selectedGame.game.gridSize / 2);
            const pairs = Array.from({ length: pairsCount }, (_, i) => [i, i]).flat();
            
            if (selectedGame.game.gridSize % 2 !== 0) {
                pairs.push(pairsCount);
            }
            
            const shuffledOrder = shuffleArray(pairs);
            setCardOrder(shuffledOrder);
            setCardStates(Array(selectedGame.game.gridSize).fill("front"));
            setWins(0);
            setCurrentSelection([]);
            setGameOver(false);
            setTimeLeft(selectedGame.game.difficulties[selectedGame.difficulty].time * 60);
        }
    }, [selectedGame]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (selectedGame && timeLeft > 0 && !gameOver) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [selectedGame, timeLeft, gameOver]);

    useEffect(() => {
        setShowTips(localStorage.getItem(MEMODYN_TIPS_KEY) === 'true');
        const onStorage = () => setShowTips(localStorage.getItem(MEMODYN_TIPS_KEY) === 'true');
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleClick = (index: number) => {
        if (!selectedGame || cardStates[index] !== "front" || currentSelection.includes(index) || gameOver) return;

        const newCardStates = [...cardStates];
        newCardStates[index] = cardImages[cardOrder[index]];
        setCardStates(newCardStates);

        const newSelection = [...currentSelection, index];
        setCurrentSelection(newSelection);
    };

    useEffect(() => {
        if (currentSelection.length === 2) {
            const [first, second] = currentSelection;
            const firstCard = cardOrder[first];
            const secondCard = cardOrder[second];

            if (firstCard !== secondCard) {
                playSound('assets/Sounds/Lose.wav');
                setTimeout(() => {
                    const resetCardStates = [...cardStates];
                    resetCardStates[first] = "front";
                    resetCardStates[second] = "front";
                    setCardStates(resetCardStates);
                    setCurrentSelection([]);
                }, 1200);
            } else {
                setWins(wins + 1);
                setCurrentSelection([]);
                playSound('assets/Sounds/Win.wav');

                if (selectedGame && wins + 1 === Math.floor(selectedGame.game.gridSize / 2)) {
                    setGameOver(true);
                    playSound('assets/Sounds/End.wav');
                }
            }
        }
    }, [currentSelection, cardStates, wins, selectedGame, cardOrder]);

    const handleGameSelect = (selection: GameSelection) => {
        setSelectedGame(selection);
        setShowTransition(true);
    };

    const handleBackToMenu = () => {
        setSelectedGame(null);
        setWins(0);
        setCurrentSelection([]);
        setCardStates([]);
        setCardOrder([]);
        setGameOver(false);
        setTimeLeft(0);
        setShowTransition(false);
    };

    const handleContinue = () => {
        setShowTransition(false);
    };

    return (
        <div>
            <Nav />
            {!selectedGame ? (
                <div className="menu-container">
                    <MemoDynMenu onGameSelect={handleGameSelect} />
                </div>
            ) : (
                <div className="memoDyn-container">
                    {showTransition && showTips ? (
                        <DialogoTips
                            onContinue={handleContinue}
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
                                <div className="timer">Tiempo: {formatTime(timeLeft)}</div>
                                <button className="back-button" onClick={handleBackToMenu}>
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
                                        onClick={() => handleClick(index)}
                                    />
                                ))}
                            </div>
                            <div className="wins-counter">Pares encontrados: {wins} de {Math.floor(selectedGame.game.gridSize / 2)}</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MemoDyn;