import { PUZZLE_PIECE_DETECTION_RADIUS } from './constants';
import { ProgressData } from '../../services/progress/types';

export const updateCursorPosition = (
  event: React.MouseEvent<HTMLDivElement>,
  rect: DOMRect,
  element: HTMLElement
) => {
  const x_percent = ((event.clientX - rect.left) / rect.width) * 100;
  const y_percent = ((event.clientY - rect.top) / rect.height) * 100;
  element.style.setProperty("--cursor-x", `${x_percent}%`);
  element.style.setProperty("--cursor-y", `${y_percent}%`);
};

export const checkPuzzlePieceProximity = (
  event: React.MouseEvent<HTMLDivElement>,
  rect: DOMRect,
  piecePosition: { left: number; top: number }
) => {
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const pieceX = rect.width * piecePosition.left;
  const pieceY = rect.height * piecePosition.top;

  const distance = Math.sqrt(
    Math.pow(mouseX - pieceX, 2) + Math.pow(mouseY - pieceY, 2)
  );

  return distance < PUZZLE_PIECE_DETECTION_RADIUS;
};

export const isPointInRect = (x: number, y: number, rect: DOMRect) => {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}; 

export const getCurrentDinosaurProgress = (
  era: string,
  progress: ProgressData,
  period: string,
  selectedDinosaur: number | null
) => {
  // Safety check
  if (
    !progress ||
    !progress.galleries ||
    !Array.isArray(progress.galleries) ||
    !progress.galleries[0]
  ) {
    return 0;
  }

  const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
  const periodData = progress.galleries[0][eraKey]?.find(
    (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
  );

  if (periodData && selectedDinosaur !== null) {
    const dinosaur = periodData.dinosaurs[selectedDinosaur];
    return dinosaur?.scanProgress || 0;
  }
  return 0;
};