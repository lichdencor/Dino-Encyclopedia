import React, { useEffect, useState } from 'react';
import styles from './DialogoTips.module.css';
import { getRandomDinoFact } from '../../services/TipsService.ts';

interface TransitionDialogProps {
    onContinue: () => void;
    puzzleName: string;
}

const DialogoTips: React.FC<TransitionDialogProps> = ({ onContinue, puzzleName }) => {
    const [fact, setFact] = useState<string>("");
    const [loading, setLoading] = useState(true);
    console.log(puzzleName);
    useEffect(() => {
        getRandomDinoFact().then(fact => {
            setFact(fact);
            setLoading(false);
        });
    }, []);

    return (
        <div className={styles.dialogueOverlay}>
            <div className={styles.dialogueGoldBg}>
            <div className={styles.dialogueContainer}>
                <div className={styles.dialogueBox}>
                    <p className={styles.dialogueQuestion}>¿Sabías que...?</p>
                    <p className={styles.dialogueText}>
                        {loading ? 'Cargando dato de dinosaurio...' : fact}
                    </p>
                </div>
                <div className={styles.charactersRow}>
                    <div className={styles.character1}>
                        <img 
                            src="/assets/giph/dynard-friend.gif" 
                            alt="character 1" 
                            className={styles.characterImage}
                        />
                    </div>
                    <div className={styles.character2}>
                        <img 
                            src="/assets/giph/logo.gif" 
                            alt="character 2" 
                            className={styles.characterImage}
                        />
                    </div>
                </div>
                <button className={styles.continueButton} onClick={onContinue}>
                    continue
                </button>
            </div>
            </div>
        </div>
    );
};

export default DialogoTips;