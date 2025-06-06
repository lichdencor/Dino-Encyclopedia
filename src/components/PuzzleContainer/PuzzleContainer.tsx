import React, { Component, forwardRef, useImperativeHandle, RefObject } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import CompletionMessage from "../CompletionMessage/CompletionMessage";
import "./PuzzleContainer.css";
import Timer from "../Timer/Timer";
import TimerBar from "../TimerBar/TimerBar";
import TimeoutMessage from "../TimeoutMessage/TimeoutMessage";
import TimerModel from "../../models/TimerModel";
import { usePuzzle } from "../../context/Puzzle/PuzzleContext";

interface PuzzlePieceType {
  id: string;
  currentX: number;
  currentY: number;
  correctX: number;
  correctY: number;
  width: number;
  height: number;
  image: string;
  isDragging: boolean;
  backgroundX: number;
  backgroundY: number;
  backgroundWidth: number;
  backgroundHeight: number;
}

interface DifficultyConfig {
  name: string;
  rows: number;
  cols: number;
  color: string;
  time: number;
}

interface SelectedPuzzle {
  id: string;
  difficulties: {
    [key: string]: DifficultyConfig;
  };
}

interface PuzzleContainerBaseProps {
  selectedPuzzle: SelectedPuzzle;
  difficulty: string;
  time: number;
  showTimeoutMessage: boolean;
  resetCounter: number;
  isComplete: boolean;
  pieces: PuzzlePieceType[];
  setSelectedPuzzleId: (id: string) => void;
  setPieces: (pieces: PuzzlePieceType[]) => void;
  handleDragStart: (e: React.DragEvent, piece: PuzzlePieceType) => void;
  handleDragEnd: (e: React.DragEvent, piece: PuzzlePieceType) => void;
  handleDrop: (e: React.DragEvent, targetPiece: PuzzlePieceType) => void;
  handleTimeoutClose: () => void;
  getCompletedImage: (id: string) => string;
  getPuzzleImage: (id: string, difficulty: string) => string;
  onReturnToMenu: () => void;
}

interface PuzzleContainerBaseState {}

class PuzzleContainerBase extends Component<PuzzleContainerBaseProps, PuzzleContainerBaseState> {
  private containerRef: RefObject<HTMLDivElement>;
  private timerModel: TimerModel;

  constructor(props: PuzzleContainerBaseProps) {
    super(props);
    this.containerRef = React.createRef();
    // Inicializar con valores por defecto si no hay selectedPuzzle
    const defaultConfig: DifficultyConfig = {
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

  componentDidMount(): void {
    this.props.setSelectedPuzzleId(this.props.selectedPuzzle.id);
    this.initializePuzzle();
  }

  componentDidUpdate(prevProps: PuzzleContainerBaseProps): void {
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

  initializePuzzle(): void {
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

    const newPieces: PuzzlePieceType[] = Array.from({ length: totalPieces }, (_, i) => {
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

  completePuzzle(): void {
    if (!this.containerRef.current) return;

    const { selectedPuzzle, getPuzzleImage, difficulty } = this.props;
    const rows = selectedPuzzle?.difficulties?.[difficulty].rows;
    const cols = selectedPuzzle?.difficulties?.[difficulty].cols;
    const totalPieces = rows * cols;

    const containerWidth = this.containerRef.current.clientWidth - 55;
    const containerHeight = this.containerRef.current.clientHeight - 100;

    const pieceWidth = containerWidth / cols;
    const pieceHeight = containerHeight / rows;

    const orderedPieces: PuzzlePieceType[] = Array.from({ length: totalPieces }, (_, i) => {
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

  render(): React.ReactNode {
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
      onReturnToMenu,
      difficulty
    } = this.props;

    const cols = selectedPuzzle?.difficulties?.[difficulty]?.cols || 5; // Default to 5 if not found

    return (
      <>
        <div className="puzzle-game">
          <>  
                {!isComplete && !showTimeoutMessage && (
                  <div className="puzzle-time-container">
                    <TimerBar 
                      model={this.timerModel} 
                      isComplete={isComplete} 
                    />

                    <div className="puzzle-time-bottom">
                      <div className="timer-container">
                        <Timer model={this.timerModel} />
                      </div>

                      <button className="return-to-menu" onClick={onReturnToMenu}>
                        BACK
                      </button>
                    </div>
                  </div>
                )}

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
                          onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                          gridSize={cols}
                          isComplete={isComplete}
                          isDragging={piece.isDragging}
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

interface PuzzleContainerRef {
  completePuzzle: () => void;
}

interface PuzzleContextType {
  [key: string]: any; // This is a temporary type, you should replace it with the actual type from your PuzzleContext
}

const PuzzleContainer = forwardRef<PuzzleContainerRef, Partial<PuzzleContainerBaseProps>>((props, ref) => {
  const puzzleContext = usePuzzle() as PuzzleContextType;
  const componentRef = React.useRef<PuzzleContainerBase>(null);

  useImperativeHandle(ref, () => ({
    completePuzzle: () => {
      if (componentRef.current) {
        componentRef.current.completePuzzle();
      }
    }
  }));

  // Merge props and context, ensuring all required props are present
  const mergedProps = {
    ...puzzleContext,
    ...props,
  } as PuzzleContainerBaseProps;

  return <PuzzleContainerBase ref={componentRef} {...mergedProps} />;
});

export default PuzzleContainer; 