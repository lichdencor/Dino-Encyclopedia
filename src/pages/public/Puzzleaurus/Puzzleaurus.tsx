import React, { Component } from 'react';
import { Nav } from "../../../components";
import PuzzleContainer from "../../../components/PuzzleContainer/PuzzleContainer";
import PuzzleMenu from "../../../components/PuzzleMenu/PuzzleMenu";
import DialogoTips from "../../../components/DialogoTips/DialogoTips.tsx";
import styles from "./Puzzleaurus.module.css";
import { PuzzleaurusModel, PuzzleaurusState } from './PuzzleaurusModel';
import { PuzzleaurusController } from './PuzzleaurusController';

// Define el tipo para la referencia del PuzzleContainer para el Cheat
type PuzzleContainerRef = {
    completePuzzle: () => void;
};

export class Puzzleaurus extends Component<{}, PuzzleaurusState> {
    private model: PuzzleaurusModel;
    private controller: PuzzleaurusController;
    private unsubscribe: (() => void) | null = null;
    private puzzleContainerRef = React.createRef<PuzzleContainerRef>();

    constructor(props: {}) {
        super(props);
        this.model = new PuzzleaurusModel();
        this.controller = new PuzzleaurusController(this.model);
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
            <div className={styles["games-page"]}>
                <Nav />
                <div className={styles["games-container"]}>
                    {selectedPuzzle ? (
                        <>
                            {showTransition && showTips ? (
                                <DialogoTips
                                    onContinue={this.controller.handleContinue}
                                    puzzleName={selectedPuzzle.name}
                                />
                            ) : (
                                <div className={styles["puzzle-content"]}>
                                    <div className={styles["puzzle-controls"]}>
                                        <button 
                                            className={styles["cheat-button"]}
                                            onClick={() => {
                                                if (this.puzzleContainerRef?.current) {
                                                    this.puzzleContainerRef.current.completePuzzle();
                                                }
                                            }}
                                        >
                                            CHEAT
                                        </button>
                                    </div>
                                    <PuzzleContainer
                                        ref={this.puzzleContainerRef}
                                        onReturnToMenu={this.controller.handleReturnToMenu}
                                        selectedPuzzle={{
                                            id: selectedPuzzle.id.toString(),
                                            difficulties: selectedPuzzle.difficulties
                                        }}
                                        key={selectedPuzzle.id}
                                    />
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