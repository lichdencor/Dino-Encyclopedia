import { ProgressData } from "../../../services/progress/types";
import { PeriodModel, SubPeriodModel, DinosaurModel, DinosaurInfo } from "../../../models/PeriodModel";
import galleriesData from "../../../context/data/galleries_data.json";
import { VirtualAssistantDialogue } from "../../../data";

export class DinosaurMapModel {
    private _dinosaur: DinosaurModel;
    private _image: string;
    private _silhouette: string;

    constructor(dinosaur: DinosaurModel, image: string = "", silhouette: string = "") {
        this._dinosaur = dinosaur;
        this._image = image;
        this._silhouette = silhouette;
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

export interface MapState {
    displayNames: {
        [key: string]: string[]; // key format: "era-period" (e.g., "triassic-inferior")
    };
    discoveredSilhouettes: {
        [key: string]: boolean[]; // key format: "era-period" (e.g., "triassic-inferior")
    };
    periods: PeriodModel[];
    isVirtualAssistantOpen: boolean;
    modalCurrentPage: number;
}

export class MapModel {
    private state: MapState;
    private listeners: ((state: MapState) => void)[] = [];
    private progress: ProgressData;
    private periods: PeriodModel[];
    private dinosaurMaps: Map<string, DinosaurMapModel> = new Map();

    constructor(progress: ProgressData) {
        this.progress = progress;
        this.periods = this.initializePeriods();
        this.state = {
            displayNames: {},
            discoveredSilhouettes: {},
            periods: this.periods,
            isVirtualAssistantOpen: false,
            modalCurrentPage: 0
        };
    }

    private initializePeriods(): PeriodModel[] {
        const createDinosaur = (dinoData: any): DinosaurModel => {
            const info: DinosaurInfo = {
                name: dinoData.name,
                scientific_name: dinoData.scientific_name.trim(),
                height: dinoData.height.trim(),
                weight: dinoData.weight.trim(),
                classification: dinoData.classification.trim(),
                diet_type: dinoData.diet_type.trim(),
                speed: dinoData.speed.trim(),
                special_features: dinoData.special_features.trim(),
                defense_attack_mechanism: dinoData.defense_attack_mechanism.trim(),
                fossils_found_in: dinoData.fossils_found_in.trim(),
                social_behaviour: dinoData.social_behaviour.trim(),
                evolutionary_relationship: dinoData.evolutionary_relationship.trim()
            };
            const dinosaur = new DinosaurModel(info);
            const mapModel = new DinosaurMapModel(dinosaur);
            this.dinosaurMaps.set(info.name, mapModel);
            return dinosaur;
        };

        const periods: PeriodModel[] = [];
        const galleries = galleriesData.galleries[0];

        // Process Triassic Period
        const triassicPeriods = galleries.era_triassic.map(period => {
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur(dino))
            );
        });
        periods.push(new PeriodModel("Triassic", triassicPeriods));

        // Process Jurassic Period
        const jurassicPeriods = galleries.era_jurassic.map(period => {
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur(dino))
            );
        });
        periods.push(new PeriodModel("Jurassic", jurassicPeriods));

        // Process Cretaceous Period
        const cretaceousPeriods = galleries.era_cretaceous.map(period => {
            return new SubPeriodModel(
                period.period,
                period.dinosaurs.map(dino => createDinosaur(dino))
            );
        });
        periods.push(new PeriodModel("Cretaceous", cretaceousPeriods));

        return periods;
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

    public initialize() {
        this.updateDisplayNames(this.progress);
    }

    private updateDisplayNames(progress: ProgressData) {
        if (!progress?.galleries?.[0]) return;

        const displayNames: MapState['displayNames'] = {};
        const discoveredSilhouettes: MapState['discoveredSilhouettes'] = {};

        this.periods.forEach(period => {
            const periodName = period.name.toLowerCase();
            period.subPeriods.forEach(subPeriod => {
                const subPeriodName = subPeriod.name.split(" ")[1].toLowerCase();
                const key = `${periodName}-${subPeriodName}`;

                subPeriod.dinosaurs.forEach((dino) => {
                    const progress = this.getDinosaurProgress(this.progress, periodName, subPeriodName, dino.info.name);
                    (dino as DinosaurModel).progress = progress;
                    (dino as DinosaurModel).discovered = progress === 100;
                });

                displayNames[key] = subPeriod.dinosaurs.map(dino => (dino as DinosaurModel).discovered ? dino.info.name : "?");
                discoveredSilhouettes[key] = subPeriod.dinosaurs.map(dino => (dino as DinosaurModel).discovered);

                subPeriod.updateProgress();
            });

            period.updateProgress();
        });

        this.setState({ ...this.state, displayNames: displayNames, discoveredSilhouettes: discoveredSilhouettes, periods: this.periods });
        this.notifyListeners();
    }

    private setState(state: MapState) {
        this.state = state;
    }

    getState(): MapState {
        return { ...this.state };
    }

    subscribe(listener: (state: MapState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    getDisplayNames(era: string, period: string): string[] {
        const key = `${era}-${period}`;
        return this.state.displayNames[key] || [];
    }

    private getDinosaurProgress(progress: ProgressData, era: string, period: string, dinoName: string): number {
        if (!progress?.galleries?.[0]) {
            return 0;
        }

        const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
        const eraData = progress.galleries[0][eraKey];

        if (!eraData) {
            return 0;
        }

        const periodData = eraData.find(
            (p) => p.period === `${period.charAt(0).toUpperCase() + period.slice(1)} ${era.charAt(0).toUpperCase() + era.slice(1)}`
        );

        if (!periodData?.dinosaurs) {
            return 0;
        }

        // Map of simple names to scientific names
        const scientificNames: { [key: string]: string } = {
            "Postosuchus": "Postosuchus kirkpatricki",
            "Eoraptor": "Eoraptor lunensis",
            "Herrerasaurus": "Herrerasaurus ischigualastensis",
            "Shuvosaurus": "Shuvosaurus inexpectatus",
            "Fukuiraptor": "Fukuiraptor kitadaniensis",
            "Chindesaurus": "Chindesaurus bryansmalli",
            "Coelophysis": "Coelophysis bauri",
            "Plateosaurus": "Plateosaurus engelhardti",
            "Rauisuchus": "Rauisuchus tiradentes",
            "Dilophosaurus": "Dilophosaurus wetherilli",
            "Compsognathus": "Compsognathus longipes",
            "Cryolophosaurus": "Cryolophosaurus ellioti",
            "Allosaurus": "Allosaurus fragilis",
            "Apatosaurus": "Apatosaurus louisae",
            "Camarasaurus": "Camarasaurus supremus",
            "Brachiosaurus": "Brachiosaurus altithorax",
            "Diplodocus": "Diplodocus longus",
            "Stegosaurus": "Stegosaurus stenops",
            "Pachycephalosaurus": "Pachycephalosaurus wyomingensis",
            "Microceratus": "Microceratus gobiensis",
            "Gallimimus": "Gallimimus bullatus",
            "Spinosaurus": "Spinosaurus aegyptiacus",
            "Baryonyx": "Baryonyx walkeri",
            "Irritator": "Irritator challengeri",
            "Triceratops": "Triceratops horridus",
            "Ankylosaurus": "Ankylosaurus magniventris",
            "Tyrannosaurus": "Tyrannosaurus Rex"
        };

        const scientificName = scientificNames[dinoName];
        if (!scientificName) {
            return 0;
        }

        const dinosaur = periodData.dinosaurs.find(d => d.id === scientificName);
        return dinosaur?.scanProgress || 0;
    }

    public toggleVirtualAssistant() {
        this.setState({ ...this.state, isVirtualAssistantOpen: !this.state.isVirtualAssistantOpen });
        if (!this.state.isVirtualAssistantOpen) {
            this.setState({ ...this.state, modalCurrentPage: 0 });
        }
        this.notifyListeners();
    }

    public setModalPage(pageIndex: number) {
        this.setState({ ...this.state, modalCurrentPage: pageIndex });
        this.notifyListeners();
    }

    public getModalPages() {
        const dialogueWithoutTutorial = [...VirtualAssistantDialogue];
        // Remove tutorial option from main menu
        if (dialogueWithoutTutorial[0] && dialogueWithoutTutorial[0].options) {
            dialogueWithoutTutorial[0].options = dialogueWithoutTutorial[0].options.filter(
                option => option.text !== "Tutorial"
            );
        }
        return dialogueWithoutTutorial;
    }
}
