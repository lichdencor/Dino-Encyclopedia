import { Component } from 'react';
import { Nav } from "../../../components";
import PuzzleContainer from "../../../components/PuzzleContainer/PuzzleContainer";
import PuzzleMenu from "../../../components/PuzzleMenu/PuzzleMenu";
import DialogoTips from "../../../components/DialogoTips/DialogoTips.tsx";
import styles from "./Puzzleaurus.module.css";
import { PuzzleaurusModel, PuzzleaurusState, Puzzle } from './PuzzleaurusModel';
import { PuzzleaurusController } from './PuzzleaurusController';

const puzzles: Puzzle[] = [
    {
        id: 1,
        name: "Dinosaurio",
        logoPuzzle: "/assets/img/puzzles/puzzle-1/puzzle-1.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 2,
        name: "Fósil",
        logoPuzzle: "/assets/img/puzzles/puzzle-2/puzzle-2.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 3,
        name: "Era Mesozoica",
        logoPuzzle: "/assets/img/puzzles/puzzle-3/puzzle-3.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 4,
        name: "Paleontología",
        logoPuzzle: "/assets/img/puzzles/puzzle-4/puzzle-4.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 5,
        name: "Excavación",
        logoPuzzle: "/assets/img/puzzles/puzzle-5/puzzle-5.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    },
    {
        id: 6,
        name: "Museo",
        logoPuzzle: "/assets/img/puzzles/puzzle-6/puzzle-6.jpg",
        difficultiesLogo: [
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png",
            "/assets/img/puzzles/dificultad/incomplete.png"
        ]
    }
];

export class Puzzleaurus extends Component<{}, PuzzleaurusState> {
    private model: PuzzleaurusModel;
    private controller: PuzzleaurusController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: {}) {
        super(props);
        this.model = new PuzzleaurusModel();
        this.controller = new PuzzleaurusController(this.model, puzzles);
        this.state = this.model.getState();
    }

    componentDidMount() {
        this.unsubscribe = this.model.subscribe((newState) => {
            this.setState(newState);
        });
        this.model.initialize();
        window.addEventListener('storage', this.controller.handleStorageChange);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        window.removeEventListener('storage', this.controller.handleStorageChange);
    }

    render() {
        const { selectedPuzzle, showTransition, showTips } = this.state;

        return (
            <div className={styles.gamesPage}>
                <Nav />
                <div className={styles.gamesContainer}>
                    {selectedPuzzle ? (
                        <>
                            {showTransition && showTips ? (
                                <DialogoTips
                                    onContinue={this.controller.handleContinue}
                                    puzzleName={selectedPuzzle.name}
                                />
                            ) : (
                                <div className={styles.puzzleContent}>
                                    <PuzzleContainer 
                                        onReturnToMenu={this.controller.handleReturnToMenu} 
                                        selectedPuzzle={selectedPuzzle}
                                        key={selectedPuzzle.id}
                                    />
                                    {/* Botones de navegación entre puzzles 
                                    <div className={styles.navigationButtons}>
                                        <button 
                                            className={`${styles.navButton} ${styles.prevButton}`}
                                            onClick={this.controller.handlePrevPuzzle}
                                            disabled={selectedPuzzle.id === 1}
                                        >
                                            ← Puzzle Anterior
                                        </button>
                                        <button 
                                            className={`${styles.navButton} ${styles.nextButton}`}
                                            onClick={this.controller.handleNextPuzzle}
                                            disabled={selectedPuzzle.id === 6}
                                        >
                                            Siguiente Puzzle →
                                        </button>
                                    </div>*/}
                                </div>
                            )}
                        </>
                    ) : (
                        <PuzzleMenu onPuzzleSelect={this.controller.handlePuzzleSelect} />
                    )}
                </div>
            </div>
        );
    }
}

export default Puzzleaurus;