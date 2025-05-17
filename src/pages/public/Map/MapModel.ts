import {ProgressData} from "../../../services/progress/types";

export interface MapState {
    displayNames: {
        [key: string]: string[]; // key format: "era-period" (e.g., "triassic-inferior")
    };
}

export class MapModel {
    private state: MapState;
    private listeners: ((state: MapState) => void)[] = [];
    private progress: ProgressData;

    constructor(progress: ProgressData) {
        this.state = {
            displayNames: {}
        };
        this.progress = progress;
    }

    public initialize() {
        this.updateDisplayNames(this.progress);
    }

    private updateDisplayNames(progress: ProgressData) {
        if (!progress?.galleries?.[0]) return;

        const displayNames: MapState['displayNames'] = {};
        
        // Triassic Period
        displayNames['triassic-inferior'] = this.getDinosaurDisplayNamesByProgress(progress, "triassic", "inferior", [
            "Postosuchus",
            "Eoraptor",
            "Herrerasaurus"
        ]);
        
        displayNames['triassic-medium'] = this.getDinosaurDisplayNamesByProgress(progress, "triassic", "medium", [
            "Shuvosaurus",
            "Fukuiraptor",
            "Chindesaurus"
        ]);
        
        displayNames['triassic-superior'] = this.getDinosaurDisplayNamesByProgress(progress, "triassic", "superior", [
            "Coelophysis",
            "Plateosaurus",
            "Rauisuchus"
        ]);

        // Jurassic Period
        displayNames['jurassic-inferior'] = this.getDinosaurDisplayNamesByProgress(progress, "jurassic", "inferior", [
            "Dilophosaurus",
            "Compsognathus",
            "Cryolophosaurus"
        ]);
        
        displayNames['jurassic-medium'] = this.getDinosaurDisplayNamesByProgress(progress, "jurassic", "medium", [
            "Allosaurus",
            "Apatosaurus",
            "Camarasaurus"
        ]);
        
        displayNames['jurassic-superior'] = this.getDinosaurDisplayNamesByProgress(progress, "jurassic", "superior", [
            "Brachiosaurus",
            "Diplodocus",
            "Stegosaurus"
        ]);

        // Cretaceous Period
        displayNames['cretaceous-inferior'] = this.getDinosaurDisplayNamesByProgress(progress, "cretaceous", "inferior", [
            "Pachycephalosaurus",
            "Microceratus",
            "Gallimimus"
        ]);
        
        displayNames['cretaceous-medium'] = this.getDinosaurDisplayNamesByProgress(progress, "cretaceous", "medium", [
            "Spinosaurus",
            "Baryonyx",
            "Irritator"
        ]);
        
        displayNames['cretaceous-superior'] = this.getDinosaurDisplayNamesByProgress(progress, "cretaceous", "superior", [
            "Triceratops",
            "Ankylosaurus",
            "Tyrannosaurus"
        ]);

        this.state.displayNames = displayNames;
        this.notifyListeners();
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

    private getDinosaurDisplayNamesByProgress(progress: ProgressData, era: string, period: string, dinoNames: string[]): string[] {
        return dinoNames.map(dinoName => {
            if (dinoName === "Compsognathus" || dinoName === "Shuvosaurus") {
                debugger
            }
            const dinosaurProgress = this.getDinosaurProgress(progress, era, period, dinoName);
            return dinosaurProgress === 100 ? dinoName : "?";
        });
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
}
