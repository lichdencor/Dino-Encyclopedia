import React, { useEffect, useState } from "react";
import stylesContainer from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css";
import styles from "./XrayModal.module.css";
import { Alert } from "../../components";

type DinosaurInfo = {
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
  dinosaurInfo: DinosaurInfo | null;
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
    stylesContainer.dinosaurBoneBg1,
    stylesContainer.dinosaurBoneBg2,
    stylesContainer.dinosaurBoneBg3,
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
                    <div
                      className={
                        `${stylesContainer[`dinosaur${selectedDinosaur + 1}Bone`]} ` +
                        `${activeDinosaur === selectedDinosaur ? stylesContainer.activeBone : ""}`
                      }
                    ></div>
                    {showPuzzlePiece && (
                      <img
                        className={`${styles.puzzlePiece} ${showAlert ? styles.hiddenPiece : ""}`}
                        src="/assets/img/puzzles/puzzle-piece.png"
                        style={{
                          top: `${pieceTopPercent * 100}%`,
                          left: `${pieceLeftPercent * 100}%`
                        }}
                        alt="puzzle piece"
                        onMouseEnter={openAlert}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.informationContainer}>
              <h2 className={styles.xRayNameFrame}>{`Dinosaurio ${selectedDinosaur + 1}`}</h2>
              <div className={styles.information}>
                <ul className={styles.infoList}>
                  <li><span>Nombre científico:</span> {dinosaurInfo.nombreCientifico}</li>
                  <li><span>Altura:</span> {dinosaurInfo.altura}</li>
                  <li><span>Peso:</span> {dinosaurInfo.peso}</li>
                  <li><span>Clasificación:</span> {dinosaurInfo.clasificacion}</li>
                  <li><span>Dieta:</span> {dinosaurInfo.dieta}</li>
                  <li><span>Velocidad:</span> {dinosaurInfo.velocidad}</li>
                  <li><span>Características:</span> {dinosaurInfo.caracteristicas}</li>
                  <li><span>Naturaleza:</span> {dinosaurInfo.naturaleza}</li>
                  <li><span>Fósiles:</span> {dinosaurInfo.fosiles}</li>
                  <li><span>Sociabilidad:</span> {dinosaurInfo.sociabilidad}</li>
                  <li><span>Relación evolutiva:</span> {dinosaurInfo.relacionEvolutiva}</li>
                </ul>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progressBarContainer}>
                  <span className={styles.progressText}>62%</span>
                  <div className={styles.progressBar}></div>
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
