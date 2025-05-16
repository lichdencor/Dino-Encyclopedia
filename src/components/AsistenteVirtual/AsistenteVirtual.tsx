import { useState, useEffect } from 'react';
import './AsistenteVirtual.css';

interface VirtualAssistantProps {
    onClick?: () => void;
    text: string;
    looped?: boolean;
    boldWords?: string[];
    dialogStyle?: React.CSSProperties;
}

export const AsistenteVirtual = ({onClick, text, looped, boldWords = [], dialogStyle}: VirtualAssistantProps) => {
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

    const formatText = (text: string) => {
        let formattedText = text;
        boldWords.forEach((word: string) => {
            const regex = new RegExp(`(${word})`, 'g');
            formattedText = formattedText.replace(regex, '<b>$1</b>');
        });

        return formattedText;
    };

    function mostrarAccesoAsistenteVirtual() {
        return (
            <div id="virtual-assistant" className="dialogueContainer">
                <div>
                    <img src="/assets/giph/logo.gif" className="virtualAssistantGiph" onClick={onClick}></img>

                </div>
                <div className={`${"dialogue"} ${isDialogShowing ? "dialogueShow" : ''}`} style={dialogStyle}>
                    <div className="typingContainer">
                        <div
                            className="typing"
                            dangerouslySetInnerHTML={{__html: displayText}}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return mostrarAccesoAsistenteVirtual();
};

export default AsistenteVirtual;