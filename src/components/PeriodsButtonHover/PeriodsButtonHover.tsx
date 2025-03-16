import { useState } from "react";
import { Link } from "react-router-dom";

interface PeriodsButtonHoverProps {
  stage: string;
  label: string;
  link: string;
  description: string;
  dinos: string[];
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
  stage,
  label,
  link,
  description,
  dinos,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`period-btn ${stage} ${hovered ? "scaled" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>{label}</div>
      <div className={`period-btn-bg ${stage}-bg`}></div>
      {hovered && (
        <div
          className="info-container fade-in"
          onMouseEnter={() => setHovered(true)}
        >
          <div className="info-frame">
            <div className="site-description">
              <span>{label}</span>
              <p>{description}</p>
            </div>
            <div className="info-triassic-dinos-container">
              {dinos.map((dino: string, index: number) => (
                <div
                  key={index}
                  className={`${dino} dinosaur-silhouette`}
                ></div>
              ))}
            </div>
            <button>
              <Link to={link}>{label}</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
