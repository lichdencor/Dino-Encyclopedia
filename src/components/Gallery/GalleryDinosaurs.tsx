interface GalleryDinosaursProps {
  customStyles: {
    dinosaurBg1: string;
    dinosaurBg2: string;
    dinosaurBg3: string;
    dinosaur: string;
    dinosaur1: string;
    dinosaur2: string;
    dinosaur3: string;
  };
  onDinosaurClick: (index: number) => void;
}

export const GalleryDinosaurs = ({ customStyles, onDinosaurClick }: GalleryDinosaursProps) => {
  return (
    <>
      {[customStyles.dinosaurBg1, customStyles.dinosaurBg2, customStyles.dinosaurBg3].map((bgClass, index) => {
        const dinosaurNumber = `dinosaur${index + 1}` as keyof typeof customStyles;
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