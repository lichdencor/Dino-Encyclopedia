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
};

export interface PuzzlePieceProps {
  position: { left: number; top: number };
  isVisible: boolean;
  showAlert: boolean;
  onMouseEnter: () => void;
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
}

export interface ProgressBarProps {
  progress: number;
} 