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

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur,
  dinosaurInfo
}) => {
  const [showPuzzlePiece, setShowPuzzlePiece] = useState(true);
  const [pieceLeftPercent, setPieceLeftPercent] = useState(0.8);
  const [pieceTopPercent, setPieceTopPercent] = useState(0.5);
  const [isPuzzlePieceHovered, setIsPuzzlePieceHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const progressTimerRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());

  const getItemVisibility = (index: number) => {
    const percentages = [
      0,    
      6,    
      12,   
      18,   
      24,   
      30,   
      36,   
      42,   
      51,   
      60,   
      70    
    ];

    return scanProgress >= percentages[index];
  };

  if (!isOpen || selectedDinosaur === null) return null;

  const openAlert = () => {
    setIsPuzzlePieceHovered(true);
  };

  const setPuzzlePiecePosition = () => {
    setPieceLeftPercent(Math.random());
    setPieceTopPercent(Math.random());
  }

  useEffect(() => {
    if (isPuzzlePieceHovered) {
      const timeout = setTimeout(() => {
        setShowAlert(true);
      }, 2500);
      return () => clearTimeout(timeout);
    } else {
      setShowAlert(false);
    }
  }, [isPuzzlePieceHovered]);

  useEffect(() => {
    setPuzzlePiecePosition();
    return () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const handleMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = mouseEvent.currentTarget.getBoundingClientRect();

    const x_percent = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
    const y_percent = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
    mouseEvent.currentTarget.style.setProperty("--cursor-x", `${x_percent}%`);
    mouseEvent.currentTarget.style.setProperty("--cursor-y", `${y_percent}%`);

    lastMoveTimeRef.current = Date.now();

    if (!progressTimerRef.current) {
      progressTimerRef.current = window.setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastMoveTimeRef.current > 100) {
          if (progressTimerRef.current) {
            window.clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
          }
          return;
        }

        setScanProgress(prev => {
          const newProgress = prev + (100 / (30 * 10));
          return Math.min(100, newProgress);
        });
      }, 100);
    }

    const mouseX = mouseEvent.clientX - rect.left;
    const mouseY = mouseEvent.clientY - rect.top;

    const pieceX = rect.width * pieceLeftPercent;
    const pieceY = rect.height * pieceTopPercent;

    const distance = Math.sqrt(
      Math.pow(mouseX - pieceX, 2) + Math.pow(mouseY - pieceY, 2)
    );

    if (distance < 22) {
      setShowPuzzlePiece(true);
    } else {
      setShowPuzzlePiece(false);
    }

    for (let i = 0; i < mouseEvent.currentTarget.getElementsByClassName(stylesContainer.dinosaur).length; i++) {
      const dinosaur = mouseEvent.currentTarget.getElementsByClassName(stylesContainer.dinosaur)[i] as HTMLElement;
      const dRect = dinosaur.getBoundingClientRect();
      if (
        mouseEvent.clientX >= dRect.left &&
        mouseEvent.clientX <= dRect.right &&
        mouseEvent.clientY >= dRect.top &&
        mouseEvent.clientY <= dRect.bottom
      ) {
        setActiveDinosaur(index);
        return;
      }
    }
    setActiveDinosaur(null);
  };

  const dinosaurBoneBgClasses = [
    stylesContainer.scannerCursorBg,
    stylesContainer.scannerCursorBg,
    stylesContainer.scannerCursorBg,
  ];

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
                className={dinosaurBoneBgClasses[selectedDinosaur]}
                onMouseMove={e => handleMouseMove(e, selectedDinosaur)}
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
                        top: `${pieceTopPercent * 100}%`,
                        left: `${pieceLeftPercent * 100}%`,
                        margin: "5px"
                      }}
                      alt="puzzle piece"
                      onMouseEnter={openAlert}
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
                  <li className={getItemVisibility(0) ? styles.animate : ''}>
                    <span>Nombre científico:</span> {dinosaurInfo.nombreCientifico}
                  </li>
                  <li className={getItemVisibility(1) ? styles.animate : ''}>
                    <span>Altura:</span> {dinosaurInfo.altura}
                  </li>
                  <li className={getItemVisibility(2) ? styles.animate : ''}>
                    <span>Peso:</span> {dinosaurInfo.peso}
                  </li>
                  <li className={getItemVisibility(3) ? styles.animate : ''}>
                    <span>Clasificación:</span> {dinosaurInfo.clasificacion}
                  </li>
                  <li className={getItemVisibility(4) ? styles.animate : ''}>
                    <span>Dieta:</span> {dinosaurInfo.dieta}
                  </li>
                  <li className={getItemVisibility(5) ? styles.animate : ''}>
                    <span>Velocidad:</span> {dinosaurInfo.velocidad}
                  </li>
                  <li className={getItemVisibility(6) ? styles.animate : ''}>
                    <span>Características:</span> {dinosaurInfo.caracteristicas}
                  </li>
                  <li className={getItemVisibility(7) ? styles.animate : ''}>
                    <span>Naturaleza:</span> {dinosaurInfo.naturaleza}
                  </li>
                  <li className={getItemVisibility(8) ? styles.animate : ''}>
                    <span>Fósiles:</span> {dinosaurInfo.fosiles}
                  </li>
                  <li className={getItemVisibility(9) ? styles.animate : ''}>
                    <span>Sociabilidad:</span> {dinosaurInfo.sociabilidad}
                  </li>
                  <li className={getItemVisibility(10) ? styles.animate : ''}>
                    <span>Relación evolutiva:</span> {dinosaurInfo.relacionEvolutiva}
                  </li>
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
