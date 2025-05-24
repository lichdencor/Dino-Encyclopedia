import React from 'react'
import styles from "./Alert.module.css";

type AlertProps = {
    onClose: () => void;
    imageSrc?: string;
    messageText?: string;
    spanText?: string;
};

export const Alert = ({ 
    onClose, 
    imageSrc,
    messageText,
    spanText
}: AlertProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className={styles.alertPage} onClick={e => e.stopPropagation()}>
            <div className={styles.alertContainer}>
                <div className={styles.puzzleImgContainer}>
                    <div className={styles.puzzleBackground}></div>
                    <img src={imageSrc} alt="alert image" className={styles.puzzleImg} />
                </div>
                <p>{messageText}</p>
                <span>{spanText}</span>
                <button className={styles.closeBtn} onClick={handleClick}>CERRAR</button>
            </div>
        </div>
    );
};
