import React, { useEffect, useState, useRef, useCallback } from "react";
import triassicStyles from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css";
import jurassicInferiorStyles from "../../pages/public/Jurassic-Inferior/Jurassic-Inferior.module.css";
import jurassicMediumStyles from "../../pages/public/Jurassic-Medium/Jurassic-Medium.module.css";
import jurassicSuperiorStyles from "../../pages/public/Jurassic-Superior/Jurassic-Superior.module.css";
import cretaceousInferiorStyles from "../../pages/public/Cretaceous-Inferior/Cretaceous-Inferior.module.css";
import cretaceousMediumStyles from "../../pages/public/Cretaceous-Medium/Cretaceous-Medium.module.css";
import cretaceousSuperiorStyles from "../../pages/public/Cretaceous-Superior/Cretaceous-Superior.module.css";
import styles from "./XrayModal.module.css";
import { Alert } from "../../components";
import { XRayModalProps, DinosaurProgress } from "./types";
import { SCAN_DURATION, UPDATE_INTERVAL } from "./constants";
import { PuzzlePiece } from "./components/PuzzlePiece";
import { DinosaurViewer } from "./components/DinosaurViewer";
import { InfoList } from "./components/InfoList";
import { ProgressBar } from "./components/ProgressBar";
import { updateCursorPosition, checkPuzzlePieceProximity, isPointInRect, getCurrentDinosaurProgress } from "./utils";
import { useProgress } from "../../context/Progress/ProgressProvider";
import { useFidelityProgress } from "../FidelitySystem/FidelityProgressProvider.tsx";
import { useAuth } from "../../context";
import { useXRayTracking } from "../../hooks/useXRayTracking";

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
  // Get the correct styles based on era and period
  const getEraStyles = (era: string, period: string) => {
    if (era === 'triassic') {
      return triassicStyles;
    } else if (era === 'jurassic') {
      if (period === 'Inferior') return jurassicInferiorStyles;
      if (period === 'Medium') return jurassicMediumStyles;
      if (period === 'Superior') return jurassicSuperiorStyles;
      return jurassicInferiorStyles; // fallback
    } else if (era === 'cretaceous') {
      if (period === 'Inferior') return cretaceousInferiorStyles;
      if (period === 'Medium') return cretaceousMediumStyles;
      if (period === 'Superior') return cretaceousSuperiorStyles;
      return cretaceousInferiorStyles; // fallback
    }
    return triassicStyles; // fallback
  };

  const stylesContainer = getEraStyles(era, period);
  const { progress, setProgress } = useProgress();
  const { updateProgress: updateFidelityProgress } = useFidelityProgress();
  const { isGuest } = useAuth();

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
  const hoverStartTimeRef = useRef<number | null>(null);
  const hoverIntervalRef = useRef<number | null>(null);

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

    const pieceExists = currentProgress.minigames.puzzleaurus.foundPieces.some(
      piece => piece.era === era &&
        piece.period === period &&
        piece.dinosaurId === dinosaurId
    );

    if (!pieceExists) {
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

      setProgress(currentProgress); // 81
    }
  };

  const updateDinosaurProgress = async (currentProgress: number, currentElapsedTime: number, visibleInfo: string[] = []) => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodData && selectedDinosaur !== null) {
      const currentDinosaur = periodData.dinosaurs[selectedDinosaur];
      const wasDiscovered = currentDinosaur.discovered;
      const isDiscovered = currentProgress >= 100;

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
                      discovered: isDiscovered,
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
      if (!wasDiscovered && isDiscovered) {
        const dinoName = dinosaurInfo.name.toLowerCase()
          .replace(/[^a-z0-9]/g, '')
          .replace(/\s+/g, '');
        await updateFidelityProgress('dynotective', `scan_dino_${dinoName}`).catch(console.error);
      }

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
        puzzlePieceFound: isPieceFound,
        dinosaurId: dinosaur.id
      };
    }
    return {
      scanProgress: 0,
      visibleInfo: [],
      elapsedTime: 0,
      puzzlePieceFound: false,
      dinosaurId: ''
    };
  };

  const currentDinosaurData = getCurrentDinosaurData();
  const dinosaurId = currentDinosaurData.dinosaurId || `${era}_${period}_${selectedDinosaur}`;

  const xrayTracking = useXRayTracking({
    dinosaurId: dinosaurId,
    dinosaurName: dinosaurInfo.name,
    era: era,
    period: period,
    isSessionActive: isOpen && selectedDinosaur !== null,
  });

  React.useEffect(() => {
    if (currentDinosaurData.scanProgress !== undefined) {
      xrayTracking.setInitialProgress(currentDinosaurData.scanProgress);
    }
  }, [currentDinosaurData.scanProgress, xrayTracking]);

  const handleInfoVisibilityChange = useCallback((newVisibleInfo: string[]) => {
    const currentData = getCurrentDinosaurData();
    const previousInfoCount = currentData.visibleInfo.length;

    if (newVisibleInfo.length > previousInfoCount) {
      const newInfoItems = newVisibleInfo.slice(previousInfoCount);
      newInfoItems.forEach(newInfo => {
        xrayTracking.trackInfoUnlocked(newInfo, newVisibleInfo.length);
      });
    }

    updateDinosaurProgress(getCurrentDinosaurProgress(era, progress, period, selectedDinosaur), currentData.elapsedTime, newVisibleInfo); // 59
  }, [xrayTracking, era, progress, period, selectedDinosaur]);

  const handlePuzzlePieceFound = () => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodData && selectedDinosaur !== null) {
      const dinosaur = periodData.dinosaurs[selectedDinosaur];
      savePuzzlePieceFound(dinosaur.id);

      xrayTracking.trackPuzzlePieceFound(scanProgress);

      setShowAlert(true);
      setHasPieceBeenFound(true);
      stopProgressTimer();
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setIsPuzzlePieceHovered(false);
    hoverStartTimeRef.current = null;
    startProgressTimer();
  };

  const handlePuzzlePieceHover = () => {
    hoverStartTimeRef.current = Date.now();
    setIsPuzzlePieceHovered(true);
  };

  const handlePuzzlePieceLeave = () => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
    }
    hoverStartTimeRef.current = null;
    setIsPuzzlePieceHovered(false);
    setShowPuzzlePiece(false);
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
    const shouldShowPiece = checkPuzzlePieceProximity(event, rect, piecePosition);

    if (!shouldShowPiece && showPuzzlePiece) {
      handlePuzzlePieceLeave();
    }
    setShowPuzzlePiece(shouldShowPiece);

    checkDinosaurInteraction(event, container, selectedDinosaur);
  };

  useEffect(() => {
    if (isPuzzlePieceHovered && !hasPieceBeenFound && hoverStartTimeRef.current) {
      const checkHoverDuration = () => {
        if (hasPieceBeenFound) {
          if (hoverIntervalRef.current) {
            clearInterval(hoverIntervalRef.current);
            hoverIntervalRef.current = null;
          }
          return;
        }

        const hoverDuration = Date.now() - hoverStartTimeRef.current!;
        if (hoverDuration >= 2000) {
          handlePuzzlePieceFound();
        }
      };

      hoverIntervalRef.current = window.setInterval(checkHoverDuration, 1000);
      return () => {
        if (hoverIntervalRef.current) {
          clearInterval(hoverIntervalRef.current);
          hoverIntervalRef.current = null;
        }
        if (!hasPieceBeenFound) {
          hoverStartTimeRef.current = null;
        }
      };
    } else if (!isPuzzlePieceHovered) {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
        hoverIntervalRef.current = null;
      }
      hoverStartTimeRef.current = null;
      setShowPuzzlePiece(false);
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

            if (Math.floor(newProgress) !== Math.floor(prevProgress)) {
              xrayTracking.trackProgressUpdate(newProgress);
            }

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
    if (dinosaurInfo.name === "Postosuchus") {
      setPiecePosition({
        left: 0.61,
        top: 0.55
      });
    } else {
      const margin = 0.1;
      setPiecePosition({
        left: margin + Math.random() * (1 - 2 * margin),
        top: margin + Math.random() * (1 - 2 * margin)
      });
    }
  };

  if (!isOpen || selectedDinosaur === null) return null;
  return (
    <div className={stylesContainer["modal-overlay"] + " preview-scan-dino"}>
      <button className={styles.closeBtn} onClick={onClose}>×</button>
      {showAlert && (
        <Alert
          onClose={handleAlertClose}
          imageSrc="/assets/img/puzzles/puzzle-piece.png"
          messageText="¡Felicidades! Has encontrado una pieza de puzzle"
          spanText="Visitá el minijuego Puzzleaurus para ver tu progreso total de piezas"
        />
      )}

      <div className={styles.modalBg}>
        <div
          className={stylesContainer["modal-content"]}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles["modal-content"]}>
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
              stylesContainer={stylesContainer}
            >
              {!isGuest && !hasPieceBeenFound && showPuzzlePiece && piecePosition && (
                <PuzzlePiece
                  position={piecePosition}
                  showAlert={showAlert}
                  onMouseEnter={handlePuzzlePieceHover}
                  onMouseLeave={handlePuzzlePieceLeave}
                />
              )}
            </DinosaurViewer>

            <div className={styles.informationContainer}>
              <h2 className={styles.xRayNameFrame}>{dinosaurInfo.name}</h2>
              <div className={`${styles.information} ${era === 'triassic'
                ? styles['information-triassic']
                : era === 'jurassic'
                  ? styles['information-jurassic']
                  : styles['information-cretaceous']
                }`}>
                <InfoList
                  dinosaurInfo={dinosaurInfo}
                  elapsedTime={elapsedTime}
                  visibleInfo={[]}
                  onInfoVisibilityChange={handleInfoVisibilityChange}
                />
              </div>
              <ProgressBar era={era} progress={scanProgress} puzzlePieceFound={hasPieceBeenFound} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
