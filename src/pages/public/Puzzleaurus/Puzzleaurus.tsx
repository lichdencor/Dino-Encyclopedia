import  { useState } from 'react';
import { Nav } from "../../../components";
import PuzzleContainer from "../../../components/PuzzleContainer/PuzzleContainer";
import PuzzleMenu from "../../../components/PuzzleMenu/PuzzleMenu";
import TipsDialog from "../../../components/TipsDialog/TipsDialog.tsx";
import styles from "./Puzzleaurus.module.css";

interface Puzzle {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultysLogo: string[];
}

const puzzles: Puzzle[] = [
    {
        id: 1,
        name: "Dinosaurio",
        logoPuzzle: "/assets/img/puzzles/puzzle-1/puzzle-1.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 2,
        name: "Fósil",
        logoPuzzle: "/assets/img/puzzles/puzzle-2/puzzle-2.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 3,
        name: "Era Mesozoica",
        logoPuzzle: "/assets/img/puzzles/puzzle-3/puzzle-3.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 4,
        name: "Paleontología",
        logoPuzzle: "/assets/img/puzzles/puzzle-4/puzzle-4.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 5,
        name: "Excavación",
        logoPuzzle: "/assets/img/puzzles/puzzle-5/puzzle-5.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 6,
        name: "Museo",
        logoPuzzle: "/assets/img/puzzles/puzzle-6/puzzle-6.jpg",
        difficultysLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    }
];

export const Puzzleaurus = () => {
    const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
    const [showTransition, setShowTransition] = useState(false);

    const handlePuzzleSelect = (puzzle: Puzzle) => {
        setSelectedPuzzle(puzzle);
        setShowTransition(true);
    };

    const handleReturnToMenu = () => {
        setSelectedPuzzle(null);
        setShowTransition(false);
    };

    const handleContinue = () => {
        setShowTransition(false);
    };

    const handlePrevPuzzle = () => {
        if (selectedPuzzle && selectedPuzzle.id > 1) {
            const prevPuzzle = puzzles.find((p: Puzzle) => p.id === selectedPuzzle.id - 1);
            if (prevPuzzle) setSelectedPuzzle(prevPuzzle);
        }
    };

    const handleNextPuzzle = () => {
        if (selectedPuzzle && selectedPuzzle.id < 6) {
            const nextPuzzle = puzzles.find((p: Puzzle) => p.id === selectedPuzzle.id + 1);
            if (nextPuzzle) setSelectedPuzzle(nextPuzzle);
        }
    };

    return (
        <div className={styles.gamesPage}>
            <Nav />
            <div className={styles.gamesContainer}>
                {selectedPuzzle ? (
                    <>
                        {showTransition ? (
                            <TipsDialog
                                onContinue={handleContinue}
                                puzzleName={selectedPuzzle.name}
                            />
                        ) : (
                            <div className={styles.puzzleContent}>
                                <PuzzleContainer 
                                    onReturnToMenu={handleReturnToMenu} 
                                    selectedPuzzle={selectedPuzzle}
                                    key={selectedPuzzle.id}
                                />
                                {/* Botones de navegación entre puzzles 
                                <div className={styles.navigationButtons}>
                                    <button 
                                        className={`${styles.navButton} ${styles.prevButton}`}
                                        onClick={handlePrevPuzzle}
                                        disabled={selectedPuzzle.id === 1}
                                    >
                                        ← Puzzle Anterior
                                    </button>
                                    <button 
                                        className={`${styles.navButton} ${styles.nextButton}`}
                                        onClick={handleNextPuzzle}
                                        disabled={selectedPuzzle.id === 6}
                                    >
                                        Siguiente Puzzle →
                                    </button>
                                </div>*/}
                            </div>
                        )}
                    </>
                ) : (
                    <PuzzleMenu onPuzzleSelect={handlePuzzleSelect} />
                )}
            </div>
        </div>
    );
};

export default Puzzleaurus;