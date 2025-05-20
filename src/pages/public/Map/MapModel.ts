import { DinosaurModel, DinosaurInfo, SubPeriodModel, PeriodModel } from '../../../models/PeriodModel';
import { createDinosaurModel } from '../../../utils/dinosaur';
import galleriesData from '../../../context/data/galleries_data.json';
import { ProgressData } from '../../../services/progress/types';

interface MapState {
    displayNames: { [key: string]: string[] };
    discoveredSilhouettes: { [key: string]: boolean[] };
    periods: PeriodModel[];
    progress: ProgressData;
}

interface PuzzlePiece {
    era: string;
    period: string;
    dinosaurId: string;
}

class DinosaurMapModel {
    private _dinosaur: DinosaurModel;
    private _image: string;
    private _silhouette: string;

    constructor(dinosaur: DinosaurModel) {
        this._dinosaur = dinosaur;
        this._image = '';
        this._silhouette = '';
    }

    get dinosaur(): DinosaurModel {
        return this._dinosaur;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get silhouette(): string {
        return this._silhouette;
    }

    set silhouette(value: string) {
        this._silhouette = value;
    }
}

export class MapModel {
    private state: MapState;
    private listeners: ((state: MapState) => void)[] = [];
    private dinosaurMaps: Map<string, DinosaurMapModel> = new Map();

    constructor(progress: ProgressData) {
        this.state = {
            displayNames: {},
            discoveredSilhouettes: {},
            periods: [],
            progress: progress || { 
                galleries: [{ 
                    era_triassic: [], 
                    era_jurassic: [], 
                    era_cretaceous: [] 
                }],
                minigames: {
                    puzzleaurus: {
                        foundPieces: []
                    }
                }
            }
        };
        this.state.periods = this.initializePeriods();
        this.initialize();
    }

    private initializePeriods(): PeriodModel[] {
        const createDinosaur = (dinoData: DinosaurInfo & { id: string }, era: string, period: string): DinosaurModel => {
            // Get progress data for this dinosaur with proper null checks
            const progress = this.state.progress;
            const dinosaur = createDinosaurModel(dinoData, progress);
            const mapModel = new DinosaurMapModel(dinosaur);
            this.dinosaurMaps.set(dinoData.name, mapModel);
            return dinosaur;
        };

        const periods: PeriodModel[] = [];
        const galleries = galleriesData.galleries[0];

        // Process Triassic Period
        const triassicPeriods = galleries.era_triassic.map(period => {
            const periodName = period.period.split(" ")[1];
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur({ ...dino, id: dino.name }, "Triassic", periodName))
            );
        });
        periods.push(new PeriodModel("Triassic", triassicPeriods));

        // Process Jurassic Period
        const jurassicPeriods = galleries.era_jurassic.map(period => {
            const periodName = period.period.split(" ")[1];
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur({ ...dino, id: dino.name }, "Jurassic", periodName))
            );
        });
        periods.push(new PeriodModel("Jurassic", jurassicPeriods));

        // Process Cretaceous Period
        const cretaceousPeriods = galleries.era_cretaceous.map(period => {
            const periodName = period.period.split(" ")[1];
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur({ ...dino, id: dino.name }, "Cretaceous", periodName))
            );
        });
        periods.push(new PeriodModel("Cretaceous", cretaceousPeriods));

        return periods;
    }

    public initialize() {
        this.updateDisplayNames();
    }

    private updateDisplayNames() {
        const displayNames: MapState['displayNames'] = {};
        const discoveredSilhouettes: MapState['discoveredSilhouettes'] = {};
        
        this.state.periods.forEach(period => {
            const periodName = period.name.toLowerCase();
            period.subPeriods.forEach(subPeriod => {
                const subPeriodName = subPeriod.name.split(" ")[1];
                const key = `${periodName}-${subPeriodName.toLowerCase()}`;
                displayNames[key] = [];
                discoveredSilhouettes[key] = [];
                
                subPeriod.dinosaurs.forEach((dino, index) => {
                    const progress = this.getDinosaurProgress(this.state.progress, periodName, subPeriodName, dino.info.name);
                    dino.progress = progress;
                    dino.discovered = progress === 100;
                    
                    displayNames[key].push(dino.info.name);
                    discoveredSilhouettes[key].push(dino.discovered);
                });
            });
        });
        
        this.state.displayNames = displayNames;
        this.state.discoveredSilhouettes = discoveredSilhouettes;
        this.notifyListeners();
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    public addListener(listener: (state: MapState) => void) {
        this.listeners.push(listener);
    }

    public removeListener(listener: (state: MapState) => void) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    public getDinosaurMapModel(name: string): DinosaurMapModel | undefined {
        return this.dinosaurMaps.get(name);
    }

    public setDinosaurAssets(name: string, image: string, silhouette: string) {
        const mapModel = this.dinosaurMaps.get(name);
        if (mapModel) {
            mapModel.image = image;
            mapModel.silhouette = silhouette;
        }
    }

    private getDinosaurProgress(progress: ProgressData, era: string, period: string, dinoName: string): number {
        if (!progress?.galleries?.[0]) {
            return 0;
        }
        
        const eraKey = `era_${era.toLowerCase()}` as keyof typeof progress.galleries[0];
        const eraData = progress.galleries[0][eraKey];
        
        if (!Array.isArray(eraData)) {
            return 0;
        }

        const periodData = eraData.find(
            (p) => p?.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
        );
        
        if (!periodData?.dinosaurs) {
            return 0;
        }
        const dinosaur = periodData.dinosaurs.find(d => d?.id === dinoName);
        return dinosaur?.scanProgress || 0;
    }

    public getState(): MapState {
        return this.state;
    }

    public subscribe(listener: (state: MapState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}
