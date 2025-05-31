import React, { Component } from 'react';
import styles from './Timer.module.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedTime: '0:00',
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
            formattedTime: newState.formattedTime,
            showTimeoutMessage: newState.showTimeoutMessage
        });
    }

    render() {
        const { showTimeoutMessage, formattedTime } = this.state;

        if (showTimeoutMessage) return null;

        return (
            <div className={styles.timer}>
                <div className={styles.timeDisplay}>
                    {formattedTime}
                </div>
            </div>
        );
    }
}

export default Timer; 