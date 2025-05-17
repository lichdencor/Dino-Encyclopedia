export type DinosaurProgress = {
  id: string;
  discovered: boolean;
  scanProgress: number;
  visibleInfo: string[];
  elapsedTime: number;
  puzzlePieceFound: boolean;
};

export type DinosaurInfo = {
  name: string;
  nombreCientifico: string;
  altura: string;
  peso: string;
  clasificacion: string;
  dieta: string;
  velocidad: string;
  caracteristicas: string;
  naturaleza: string;
  fosiles: string;
  sociabilidad: string;
  relacionEvolutiva: string;
};

export type XRayModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDinosaur: number | null;
  activeDinosaur: number | null;
  setActiveDinosaur: (index: number | null) => void;
  dinosaurInfo: DinosaurInfo;
  dinosaurImage: string;
  dinosaurBone: string;
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Inferior" | "Medium" | "Superior";
  scanThreshold?: number;
  onScanComplete?: (dinosaurInfo: DinosaurInfo) => void;
};

export interface PuzzlePieceProps {
  position: { 
    left: number; 
    top: number; 
  };
  showAlert: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface DinosaurViewerProps {
  selectedDinosaur: number;
  activeDinosaur: number | null;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
  dinosaurImage: string;
  dinosaurBone: string;
}

export interface InfoListProps {
  dinosaurInfo: DinosaurInfo;
  elapsedTime: number;
  visibleInfo: string[];
  onInfoVisibilityChange: (newVisibleInfo: string[]) => void;
}

export interface ProgressBarProps {
  progress: number;
  puzzlePieceFound: boolean;
}

export type PuzzlePieceLocation = {
  era: string;
  period: string;
  dinosaurId: string;
};

export type PuzzleaurusProgress = {
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
  foundPieces: PuzzlePieceLocation[];
}; 