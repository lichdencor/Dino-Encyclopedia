import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PuzzleContext = createContext(null);

const DIFFICULTY_LEVELS = {
  easy: { 
    name: 'Fácil', 
    rows: 3, 
    cols: 5, 
    color: '#4CAF50',
    time: 60
  },
  medium: { 
    name: 'Medio', 
    rows: 5, 
    cols: 8,
    color: '#FFC107',
    time: 360
  },
  hard: { 
    name: 'Difícil', 
    rows: 7, 
    cols: 12, 
    color: '#F44336',
    time: 1800
  }
}; 

export { DIFFICULTY_LEVELS };

export const PuzzleProvider = ({ children }) => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [resetCounter, setResetCounter] = useState(0);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedPuzzleId, setSelectedPuzzleId] = useState(null);
  const [time, setTime] = useState(DIFFICULTY_LEVELS['easy'].time);

  // Handler para seleccionar nivel y puzzle
  const handleLevel = useCallback((puzzleId, selectedDifficulty) => { // M4-41
    setSelectedPuzzleId(puzzleId); // M4-42
    setDifficulty(selectedDifficulty); // M4-43
    setTime(DIFFICULTY_LEVELS[selectedDifficulty].time); // M4-44
    setIsComplete(false); 
    setShowTimeoutMessage(false); 
    setResetCounter(prev => prev + 1);
  }, []);

  // Función para obtener la imagen del puzzle según la dificultad
  const getPuzzleImage = useCallback((puzzleId, difficulty) => {
    const imageSuffix = {
      easy: '3_5',
      medium: '5_8',
      hard: '7_12'
    };
    return `public/assets/img/puzzles/puzzle-${puzzleId}/puzzle-${puzzleId}-${imageSuffix[difficulty]}.png`;
  }, []);

  // Función para obtener la imagen completada del puzzle
  const getCompletedImage = useCallback((puzzleId) => {
    return `/assets/img/puzzles/puzzle-${puzzleId}/puzzle-${puzzleId}.${puzzleId === 2 ? 'jpeg' : 'jpg'}`;
  }, []);

  // Efecto para el timer
  useEffect(() => {
    let intervalId;

    if (!isComplete && time > 0 && !showTimeoutMessage) {
      intervalId = setInterval(() => {
        setTime(prev => {
          if (prev <= 0.1) {
            clearInterval(intervalId);
            setShowTimeoutMessage(true);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isComplete, showTimeoutMessage]);

  // Cuando se completa el puzzle, calculamos el tiempo transcurrido
  useEffect(() => {
    if (isComplete) {
      const totalTime = DIFFICULTY_LEVELS[difficulty].time;
      const timeRemaining = time;
      setElapsedTime(totalTime - timeRemaining);
    }
  }, [isComplete, difficulty, time]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const handleDragStart = useCallback((e, piece) => {
    setDraggedPiece(piece);
    setPieces(prevPieces => 
      prevPieces.map(p => p.id === piece.id ? { ...p, isDragging: true } : p)
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedPiece(null);
    setPieces(prevPieces => prevPieces.map(p => ({ ...p, isDragging: false })));
  }, []);

  const handleDrop = useCallback((e, targetPiece) => {
    e.preventDefault();
    if (!draggedPiece || draggedPiece.id === targetPiece.id) return;

    setPieces(prevPieces => {
      const newPieces = prevPieces.map(piece => {
        if (piece.id === draggedPiece.id) {
          return {
            ...piece,
            currentX: targetPiece.currentX,
            currentY: targetPiece.currentY,
            isDragging: false
          };
        }
        if (piece.id === targetPiece.id) {
          return {
            ...piece,
            currentX: draggedPiece.currentX,
            currentY: draggedPiece.currentY,
            isDragging: false
          };
        }
        return piece;
      });

      // Check if puzzle is complete
      const isPuzzleComplete = newPieces.every(piece => 
        Math.abs(piece.currentX - piece.correctX) < 10 &&
        Math.abs(piece.currentY - piece.correctY) < 10
      );

      setIsComplete(isPuzzleComplete);
      setDraggedPiece(null);
      return newPieces;
    });
  }, [draggedPiece]);

  const handlePlayAgain = useCallback(() => {
    setTime(DIFFICULTY_LEVELS[difficulty].time);
    setIsComplete(false);
    setResetCounter(prev => prev + 1);
  }, [difficulty]);

  const handleNextLevel = useCallback(() => {
    const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'];
    const currentIndex = DIFFICULTY_ORDER.indexOf(difficulty);
    
    if (currentIndex < DIFFICULTY_ORDER.length - 1) {
      const nextDifficulty = DIFFICULTY_ORDER[currentIndex + 1];
      setTime(DIFFICULTY_LEVELS[nextDifficulty].time);
      setIsComplete(false);
      setDifficulty(nextDifficulty);
      setResetCounter(prev => prev + 1);
    }
  }, [difficulty]);

  const handleCompletePuzzle = useCallback(() => {
    setPieces(prevPieces => 
      prevPieces.map(piece => ({
        ...piece,
        currentX: piece.correctX,
        currentY: piece.correctY,
        isDragging: false
      }))
    );
    setIsComplete(true);
  }, []);

  const handleDifficultyChange = useCallback((e) => {
    const newDifficulty = e.target.value;
    setTime(DIFFICULTY_LEVELS[newDifficulty].time);
    setDifficulty(newDifficulty);
    setIsComplete(false);
    setResetCounter(prev => prev + 1);
  }, []);

  const handleTimeoutClose = useCallback(() => {
    setShowTimeoutMessage(false);
    setTime(DIFFICULTY_LEVELS[difficulty].time);
    setIsComplete(false);
    setResetCounter(prev => prev + 1);
  }, [difficulty]);

  const value = {
    pieces,
    setPieces,
    draggedPiece,
    isComplete,
    difficulty,
    resetCounter,
    time,
    formatTime,
    setDifficulty,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handlePlayAgain,
    handleNextLevel,
    handleCompletePuzzle,
    handleDifficultyChange,
    showTimeoutMessage,
    handleTimeoutClose,
    elapsedTime,
    handleLevel,
    getPuzzleImage,
    getCompletedImage,
    selectedPuzzleId,
    setSelectedPuzzleId
  };

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
}; 