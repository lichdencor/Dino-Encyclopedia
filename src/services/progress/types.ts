export interface DinosaurProgressData {
  id: string;
  name: string;
  discovered: boolean;
  scanProgress: number;
  visibleInfo: string[];
  elapsedTime: number;
  puzzlePieceFound: boolean;
}

export interface PeriodData {
  period: string;
  dinosaurs: DinosaurProgressData[];
}

export interface ProgressData {
  galleries: [{
    era_triassic: PeriodData[];
    era_jurassic: PeriodData[];
    era_cretaceous: PeriodData[];
  }];
  minigames: {
    puzzleaurus: {
      puzzles: Array<{
        id: string;
        puzzle_pieces: {
          needed: number;
          found: number;
        };
        progress: {
          total: number;
          completed: number;
        };
        best_time: number;
      }>;
      available: boolean;
      foundPieces: Array<{
        era: string;
        period: string;
        dinosaurId: string;
      }>;
    };
    memodyn: {
      levels: Array<{
        id: string;
        progress: {
          total: number;
          completed: number;
        };
        best_time: number;
      }>;
      available: boolean;
    };
  };
}

export interface IProgressService {
  getProgress(): Promise<ProgressData>;
  saveProgress(progress: ProgressData): Promise<void>;
  clearProgress(): Promise<void>;
} 