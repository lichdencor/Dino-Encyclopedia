import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PeriodsButtonHoverProps {
    stage: string;
    label: string;
    link?: string;
    dinos?: string[];
    dinoNames?: string[];
    infoOrientation?: string;
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
    stage,
    label,
    link,
    dinos,
    dinoNames,
    infoOrientation = "right",
}) => {
    const [hovered, setHovered] = useState(stage === "stage-1");
    const [showPaper, setShowPaper] = useState(stage === "stage-1");

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (hovered) {
            timeout = setTimeout(() => setShowPaper(true), 20);
        } else {
            setShowPaper(false);
        }
        return () => clearTimeout(timeout);
    }, [hovered]);

    return (
        <div
            className={`period-btn ${stage} ${hovered ? "scaled" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={`period-btn-bg ${stage}-bg`}></div>
            {hovered && (
                <>
                    <div
                        className="hover-area"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '10vh',
                            height: '20vh',
                            zIndex: 1
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div
                            className={`info-container fade-in ${infoOrientation}`}
                            style={{ position: 'absolute', zIndex: 2 }}
                        >
                            <div className="info-frame">
                                <div className="site-description">
                                    <span>{label}</span>
                                </div>
                                {link &&
                                    <button className="visitBtn">
                                        <Link to={link} className="linkVisitBtn">VISIT</Link>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    {dinos && dinos.length > 0 && dinoNames && (
                        <div className={`paperContainer ${infoOrientation} ${!showPaper ? "hidden" : ""}`}>
                            <div className="paper">
                                <div className="dinosaurInfo">
                                    <div className="dinosaurNames">
                                        {dinoNames.map((dinoName, index) => (
                                            <div key={index} className="dinosaurName">{dinoName}</div>
                                        ))}
                                    </div>
                                    <div className="dinosaurImg">
                                        {dinos.map((dino, index) => (
                                            <div
                                                key={index}
                                                className={`${dino} dinosaur-silhouette`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
