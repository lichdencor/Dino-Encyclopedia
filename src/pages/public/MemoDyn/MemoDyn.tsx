import { useState, useEffect } from 'react';
import { Nav } from "../../../components";
import "./MemoDyn.css";

const loadAudio = (src: string) => {
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

export const MemoDyn = () => {
    const [currentSelection, setCurrentSelection] = useState<number[]>([]);
    const [wins, setWins] = useState<number>(0);

    const cardImages = [
        "Card01",
        "Card02",
        "Card03",
        "Card04",
        "Card05",
        "Card06",
        "Card07",
        "Card08"
    ];

    const [cardStates, setCardStates] = useState<string[]>(Array(16).fill("front"));

    const handleClick = (index: number) => {
        const newCardStates = [...cardStates];
        newCardStates[index] = cardImages[index % cardImages.length];
        setCardStates(newCardStates);

        const newSelection = [...currentSelection, index];
        setCurrentSelection(newSelection);
    };

    useEffect(() => {
        if (currentSelection.length === 2) {
            const [first, second] = currentSelection;

            if (cardStates[first] !== cardStates[second]) {
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

                if (wins + 1 === 8) {
                    playSound('assets/Sounds/End.wav');
                }
            }
        }
    }, [currentSelection, cardStates, wins]);

    return (
        <div className="memoDyn-container">
            <Nav />
            <div className="cardcontainer">
                {cardStates.map((state, index) => (
                    <div
                        key={index}
                        className={`card ${state === "front" ? "card-front" : `card-${index % cardImages.length}`}`}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
            <div>Wins: {wins}</div>
        </div>
    );
};

export default MemoDyn;