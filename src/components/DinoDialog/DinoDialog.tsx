import { useState, useEffect } from 'react';
import styles from './DinoDialog.module.css';

export const DinoDialog = () => {
    const fullText = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.";
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const typingSpeed = 50;
            const timer = setTimeout(() => {
                setDisplayText(prevText => formatText(prevText + fullText[currentIndex]));
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, fullText]);

    const formatText = (text) => {
        const boldWords = ["dolor", "Quisque faucibus"];

        let formattedText = text;
        boldWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'g');
            formattedText = formattedText.replace(regex, '<b>$1</b>');
        });

        return formattedText;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogContainer}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}></div>
                </div>
                <div className={styles.dialog}>
                    <div className={styles.typingContainer}>
                        <div
                            className={styles.typing}
                            dangerouslySetInnerHTML={{ __html: displayText }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DinoDialog;