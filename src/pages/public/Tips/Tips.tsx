import { Component } from 'react';
import styles from './Tips.module.css';
import { Nav } from '../../../components';
import { TipsModel, TipsState } from './TipsModel';
import { TipsController } from './TipsController';

export class Tips extends Component<{}, TipsState> {
    private model: TipsModel;
    private controller: TipsController;
    private unsubscribe: (() => void) | null = null;

    constructor(props: {}) {
        super(props);
        this.model = new TipsModel();
        this.controller = new TipsController(this.model);
        this.state = this.model.getState();
    }

    componentDidMount() {        
        this.unsubscribe = this.model.subscribe((state) => {
            this.setState(state);
        });
        this.model.initialize();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

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
                    onChange={this.controller.onPuzzleaurusCheckboxClicked}
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
                    onChange={this.controller.onMemoDynCheckboxClicked}
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