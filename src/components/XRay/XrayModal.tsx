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
  
  const getCurrentDinosaurProgress = () => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );
    
    if (periodData && selectedDinosaur !== null) {
      const dinosaur = periodData.dinosaurs[selectedDinosaur] as DinosaurProgress;
      return dinosaur?.scanProgress || 0;
    }
    return 0;
  };

  const [showPuzzlePiece, setShowPuzzlePiece] = useState(true);
  const [piecePosition, setPiecePosition] = useState({ left: 0.8, top: 0.5 });
  const [isPuzzlePieceHovered, setIsPuzzlePieceHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [scanProgress, setScanProgress] = useState<number>(getCurrentDinosaurProgress());
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const progressTimerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

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
      return {
        scanProgress: dinosaur?.scanProgress || 0,
        visibleInfo: dinosaur?.visibleInfo || [],
        elapsedTime: dinosaur?.elapsedTime || 0
      };
    }
    return {
      scanProgress: 0,
      visibleInfo: [],
      elapsedTime: 0
    };
  };

  const handleInfoVisibilityChange = (newVisibleInfo: string[]) => {
    updateDinosaurProgress(scanProgress, elapsedTime, newVisibleInfo);
  };

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
    setPiecePosition({
      left: Math.random(),
      top: Math.random()
    });
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
    if (selectedDinosaur === null) return;

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    updateCursorPosition(event, rect, container);
    setShowPuzzlePiece(checkPuzzlePieceProximity(event, rect, piecePosition));
    checkDinosaurInteraction(event, container, selectedDinosaur);
  };

  useEffect(() => {
    if (isOpen) {
      const { scanProgress: savedProgress, elapsedTime: savedTime } = getCurrentDinosaurData();
      setScanProgress(savedProgress);
      setElapsedTime(savedTime);
      updatePuzzlePiecePosition();
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

  useEffect(() => {
    if (isPuzzlePieceHovered) {
      const timeout = setTimeout(() => setShowAlert(true), ALERT_DELAY);
      return () => clearTimeout(timeout);
    } else {
      setShowAlert(false);
    }
  }, [isPuzzlePieceHovered]);

  if (!isOpen || selectedDinosaur === null) return null;

  return (
    <div className={stylesContainer.modalOverlay + " preview-scan-dino"} onClick={onClose}>
      {showAlert && <Alert onClose={() => setShowAlert(false)} />}

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
              <PuzzlePiece
                position={piecePosition}
                isVisible={showPuzzlePiece}
                showAlert={showAlert}
                onMouseEnter={handlePuzzlePieceHover}
              />
            </DinosaurViewer>
            
            <div className={styles.informationContainer}>
              <h2 className={styles.xRayNameFrame}>{dinosaurInfo.name}</h2>
              <div className={styles.information}>
                <InfoList 
                  dinosaurInfo={dinosaurInfo}
                  elapsedTime={elapsedTime}
                  visibleInfo={getCurrentDinosaurData().visibleInfo}
                  onInfoVisibilityChange={handleInfoVisibilityChange}
                />
              </div>
              <ProgressBar progress={scanProgress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
