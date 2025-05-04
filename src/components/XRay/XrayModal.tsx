import React, { useEffect, useState, useRef } from "react";
import stylesContainer from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css";
import styles from "./XrayModal.module.css";
import { Alert } from "../../components";
import { XRayModalProps, DinosaurProgress } from "./types";
import { SCAN_DURATION, UPDATE_INTERVAL, ALERT_DELAY } from "./constants";
import { PuzzlePiece } from "./components/PuzzlePiece";
import { DinosaurViewer } from "./components/DinosaurViewer";
import { InfoList } from "./components/InfoList";
import { ProgressBar } from "./components/ProgressBar";
import { updateCursorPosition, checkPuzzlePieceProximity, isPointInRect } from "./utils";
import { useProgress } from "../../context/Progress/ProgressProvider";

type PuzzlePieceStatus = {
  isFound: boolean;
  scanProgress: number;
  visibleInfo: string[];
  elapsedTime: number;
};

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur,
  dinosaurInfo,
  dinosaurImage,
  dinosaurBone,
  era,
  period
}) => {
  const { progress, setProgress } = useProgress();
  
  const [showPuzzlePiece, setShowPuzzlePiece] = useState(false);
  const [piecePosition, setPiecePosition] = useState<{ left: number; top: number } | null>(null);
  const [isPuzzlePieceHovered, setIsPuzzlePieceHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [hasPieceBeenFound, setHasPieceBeenFound] = useState(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const progressTimerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const checkPuzzlePieceStatus = (dinosaurId: string): PuzzlePieceStatus => {
    const foundPieces = progress.minigames.puzzleaurus.foundPieces || [];
    const isPieceFound = foundPieces.some(
      piece => piece.era === era && 
              piece.period === period && 
              piece.dinosaurId === dinosaurId
    );

    return {
      isFound: isPieceFound,
      scanProgress: 0,
      visibleInfo: [],
      elapsedTime: 0
    };
  };

  const savePuzzlePieceFound = (dinosaurId: string) => {
    const currentProgress = { ...progress };
    
    if (!currentProgress.minigames.puzzleaurus.foundPieces) {
      currentProgress.minigames.puzzleaurus.foundPieces = [];
    }

    currentProgress.minigames.puzzleaurus.foundPieces.push({
      era,
      period,
      dinosaurId
    });

    currentProgress.minigames.puzzleaurus.puzzles = currentProgress.minigames.puzzleaurus.puzzles.map(puzzle => ({
      ...puzzle,
      puzzle_pieces: {
        ...puzzle.puzzle_pieces,
        found: puzzle.puzzle_pieces.found + 1
      }
    }));

    setProgress(currentProgress);
  };

  const getCurrentDinosaurProgress = () => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );
    
    if (periodData && selectedDinosaur !== null) {
      const dinosaur = periodData.dinosaurs[selectedDinosaur];
      return dinosaur?.scanProgress || 0;
    }
    return 0;
  };

  const updateDinosaurProgress = (currentProgress: number, currentElapsedTime: number, visibleInfo: string[] = []) => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodData && selectedDinosaur !== null) {
      const newProgress = {
        ...progress,
        galleries: [{
          ...progress.galleries[0],
          [eraKey]: progress.galleries[0][eraKey].map(p => 
            p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
              ? {
                  ...p,
                  dinosaurs: p.dinosaurs.map((d, idx) =>
                    idx === selectedDinosaur
                      ? { 
                          ...d, 
                          discovered: currentProgress >= 100,
                          scanProgress: Math.min(Math.round(currentProgress), 100),
                          visibleInfo,
                          elapsedTime: currentElapsedTime
                        }
                      : d
                  )
                }
              : p
          )
        }]
      };
      setProgress(newProgress);
    }
  };

  const getCurrentDinosaurData = () => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );
    
    if (periodData && selectedDinosaur !== null) {
      const dinosaur = periodData.dinosaurs[selectedDinosaur] as DinosaurProgress;
      const isPieceFound = progress.minigames.puzzleaurus.foundPieces?.some(
        piece => piece.era === era && 
                piece.period === period && 
                piece.dinosaurId === dinosaur.id
      ) || false;
      
      return {
        scanProgress: dinosaur?.scanProgress || 0,
        visibleInfo: dinosaur?.visibleInfo || [],
        elapsedTime: dinosaur?.elapsedTime || 0,
        puzzlePieceFound: isPieceFound
      };
    }
    return {
      scanProgress: 0,
      visibleInfo: [],
      elapsedTime: 0,
      puzzlePieceFound: false
    };
  };

  const handleInfoVisibilityChange = (newVisibleInfo: string[]) => {
    updateDinosaurProgress(getCurrentDinosaurProgress(), getCurrentDinosaurData().elapsedTime, newVisibleInfo);
  };

  const handlePuzzlePieceFound = () => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodData && selectedDinosaur !== null) {
      const dinosaur = periodData.dinosaurs[selectedDinosaur];
      savePuzzlePieceFound(dinosaur.id);
      setShowAlert(true);
      setHasPieceBeenFound(true);
      stopProgressTimer();
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    startProgressTimer();
  };

  const handlePuzzlePieceHover = () => {
    setIsPuzzlePieceHovered(true);
  };

  const checkDinosaurInteraction = (
    event: React.MouseEvent<HTMLDivElement>,
    container: HTMLElement,
    dinosaurIndex: number
  ) => {
    let isOverDinosaur = false;
    const dinosaurs = container.getElementsByClassName(stylesContainer.dinosaur);

    for (let i = 0; i < dinosaurs.length; i++) {
      const dinosaur = dinosaurs[i] as HTMLElement;
      const dRect = dinosaur.getBoundingClientRect();
      
      if (isPointInRect(event.clientX, event.clientY, dRect)) {
        setActiveDinosaur(dinosaurIndex);
        isOverDinosaur = true;
        break;
      }
    }
    
    setIsMouseOver(isOverDinosaur);
    if (!isOverDinosaur) {
      setActiveDinosaur(null);
      stopProgressTimer();
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (selectedDinosaur === null || !piecePosition) return;

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    updateCursorPosition(event, rect, container);
    setShowPuzzlePiece(checkPuzzlePieceProximity(event, rect, piecePosition));
    checkDinosaurInteraction(event, container, selectedDinosaur);
  };

  useEffect(() => {
    if (isPuzzlePieceHovered && !hasPieceBeenFound) {
      const timeout = setTimeout(handlePuzzlePieceFound, ALERT_DELAY);
      return () => clearTimeout(timeout);
    } else if (!isPuzzlePieceHovered) {
      setShowAlert(false);
    }
  }, [isPuzzlePieceHovered]);

  useEffect(() => {
    if (isOpen && selectedDinosaur !== null) {
      const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
      const periodData = progress.galleries[0][eraKey].find(
        (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
      );
      
      if (periodData) {
        const dinosaur = periodData.dinosaurs[selectedDinosaur];
        const pieceStatus = checkPuzzlePieceStatus(dinosaur.id);
        
        setScanProgress(dinosaur.scanProgress || 0);
        setElapsedTime(dinosaur.elapsedTime || 0);
        setHasPieceBeenFound(pieceStatus.isFound);
        updatePuzzlePiecePosition();
      }
    } else {
      stopProgressTimer();
    }
    return () => stopProgressTimer();
  }, [isOpen, selectedDinosaur, era, period]);

  useEffect(() => {
    if (isMouseOver) {
      startProgressTimer();
    } else {
      stopProgressTimer();
    }
    return () => stopProgressTimer();
  }, [isMouseOver]);

  const startProgressTimer = () => {
    stopProgressTimer();
    lastTimeRef.current = Date.now();
    progressTimerRef.current = window.setInterval(() => {
      if (lastTimeRef.current) {
        const now = Date.now();
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        
        setElapsedTime(prev => {
          const newElapsedTime = prev + delta;
          setScanProgress((prevProgress: number) => {
            const progressIncrement = 100 / (SCAN_DURATION * (1000 / UPDATE_INTERVAL));
            const newProgress = Math.min(prevProgress + progressIncrement, 100);
            updateDinosaurProgress(newProgress, newElapsedTime, getCurrentDinosaurData().visibleInfo);
            return newProgress;
          });
          return newElapsedTime;
        });
      }
    }, UPDATE_INTERVAL);
  };

  const stopProgressTimer = () => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
      lastTimeRef.current = null;
    }
  };

  const updatePuzzlePiecePosition = () => {
    const margin = 0.1;
    setPiecePosition({
      left: margin + Math.random() * (1 - 2 * margin),
      top: margin + Math.random() * (1 - 2 * margin)
    });
  };

  if (!isOpen || selectedDinosaur === null) return null;

  return (
    <div className={stylesContainer.modalOverlay + " preview-scan-dino"} onClick={onClose}>
      {showAlert && <Alert onClose={handleAlertClose} />}

      <div className={styles.modalBg}>
        <div
          className={stylesContainer.modalContent}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.modalContent}>
            <DinosaurViewer
              selectedDinosaur={selectedDinosaur}
              activeDinosaur={activeDinosaur}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsMouseOver(false);
                setActiveDinosaur(null);
              }}
              dinosaurImage={dinosaurImage}
              dinosaurBone={dinosaurBone}
            >
              {!hasPieceBeenFound && showPuzzlePiece && piecePosition && (
                <PuzzlePiece
                  position={piecePosition}
                  showAlert={showAlert}
                  onMouseEnter={handlePuzzlePieceHover}
                />
              )}
            </DinosaurViewer>
            
            <div className={styles.informationContainer}>
              <h2 className={styles.xRayNameFrame}>{dinosaurInfo.name}</h2>
              <div className={styles.information}>
                <InfoList 
                  dinosaurInfo={dinosaurInfo}
                  elapsedTime={elapsedTime}
                  visibleInfo={[]}
                  onInfoVisibilityChange={handleInfoVisibilityChange}
                />
              </div>
              <ProgressBar progress={scanProgress} puzzlePieceFound={hasPieceBeenFound} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
