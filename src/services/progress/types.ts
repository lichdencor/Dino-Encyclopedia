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
    era_triassic: Array<{
      name: string;
      period: string;
      dinosaurs: Array<{
        id: string;
        discovered: boolean;
        scanProgress: number;
        visibleInfo: string[];
        elapsedTime: number;
      }>;
      completed: boolean;
    }>;
    era_jurassic: Array<{
      name: string;
      period: string;
      dinosaurs: Array<{
        id: string;
        discovered: boolean;
        scanProgress: number;
        visibleInfo: string[];
        elapsedTime: number;
      }>;
      completed: boolean;
    }>;
    era_cretaceous: Array<{
      name: string;
      period: string;
      dinosaurs: Array<{
        id: string;
        discovered: boolean;
        scanProgress: number;
        visibleInfo: string[];
        elapsedTime: number;
      }>;
      completed: boolean;
    }>;
  }>;
}

export interface IProgressService {
  getProgress(): Promise<ProgressData>;
  saveProgress(progress: ProgressData): Promise<void>;
  clearProgress(): Promise<void>;
} 