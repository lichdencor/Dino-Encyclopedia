import React, { useEffect, useState, useRef } from "react";
import stylesContainer from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css";
import styles from "./XrayModal.module.css";
import { Alert } from "../../components";
import { XRayModalProps } from "./types";
import { SCAN_DURATION, UPDATE_INTERVAL, ALERT_DELAY } from "./constants";
import { PuzzlePiece } from "./components/PuzzlePiece";
import { DinosaurViewer } from "./components/DinosaurViewer";
import { InfoList } from "./components/InfoList";
import { ProgressBar } from "./components/ProgressBar";
import { updateCursorPosition, checkPuzzlePieceProximity, isPointInRect } from "./utils";

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur,
  dinosaurInfo,
  dinosaurImage,
  dinosaurBone
}) => {
  const [showPuzzlePiece, setShowPuzzlePiece] = useState(true);
  const [piecePosition, setPiecePosition] = useState({ left: 0.8, top: 0.5 });
  const [isPuzzlePieceHovered, setIsPuzzlePieceHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const progressTimerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const startProgressTimer = () => {
    stopProgressTimer();
    lastTimeRef.current = Date.now();
    progressTimerRef.current = window.setInterval(() => {
      if (lastTimeRef.current) {
        const now = Date.now();
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        
        setElapsedTime(prev => prev + delta);
        setScanProgress(prev => {
          const progressIncrement = 100 / (SCAN_DURATION * (1000 / UPDATE_INTERVAL));
          const newProgress = prev + progressIncrement;
          return newProgress >= 100 ? 100 : newProgress;
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
      setScanProgress(0);
      setElapsedTime(0);
      updatePuzzlePiecePosition();
    } else {
      setScanProgress(0);
      setElapsedTime(0);
      stopProgressTimer();
    }
    return () => stopProgressTimer();
  }, [isOpen]);

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
