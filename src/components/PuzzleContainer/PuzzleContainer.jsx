import React, { Component, forwardRef, useImperativeHandle } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import CompletionMessage from "../CompletionMessage/CompletionMessage";
import { DIFFICULTY_LEVELS } from "../../context/Puzzle/PuzzleContext";
import "./PuzzleContainer.css";
import Timer from "../Timer/Timer";
import TimerBar from "../TimerBar/TimerBar";
import TimeoutMessage from "../TimeoutMessage/TimeoutMessage";
import TimerModel from "../../models/TimerModel";
import { usePuzzle } from "../../context/Puzzle/PuzzleContext";

// Componente base que maneja la lógica del puzzle
class PuzzleContainerBase extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    // Inicializar con valores por defecto si no hay selectedPuzzle
    const defaultConfig = {
      name: 'easy',
      rows: 3,
      cols: 5,
      color: '#4CAF50',
      time: 60
    };
    
    const { selectedPuzzle, difficulty } = props;
    // Usar 'easy' como dificultad por defecto
    const difficultyConfig = selectedPuzzle?.difficulties?.[difficulty] || defaultConfig;
    this.timerModel = new TimerModel(difficultyConfig);

    // Bind methods
    this.initializePuzzle = this.initializePuzzle.bind(this);
    this.completePuzzle = this.completePuzzle.bind(this);
  }

  componentDidMount() {
    this.props.setSelectedPuzzleId(this.props.selectedPuzzle.id);
    this.initializePuzzle();
  }

  componentDidUpdate(prevProps) {
    const { selectedPuzzle, time, showTimeoutMessage, difficulty } = this.props;

    if (prevProps.selectedPuzzle?.id !== selectedPuzzle?.id) {
      this.props.setSelectedPuzzleId(selectedPuzzle.id);
    }

    if (prevProps.time !== time) {
      this.timerModel.setTime(time);
    }

    if (prevProps.showTimeoutMessage !== showTimeoutMessage) {
      this.timerModel.setShowTimeoutMessage(showTimeoutMessage);
    }

    // Usar 'easy' como dificultad por defecto
    if (prevProps.selectedPuzzle !== selectedPuzzle) {
      const difficultyConfig = selectedPuzzle?.difficulties?.[difficulty] || {
        name: 'easy',
        rows: 3,
        cols: 5,
        color: '#4CAF50',
        time: 60
      };
      this.timerModel = new TimerModel(difficultyConfig);
    }

    if (
      prevProps.resetCounter !== this.props.resetCounter ||
      prevProps.selectedPuzzle?.id !== selectedPuzzle?.id
    ) {
      this.initializePuzzle();
    }
  }

  initializePuzzle() {
    if (!this.containerRef.current) return;
    const { selectedPuzzle, getPuzzleImage, difficulty } = this.props;
    // Usar configuración fija para el puzzle
    const rows = selectedPuzzle?.difficulties?.[difficulty].rows;
    const cols = selectedPuzzle?.difficulties?.[difficulty].cols;
    const totalPieces = rows * cols;

    const containerWidth = this.containerRef.current.clientWidth - 55;
    const containerHeight = this.containerRef.current.clientHeight - 100;

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

    this.props.setPieces(randomizedPieces);
  }

  completePuzzle() {
    if (!this.containerRef.current) return;

    const { selectedPuzzle, getPuzzleImage, difficulty } = this.props;
    const rows = selectedPuzzle?.difficulties?.[difficulty].rows;
    const cols = selectedPuzzle?.difficulties?.[difficulty].cols;
    const totalPieces = rows * cols;

    const containerWidth = this.containerRef.current.clientWidth - 55;
    const containerHeight = this.containerRef.current.clientHeight - 100;

    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    // Crear las piezas en sus posiciones correctas
    const orderedPieces = Array.from({ length: totalPieces }, (_, i) => {
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

    this.props.setPieces(orderedPieces);
  }

  render() {
    const {
      isComplete,
      pieces = [],
      showTimeoutMessage,
      handleDragStart,
      handleDragEnd,
      handleDrop,
      handleTimeoutClose,
      getCompletedImage,
      selectedPuzzle,
      onReturnToMenu
    } = this.props;

    return (
      <>
        <div className="puzzle-game">
          <>  
                <div className="puzzle-time-container">
                  {!isComplete && (
                    <TimerBar 
                      model={this.timerModel} 
                      isComplete={isComplete} 
                    />
                  )}

                  <div className="puzzle-time-bottom">
                    <div className="timer-container">
                      <Timer model={this.timerModel} />
                    </div>

                    <button className="return-to-menu" onClick={onReturnToMenu}>
                      BACK
                    </button>
                  </div>
                </div>

                <div
                  className={`puzzle-container ${isComplete ? "completed" : ""}`}
                  ref={this.containerRef}
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
  }
}

// HOC para conectar el componente con el contexto y manejar la referencia
const PuzzleContainer = forwardRef((props, ref) => {
  const puzzleContext = usePuzzle();
  const componentRef = React.useRef();

  useImperativeHandle(ref, () => ({
    completePuzzle: () => {
      if (componentRef.current) {
        componentRef.current.completePuzzle();
      }
    }
  }));

  return <PuzzleContainerBase ref={componentRef} {...props} {...puzzleContext} />;
});

export default PuzzleContainer;
