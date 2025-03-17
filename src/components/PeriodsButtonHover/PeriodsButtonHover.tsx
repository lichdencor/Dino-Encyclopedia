import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PeriodsButtonHoverProps {
  stage: string;
  label: string;
  link: string;
  dinoCCSClass: string[];
  dinoNames: string[];
  infoOrientation?: string;
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
  stage,
  label,
  link,
  dinoCCSClass,
  dinoNames,
  infoOrientation = "right",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
      <div
          className={`period-btn ${stage} ${hovered ? "scaled" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
      >
        
        <div className={`period-btn-bg ${stage}-bg`}></div>
        {hovered && (
            [<div
                className={`info-container fade-in ${infoOrientation}`}
                onMouseEnter={() => setHovered(true)}
            >
              <div className="info-frame">
                <div className="site-description">
                  <span>{label}</span>
                </div>

                <button>
                  <Link to={link}>VISIT</Link>
                </button>
              </div>
            </div>,
            <div className={`paper ${infoOrientation}`}>
              <div className="info-triassic-dinos-container">
                {dinoCCSClass.map((dino: string, index: number) => (
                    <div className="paper-dinasaur-info-container">
                      <div
                          key={index}
                          className={`dinosaur-name`}
                      >${dinoNames[index]}</div>
                      <div
                          key={"dinosaur-silhouette-"+index}
                          className={`${dino} dinosaur-silhouette`}
                      ></div>
                    </div>
                ))}
              </div>
            </div>]
        )}
      </div>
  );
};