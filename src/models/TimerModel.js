import {DIFFICULTY_LEVELS} from "../context/Puzzle/PuzzleContext.jsx";

class TimerModel {
    constructor(difficultyConfig) {
        this.difficultyConfig = difficultyConfig;
        this.time = difficultyConfig.time;
        this.observers = [];
        this.state = {
            time: this.time,
            formattedTime: this.formatTime(this.time),
            timePercentage: this.calculateTimePercentage(),
            isWarning: false,
            showTimeoutMessage: false
        };
    }

    subscribe(observer) {
        this.observers.push(observer);
        observer(this.state);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer(this.state));
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyObservers();
    }

    setTime(time) {
        this.time = time;
        const timePercentage = this.calculateTimePercentage();
        this.updateState({
            time,
            formattedTime: this.formatTime(time),
            timePercentage,
            isWarning: this.isWarningTime(timePercentage)
        });
    }

    setShowTimeoutMessage(show) {
        this.updateState({ showTimeoutMessage: show });
    }

    formatTime(seconds) {
        const minutes = Math.floor(Math.round(seconds) / 60);
        const remainingSeconds = Math.round(seconds) % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    calculateTimePercentage() {
        return (this.time / this.difficultyConfig.time) * 100;
    }

    isWarningTime(timePercentage) {
        return timePercentage <= 25;
    }
}

export default TimerModel; 