export interface DinosaurInfo {
    name: string;
    scientific_name: string;
    height: string;
    weight: string;
    classification: string;
    diet_type: string;
    speed: string;
    special_features: string;
    defense_attack_mechanism: string;
    fossils_found_in: string;
    social_behaviour: string;
    evolutionary_relationship: string;
}

export interface Dinosaur {
    info: DinosaurInfo;
}

export class DinosaurModel {
    private _info: DinosaurInfo;
    private _discovered: boolean;
    private _puzzlePieceDiscovered: boolean;
    private _progress: number;

    constructor(info: DinosaurInfo) {
        this._info = info;
        this._discovered = false;
        this._puzzlePieceDiscovered = false;
        this._progress = 0;
    }

    get info(): DinosaurInfo {
        return this._info;
    }

    get discovered(): boolean {
        return this._discovered;
    }

    set discovered(value: boolean) {
        this._discovered = value;
    }

    get puzzlePieceDiscovered(): boolean {
        return this._puzzlePieceDiscovered;
    }

    set puzzlePieceDiscovered(value: boolean) {
        this._puzzlePieceDiscovered = value;
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        this._progress = value;
    }
}

export class SubPeriodModel {
    private _name: string;
    private _completed: boolean;
    private _progress: number;
    private _dinosaurs: Dinosaur[];

    constructor(name: string, dinosaurs: Dinosaur[]) {
        this._name = name;
        this._completed = false;
        this._progress = 0;
        this._dinosaurs = dinosaurs;
    }

    get name(): string {
        return this._name;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        this._progress = value;
    }

    get dinosaurs(): Dinosaur[] {
        return this._dinosaurs;
    }

    updateProgress(): void {
        const totalDinosaurs = this._dinosaurs.length;
        if (totalDinosaurs === 0) {
            this._progress = 0;
            return;
        }

        const discoveredDinosaurs = this._dinosaurs.filter(dino => dino.info.name).length;
        this._progress = (discoveredDinosaurs / totalDinosaurs) * 100;
        this._completed = this._progress === 100;
    }
}

export class PeriodModel {
    private _name: string;
    private _completed: boolean;
    private _progress: number;
    private _subPeriods: SubPeriodModel[];

    constructor(name: string, subPeriods: SubPeriodModel[]) {
        this._name = name;
        this._completed = false;
        this._progress = 0;
        this._subPeriods = subPeriods;
    }

    get name(): string {
        return this._name;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        this._progress = value;
    }

    get subPeriods(): SubPeriodModel[] {
        return this._subPeriods;
    }

    updateProgress(): void {
        const totalSubPeriods = this._subPeriods.length;
        if (totalSubPeriods === 0) {
            this._progress = 0;
            return;
        }

        let totalProgress = 0;
        this._subPeriods.forEach(subPeriod => {
            subPeriod.updateProgress();
            totalProgress += subPeriod.progress;
        });

        this._progress = totalProgress / totalSubPeriods;
        this._completed = this._progress === 100;
    }
} 