import React from 'react'
import styles from "./Alert.module.css";

type AlertProps = {
    onClose: () => void;
};

export const Alert = ({ onClose }: AlertProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className={styles.alertPage} onClick={e => e.stopPropagation()}>
            <div className={styles.alertContainer}>
                <div className={styles.puzzleImgContainer}>
                    <div className={styles.puzzleBackground}></div>
                    <img src="/assets/img/puzzles/puzzle-piece.png" alt="puzzle piece" className={styles.puzzleImg} />
                </div>
                <p>¡Felicidades! Has encontrado una pieza de puzzle</p>
                <span>Visitá el minijuego Puzzleaurus para ver tu progreso total de piezas</span>
                <button className={styles.closeBtn} onClick={handleClick}>CERRAR</button>
            </div>
        </div>
    );
};
