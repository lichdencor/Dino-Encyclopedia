import { Component } from 'react';
import styles from './Tips.module.css';
import { Nav } from '../../../components';

const PUZZLEAURUS_TIPS_KEY = 'showPuzzleaurusTipsDialog';
const MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';

interface TipsState {
    puzzleaurusEnabled: boolean;
    memoDynEnabled: boolean;
}

export class Tips extends Component<{}, TipsState> {
    state: TipsState = {
        puzzleaurusEnabled: false,
        memoDynEnabled: false
    };

    componentDidMount() {
        const puzzleaurusStored = localStorage.getItem(PUZZLEAURUS_TIPS_KEY);
        const memoDynStored = localStorage.getItem(MEMODYN_TIPS_KEY);
        this.setState({
            puzzleaurusEnabled: puzzleaurusStored === 'true',
            memoDynEnabled: memoDynStored === 'true'
        });
    }

    handlePuzzleaurusToggle = () => {
        const newValue = !this.state.puzzleaurusEnabled;
        localStorage.setItem(PUZZLEAURUS_TIPS_KEY, String(newValue));
        this.setState({ puzzleaurusEnabled: newValue });
    };

    handleMemoDynToggle = () => {
        const newValue = !this.state.memoDynEnabled;
        localStorage.setItem(MEMODYN_TIPS_KEY, String(newValue));
        this.setState({ memoDynEnabled: newValue });
    };

    mostrarTips() {
        return <div className={styles.tipsBackofficeContainer}>
            <h2 className={styles.title}>Tips</h2>
            <div className={styles.switchRow}>
                <label htmlFor="puzzleaurus-tips-switch" className={styles.label}>
                    Mostrar Tips en Puzzleaurus
                </label>
                <input
                    id="puzzleaurus-tips-switch"
                    type="checkbox"
                    checked={this.state.puzzleaurusEnabled}
                    onChange={this.handlePuzzleaurusToggle}
                    className={styles.switch}
                />
            </div>
            <div className={styles.status}>
                Estado actual Puzzleaurus: <b>{this.state.puzzleaurusEnabled ? 'Habilitado' : 'Deshabilitado'}</b>
            </div>
            <div className={styles.switchRow}>
                <label htmlFor="memoDyn-tips-switch" className={styles.label}>
                    Mostrar Tips en MemoDyn
                </label>
                <input
                    id="memoDyn-tips-switch"
                    type="checkbox"
                    checked={this.state.memoDynEnabled}
                    onChange={this.handleMemoDynToggle}
                    className={styles.switch}
                />
            </div>
            <div className={styles.status}>
                Estado actual MemoDyn: <b>{this.state.memoDynEnabled ? 'Habilitado' : 'Deshabilitado'}</b>
            </div>
        </div>;
    }

    render() {
        return (
            <div className={styles.tipsPage}>
                <Nav/>
                {this.mostrarTips()}
            </div>
        );
    }
}