interface GalleryDinosaursProps {
  customStyles: {
    "dinosaur-bg-1": string;
    "dinosaur-bg-2": string;
    "dinosaur-bg-3": string;
    dinosaur: string;
    "dinosaur-1": string;
    "dinosaur-2": string;
    "dinosaur-3": string;
  };
  onDinosaurClick: (index: number) => void;
}

export const GalleryDinosaurs = ({ customStyles, onDinosaurClick }: GalleryDinosaursProps) => {
  return (
    <>
      {[customStyles["dinosaur-bg-1"], customStyles["dinosaur-bg-2"], customStyles["dinosaur-bg-3"]].map((bgClass, index) => {
        const dinosaurNumber = `dinosaur-${index + 1}` as keyof typeof customStyles;
        return (
          <div
            key={index}
            className={bgClass}
            onClick={() => onDinosaurClick(index)}
          >
            <div className={`${customStyles.dinosaur} ${customStyles[dinosaurNumber]}`}></div>
          </div>
        );
      })}
    </>
  );
}; 