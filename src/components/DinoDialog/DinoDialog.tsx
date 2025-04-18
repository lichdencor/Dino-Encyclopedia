import { useState, useEffect } from 'react';
import styles from './DinoDialog.module.css';

export const DinoDialog = ({onClick, text, looped, boldWords, dialogStyle}: any) => {
    const fullText = text;
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDialogShowing, setIsDialogShowing] = useState(true);
    const [isLooped, setIsLooped] = useState(false);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const typingSpeed = 50;
            const timer = setTimeout(() => {
                setDisplayText(prevText => formatText(prevText + fullText[currentIndex]));
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);

            return () => clearTimeout(timer);
        } else if(isLooped) {
            setIsDialogShowing(false);
            const pauseBeforeLoop = 3500;
            const pauseTimer = setTimeout(() => {
                setDisplayText("");
                setCurrentIndex(0);
                setIsDialogShowing(true);
                setIsLooped(false);
            }, pauseBeforeLoop);
            return () => clearTimeout(pauseTimer);
        } else {
            if (looped) {
                setTimeout(() => {
                    setIsLooped(true);
                }, 3500);
            }
        }
    }, [currentIndex, fullText, isDialogShowing, isLooped]);

    const formatText = (text) => {
        let formattedText = text;
        boldWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'g');
            formattedText = formattedText.replace(regex, '<b>$1</b>');
        });

        return formattedText;
    };

    return (
        <div className={styles.dialogContainer}>
            <div className={styles.logoContainer} >
                <div className={styles.logo} onClick={onClick}></div>
            </div>
            <div className={`${styles.dialog} ${isDialogShowing ? styles.dialogShow : ''}`} style={dialogStyle}>
                <div className={styles.typingContainer} >
                    <div
                        className={styles.typing}
                        dangerouslySetInnerHTML={{ __html: displayText }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DinoDialog;