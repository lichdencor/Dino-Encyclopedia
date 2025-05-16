import { Component } from 'react';
import { Nav } from "../../../components";
import PuzzleContainer from "../../../components/PuzzleContainer/PuzzleContainer";
import PuzzleMenu from "../../../components/PuzzleMenu/PuzzleMenu";
import DialogoTips from "../../../components/DialogoTips/DialogoTips.tsx";
import styles from "./Puzzleaurus.module.css";

interface Puzzle {
    id: number;
    name: string;
    logoPuzzle: string;
    difficultysLogo: string[];
}

interface PuzzleaurusState {
    selectedPuzzle: Puzzle | null;
    showTransition: boolean;
    showTips: boolean;
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

const PUZZLEAURUS_TIPS_KEY = 'showPuzzleaurusTipsDialog';

export class Puzzleaurus extends Component<{}, PuzzleaurusState> {
    state: PuzzleaurusState = {
        selectedPuzzle: null,
        showTransition: false,
        showTips: false
    };

    componentDidMount() {
        this.setState({ showTips: localStorage.getItem(PUZZLEAURUS_TIPS_KEY) === 'true' });
        window.addEventListener('storage', this.handleStorageChange);
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.handleStorageChange);
    }

    handleStorageChange = () => {
        this.setState({ showTips: localStorage.getItem(PUZZLEAURUS_TIPS_KEY) === 'true' });
    };

    handlePuzzleSelect = (puzzle: Puzzle) => {
        this.setState({
            selectedPuzzle: puzzle,
            showTransition: true
        });
    };

    handleReturnToMenu = () => {
        this.setState({
            selectedPuzzle: null,
            showTransition: false
        });
    };

    handleContinue = () => {
        this.setState({ showTransition: false });
    };

    handlePrevPuzzle = () => {
        if (this.state.selectedPuzzle && this.state.selectedPuzzle.id > 1) {
            const prevPuzzle = puzzles.find((p: Puzzle) => p.id === this.state.selectedPuzzle!.id - 1);
            if (prevPuzzle) {
                this.setState({ selectedPuzzle: prevPuzzle });
            }
        }
    };

    handleNextPuzzle = () => {
        if (this.state.selectedPuzzle && this.state.selectedPuzzle.id < 6) {
            const nextPuzzle = puzzles.find((p: Puzzle) => p.id === this.state.selectedPuzzle!.id + 1);
            if (nextPuzzle) {
                this.setState({ selectedPuzzle: nextPuzzle });
            }
        }
    };

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
                                    onContinue={this.handleContinue}
                                    puzzleName={selectedPuzzle.name}
                                />
                            ) : (
                                <div className={styles.puzzleContent}>
                                    <PuzzleContainer 
                                        onReturnToMenu={this.handleReturnToMenu} 
                                        selectedPuzzle={selectedPuzzle}
                                        key={selectedPuzzle.id}
                                    />
                                    {/* Botones de navegación entre puzzles 
                                    <div className={styles.navigationButtons}>
                                        <button 
                                            className={`${styles.navButton} ${styles.prevButton}`}
                                            onClick={this.handlePrevPuzzle}
                                            disabled={selectedPuzzle.id === 1}
                                        >
                                            ← Puzzle Anterior
                                        </button>
                                        <button 
                                            className={`${styles.navButton} ${styles.nextButton}`}
                                            onClick={this.handleNextPuzzle}
                                            disabled={selectedPuzzle.id === 6}
                                        >
                                            Siguiente Puzzle →
                                        </button>
                                    </div>*/}
                                </div>
                            )}
                        </>
                    ) : (
                        <PuzzleMenu onPuzzleSelect={this.handlePuzzleSelect} />
                    )}
                </div>
            </div>
        );
    }
}

export default Puzzleaurus;