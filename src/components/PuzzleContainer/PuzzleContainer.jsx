import React, { useEffect, useRef } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import CompletionMessage from "../CompletionMessage/CompletionMessage";
import { usePuzzle } from "../../context/Puzzle/PuzzleContext";
import { DIFFICULTY_LEVELS } from "../../context/Puzzle/PuzzleContext";
import "./PuzzleContainer.css";
import Timer from "../Timer/Timer";
import TimeoutMessage from "../TimeoutMessage/TimeoutMessage";

const PuzzleContainer = ({ onReturnToMenu, selectedPuzzle }) => {
  const containerRef = useRef(null);
  const {
    pieces,
    isComplete,
    difficulty,
    resetCounter,
    setPieces,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    showTimeoutMessage,
    handleTimeoutClose,
    getPuzzleImage,
    getCompletedImage,
    setSelectedPuzzleId,
    time,
  } = usePuzzle();

  // Efecto para actualizar el selectedPuzzleId cuando cambie el puzzle seleccionado
  useEffect(() => {
    setSelectedPuzzleId(selectedPuzzle.id);
  }, [selectedPuzzle.id, setSelectedPuzzleId]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { rows, cols } = DIFFICULTY_LEVELS[difficulty];
    const totalPieces = rows * cols;

    const containerWidth = containerRef.current.clientWidth - 55;
    const containerHeight = containerRef.current.clientHeight - 100;

    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    const newPieces = Array.from({ length: totalPieces }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      return {
        id: i.toString(),
        currentX: col * pieceWidth,
        currentY: row * pieceHeight,
        correctX: col * pieceWidth,
        correctY: row * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
        image: getPuzzleImage(selectedPuzzle.id, difficulty),
        isDragging: false,
        backgroundX: -col * pieceWidth,
        backgroundY: -row * pieceHeight,
        backgroundWidth: containerWidth,
        backgroundHeight: containerHeight,
      };
    });

    const randomizedPieces = [...newPieces]
      .sort(() => Math.random() - 0.5)
      .map((piece, index) => ({
        ...piece,
        currentX: (index % cols) * pieceWidth,
        currentY: Math.floor(index / cols) * pieceHeight,
      }));

    setPieces(randomizedPieces);
  }, [difficulty, resetCounter, setPieces, selectedPuzzle.id, getPuzzleImage]);

  // Calculate time progress percentage
  const totalTime = DIFFICULTY_LEVELS[difficulty].time;
  const timeProgress = (time / totalTime) * 100;

  return (
    <>
      <div className="puzzle-game">
        <>  
              <div className="puzzle-time-container">
                {!isComplete && !showTimeoutMessage && (
                  <div className="bar-container">
                    <div className="bar">
                      <div className="timer-bar-container">
                        <div className="timer-bar">
                          <div
                            className={`timer-progress ${timeProgress <= 25 ? 'time-critical' : ''}`}
                            style={{ width: `${timeProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="puzzle-time-bottom">
                  <div className="timer-container">
                    <Timer />
                  </div>

                  <button className="return-to-menu" onClick={onReturnToMenu}>
                    BACK
                  </button>
                </div>
              </div>

              <div
                className={`puzzle-container ${isComplete ? "completed" : ""}`}
                ref={containerRef}
              >
                <div className="puzzle-pieces">
                  {isComplete ? (
                    <img
                      className="puzzle-completed"
                      src={getCompletedImage(selectedPuzzle.id)}
                      alt="Puzzle completado"
                    />
                  ) : (
                    pieces.map((piece) => (
                      <PuzzlePiece
                        key={piece.id}
                        piece={piece}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      />
                    ))
                  )}
                </div>
              </div>
          </>
        </div>
        {isComplete && <CompletionMessage />}
        {showTimeoutMessage && <TimeoutMessage onClose={handleTimeoutClose} />}
     

    </>
  );
};

export default PuzzleContainer;
