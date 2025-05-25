import { TipsModel } from './TipsModel';

export class TipsController {
    private model: TipsModel;

    constructor(model: TipsModel) {
        this.model = model;
    }

    public onPuzzleaurusCheckboxClicked = () => {
        this.model.togglePuzzleaurusTipsEnabled();
    };

    public onMemoDynCheckboxClicked = () => {
        this.model.toggleMemoDynTipsEnabled();
    };
} 