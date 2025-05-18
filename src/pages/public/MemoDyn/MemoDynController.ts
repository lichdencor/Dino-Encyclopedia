import { MemoDynModel, GameSelection } from './MemoDynModel';

export class MemoDynController {
    private model: MemoDynModel;

    constructor(model: MemoDynModel) {
        this.model = model;

        // Bind methods to preserve 'this' context
        this.handleGameSelect = this.handleGameSelect.bind(this);
        this.handleBackToMenu = this.handleBackToMenu.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleStorageChange = this.handleStorageChange.bind(this);
    }

    public handleGameSelect(selection: GameSelection) {
        this.model.selectGame(selection);
    }

    public handleBackToMenu() {
        this.model.returnToMenu();
    }

    public handleContinue() {
        this.model.continue();
    }

    public handleCardClick(index: number) {
        this.model.handleCardClick(index);
    }

    public handleStorageChange() {
        this.model.handleStorageChange();
    }
} 