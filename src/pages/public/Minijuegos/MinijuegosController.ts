import { MinijuegosModel, GameData } from './MinijuegosModel';
import { NavigateFunction } from 'react-router-dom';

export class MinijuegosController {
    private model: MinijuegosModel;
    private navigate: NavigateFunction;

    constructor(model: MinijuegosModel, navigate: NavigateFunction) {
        this.model = model;
        this.navigate = navigate;
    }

    initializeGames() {
        this.model.initializeGames();
    }

    handleGameClick(game: GameData) { // M4-13/20
        const canAccess = this.model.handleGameAccess(game); // M4-14/21

        if (canAccess) {
            this.navigate(game.link); // M4-27
        }
    }

    handleErrorClose() {
        this.model.clearError();
    }

} 