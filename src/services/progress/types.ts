type PeriodData = {
  name: string;
  period: string;
  dinosaurs: Array<{
    id: string;
    discovered: boolean;
    scanProgress: number;
    visibleInfo: string[];
    elapsedTime: number;
    puzzlePieceFound: boolean;
  }>;
  completed: boolean;
  hoveredCurtains: {
    curtain1: boolean;
    curtain2: boolean;
    curtain3: boolean;
  };
};

export type ProgressData = {
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
  galleries: Array<{
    era_triassic: Array<PeriodData>;
    era_jurassic: Array<PeriodData>;
    era_cretaceous: Array<PeriodData>;
  }>;
}

export interface IProgressService {
  getProgress(): Promise<ProgressData>;
  saveProgress(progress: ProgressData): Promise<void>;
  clearProgress(): Promise<void>;
} 