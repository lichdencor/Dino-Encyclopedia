import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PeriodsButtonHoverProps {
  stage: string;
  label: string;
  link: string;
  dinos?: string[];
  infoOrientation?: string;
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
  stage,
  label,
  link,
  dinos,
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
                    dinos && dinos.length > 0 ?
                        <div className={`paper ${infoOrientation}`}>
                            <div className="info-triassic-dinos-container">
                                {dinos.map((dino: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`${dino} dinosaur-silhouette`}
                                    ></div>
                                ))}
                            </div>
                        </div> : null
                ]
            )}
        </div>
    );
};