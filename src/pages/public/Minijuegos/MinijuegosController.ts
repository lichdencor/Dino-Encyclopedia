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

    handleGameClick(game: GameData) {
        const canAccess = this.model.handleGameAccess(game);
        
        if (canAccess) {
            this.navigate(game.link);
        }
    }

    handleErrorClose() {
        this.model.clearError();
    }

} 