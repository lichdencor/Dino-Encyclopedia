import React, { useEffect, useState } from 'react';
import styles from './DialogoTips.module.css';
import { getRandomDinoFact } from '../../services/dinosaurService';

interface TransitionDialogProps {
    onContinue: () => void;
    puzzleName: string;
}

const DialogoTips: React.FC<TransitionDialogProps> = ({ onContinue, puzzleName }) => {
    const [fact, setFact] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRandomDinoFact().then(fact => {
            setFact(fact);
            setLoading(false);
        });
    }, []);

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContainer}>
                <div className={styles.dialogBox}>
                    <p className={styles.dialogText}>
                        {loading ? 'Cargando dato de dinosaurio...' : fact}
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

export default DialogoTips;