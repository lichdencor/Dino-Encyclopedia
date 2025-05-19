import { DinosaurModel, DinosaurInfo } from '../models/PeriodModel';
import { ProgressData } from '../services/progress/types';

/**
 * Creates a DinosaurModel instance with progress tracking information.
 * @param dinoData The dinosaur information data
 * @param progress The current progress data
 * @returns A new DinosaurModel instance with progress information
 */
export const createDinosaurModel = (
    dinoData: DinosaurInfo & { id: string },
    progress: ProgressData
): DinosaurModel => {
    // Safety check for progress data structure
    if (!progress?.galleries?.[0]) {
        return new DinosaurModel(dinoData, false, false, 0);
    }

    // Find the dinosaur's progress data across all eras
    let dinosaurProgress = {
        discovered: false,
        scanProgress: 0,
        puzzlePieceFound: false,
        visibleInfo: [] as string[],
        elapsedTime: 0
    };

    // Search through all eras
    const eras = ['triassic', 'jurassic', 'cretaceous'];
    for (const era of eras) {
        const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
        const eraData = progress.galleries[0][eraKey];

        if (!Array.isArray(eraData)) continue;

        // Search through all periods in the era
        for (const periodData of eraData) {
            const dinosaur = periodData.dinosaurs.find(d => d.id === dinoData.id);
            if (dinosaur) {
                dinosaurProgress = {
                    discovered: dinosaur.discovered,
                    scanProgress: dinosaur.scanProgress,
                    visibleInfo: dinosaur.visibleInfo,
                    elapsedTime: dinosaur.elapsedTime,
                    puzzlePieceFound: dinosaur.puzzlePieceFound
                };
                break;
            }
        }
    }

    // Check if puzzle piece is found in the minigames data
    const puzzlePieceFound = progress.minigames?.puzzleaurus?.foundPieces?.some(
        piece => piece.dinosaurId === dinoData.id
    ) || false;

    // Create and return the DinosaurModel with the found progress
    return new DinosaurModel(
        dinoData,
        dinosaurProgress.discovered,
        puzzlePieceFound || dinosaurProgress.puzzlePieceFound,
        dinosaurProgress.scanProgress
    );
}; 