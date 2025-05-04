import { XRayModal } from "../XRay/XrayModal";
import { DinosaurInfo } from "./types";

interface GalleryXRayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDinosaur: number;
  activeDinosaur: number | null;
  setActiveDinosaur: (index: number | null) => void;
  dinosaursInfo: DinosaurInfo[];
  imagePrefix: string;
  skeletonPrefix: string;
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Early" | "Medium" | "Superior" | "Late";
}

export const GalleryXRayModal = ({
  isOpen,
  onClose,
  selectedDinosaur,
  activeDinosaur,
  setActiveDinosaur,
  dinosaursInfo,
  imagePrefix,
  skeletonPrefix,
  era,
  period
}: GalleryXRayModalProps) => {
  if (!isOpen || !dinosaursInfo[selectedDinosaur]) return null;

  return (
    <XRayModal
      isOpen={isOpen}
      onClose={onClose}
      selectedDinosaur={selectedDinosaur}
      activeDinosaur={activeDinosaur}
      setActiveDinosaur={setActiveDinosaur}
      dinosaurInfo={dinosaursInfo[selectedDinosaur]}
      dinosaurImage={`${imagePrefix}${dinosaursInfo[selectedDinosaur].name}.png`}
      dinosaurBone={`${skeletonPrefix}${dinosaursInfo[selectedDinosaur].name}.png`}
      era={era}
      period={period}
    />
  );
}; 