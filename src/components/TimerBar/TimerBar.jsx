import React, { Component } from 'react';
import './TimerBar.css';

class TimerBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePercentage: 100,
            isWarning: false,
            showTimeoutMessage: false
        };
        this.handleModelUpdate = this.handleModelUpdate.bind(this);
    }

    componentDidMount() {
        this.props.model.subscribe(this.handleModelUpdate);
    }

    componentWillUnmount() {
        this.props.model.unsubscribe(this.handleModelUpdate);
    }

    handleModelUpdate(newState) {
        this.setState({
            timePercentage: newState.timePercentage,
            isWarning: newState.isWarning,
            showTimeoutMessage: newState.showTimeoutMessage
        });
    }

    render() {
        const { timePercentage, isWarning, showTimeoutMessage } = this.state;
        const { isComplete } = this.props;

        if (isComplete || showTimeoutMessage) return null;

        return (
            <div className="bar-container">
                <div className="bar">
                    <div className="timer-bar-container">
                        <div className="timer-bar">
                            <div
                                className={`timer-progress ${isWarning ? 'time-critical' : ''}`}
                                style={{ width: `${timePercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimerBar; 