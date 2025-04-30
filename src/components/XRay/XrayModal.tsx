import React, { useEffect, useState } from "react";

// IMPORTA tus estilos
import stylesContainer from "../../pages/public/Triassic-Inferior/Triassic-Inferior.module.css"; // <- Estilos de la página
import styles from "./XRayModal.module.css";
import { Alert } from "../Alert/Alert";

type XRayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDinosaur: number | null;
  activeDinosaur: number | null;
  setActiveDinosaur: (index: number | null) => void;
};

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur
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

  const setPuzzlePiecePosition = (activeDinosaur: number | null) => {
    if (activeDinosaur === 0) {
      setPieceLeftPercent(0.8);
      setPieceTopPercent(0.5);
    }
    if (activeDinosaur === 1) {
      setPieceLeftPercent(0.8);
      setPieceTopPercent(0.3);
    }
    if (activeDinosaur === 2) {
      setPieceLeftPercent(0.4);
      setPieceTopPercent(0.5);
    }
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
    setPuzzlePiecePosition(activeDinosaur);
  }, [activeDinosaur]);

  const handleMouseMove = (
    mouseEvent: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = mouseEvent.currentTarget.getBoundingClientRect();

    const x_percent = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
    const y_percent = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
    mouseEvent.currentTarget.style.setProperty("--cursor-x", `${x_percent}%`);
    mouseEvent.currentTarget.style.setProperty("--cursor-y", `${y_percent}%`);

    // Lógica de “proximidad”
    // Coordenadas del mouse dentro del contenedor
    const mouseX = mouseEvent.clientX - rect.left;
    const mouseY = mouseEvent.clientY - rect.top;

    const pieceX = rect.width * pieceLeftPercent;
    const pieceY = rect.height * pieceTopPercent;

    const distance = Math.sqrt(
      Math.pow(mouseX - pieceX, 2) + Math.pow(mouseY - pieceY, 2)
    );

    // si la distancia del mouse es menor a 20px, se activa el estado para mostrar la piece
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

      <div
        className={stylesContainer.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <div className={stylesContainer.dinosaurContainer}>
          <h2>{`Dinosaurio ${selectedDinosaur + 1}`}</h2>
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
                    src="../../../public/assets/img/puzzles/puzzle-piece.png"
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
      </div>
    </div>
  );
};
