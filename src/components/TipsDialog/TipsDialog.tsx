import React from 'react';
import styles from './TipsDialog.module.css';

interface TransitionDialogProps {
    onContinue: () => void;
    puzzleName: string;
}

const TipsDialog: React.FC<TransitionDialogProps> = ({ onContinue, puzzleName }) => {
    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <p className={styles.dialogText}>
                        ¡Hola! ¿Estás listo para resolver el puzzle de {puzzleName}?<br/>
                        ¡Vamos a poner a prueba tus habilidades!
                    </p>
                </div>
                <div className={styles.charactersRow}>
                    <div className={styles.character1Circle}>
                        <img 
                            src="/assets/img/characters/character1.png" 
                            alt="Character 1" 
                            className={styles.characterImage}
                        />
                        <span className={styles.characterLabel}>character1</span>
                    </div>
                    <div className={styles.character2Circle}>
                        <img 
                            src="/assets/img/characters/character2.png" 
                            alt="Character 2" 
                            className={styles.characterImage}
                        />
                        <span className={styles.characterLabel}>character2</span>
                    </div>
                </div>
                <button className={styles.continueButton} onClick={onContinue}>
                    continue
                </button>
            </div>
        </div>
    );
};

export default TipsDialog;