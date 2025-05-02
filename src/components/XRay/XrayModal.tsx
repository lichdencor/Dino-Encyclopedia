import React, { useEffect, useState, useRef } from "react";
import stylesContainer from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css";
import styles from "./XrayModal.module.css";
import { Alert } from "../../components";

type DinosaurInfo = {
  name: string;
  nombreCientifico: string;
  altura: string;
  peso: string;
  clasificacion: string;
  dieta: string;
  velocidad: string;
  caracteristicas: string;
  naturaleza: string;
  fosiles: string;
  sociabilidad: string;
  relacionEvolutiva: string;
};

type XRayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDinosaur: number | null;
  activeDinosaur: number | null;
  setActiveDinosaur: (index: number | null) => void;
  dinosaurInfo: DinosaurInfo;
};

const SCAN_DURATION = 30; // Total scan duration in seconds
const UPDATE_INTERVAL = 100; // Timer update interval in milliseconds
const PUZZLE_PIECE_DETECTION_RADIUS = 22;
const ALERT_DELAY = 2500;

const INFO_REVEAL_TIMINGS = [
  { time: 2, label: 'nombreCientifico' },
  { time: 4, label: 'altura' },
  { time: 6, label: 'peso' },
  { time: 8, label: 'clasificacion' },
  { time: 10, label: 'dieta' },
  { time: 12, label: 'velocidad' },
  { time: 14, label: 'caracteristicas' },
  { time: 17, label: 'naturaleza' },
  { time: 20, label: 'fosiles' },
  { time: 24, label: 'sociabilidad' },
  { time: 29, label: 'relacionEvolutiva' }
];

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur,
  dinosaurInfo
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

  const isInfoVisible = (index: number) => {
    return elapsedTime >= INFO_REVEAL_TIMINGS[index].time;
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

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    dinosaurIndex: number
  ) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    updateCursorPosition(event, rect, container);
    
    checkPuzzlePieceProximity(event, rect);
    
    checkDinosaurInteraction(event, container, dinosaurIndex);
  };

  const updateCursorPosition = (
    event: React.MouseEvent<HTMLDivElement>,
    rect: DOMRect,
    element: HTMLElement
  ) => {
    const x_percent = ((event.clientX - rect.left) / rect.width) * 100;
    const y_percent = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--cursor-x", `${x_percent}%`);
    element.style.setProperty("--cursor-y", `${y_percent}%`);
  };

  const checkPuzzlePieceProximity = (
    event: React.MouseEvent<HTMLDivElement>,
    rect: DOMRect
  ) => {
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const pieceX = rect.width * piecePosition.left;
    const pieceY = rect.height * piecePosition.top;

    const distance = Math.sqrt(
      Math.pow(mouseX - pieceX, 2) + Math.pow(mouseY - pieceY, 2)
    );

    setShowPuzzlePiece(distance < PUZZLE_PIECE_DETECTION_RADIUS);
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

  const isPointInRect = (x: number, y: number, rect: DOMRect) => {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
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
            <div className={styles.dinosaurContainer}>
              <div
                key={`preview-${selectedDinosaur}`}
                className={stylesContainer.scannerCursorBg}
                onMouseMove={e => handleMouseMove(e, selectedDinosaur)}
                onMouseLeave={() => {
                  setIsMouseOver(false);
                  setActiveDinosaur(null);
                }}
              >
                <div
                  className={
                    `${stylesContainer.dinosaur} ${stylesContainer[`dinosaur${selectedDinosaur + 1}`]} ` +
                    `${activeDinosaur === selectedDinosaur ? stylesContainer.activeBone : ""}`
                  }
                >
                  <div className={styles.containerPuzzlePiece}>
                    {showPuzzlePiece && (
                      <img
                        className={`${styles.puzzlePiece} ${showAlert ? styles.hiddenPiece : ""}`}
                        src="/assets/img/puzzles/puzzle-piece.png"
                        style={{
                          top: `${piecePosition.top * 100}%`,
                          left: `${piecePosition.left * 100}%`,
                          margin: "5px"
                        }}
                        alt="puzzle piece"
                        onMouseEnter={handlePuzzlePieceHover}
                      />
                    )}
                  </div>
                  <div
                    className={
                      `${stylesContainer[`dinosaur${selectedDinosaur + 1}Bone`]} ` +
                      `${activeDinosaur === selectedDinosaur ? stylesContainer.activeBone : ""}`
                    }
                  ></div>
                </div>
              </div>
            </div>
            
            <div className={styles.informationContainer}>
              <h2 className={styles.xRayNameFrame}>{dinosaurInfo.name}</h2>
              <div className={styles.information}>
                <ul className={styles.infoList}>
                  {INFO_REVEAL_TIMINGS.map((timing, index) => (
                    <li key={timing.label} className={isInfoVisible(index) ? styles.animate : ''}>
                      <span>{timing.label.charAt(0).toUpperCase() + timing.label.slice(1)}:</span>
                      {dinosaurInfo[timing.label as keyof DinosaurInfo]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBarContainer}>
                  <span className={styles.progressText}>{Math.round(scanProgress)}%</span>
                  <div 
                    className={styles.progressBar}
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className={styles.puzzlePieceContainer}>
                  <div className={styles.puzzlePieceBar}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
