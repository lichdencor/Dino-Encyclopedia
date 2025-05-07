import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../../context/Progress/ProgressProvider";
import { getCurrentDinosaurProgress } from "../XRay/utils";

interface PeriodsButtonHoverProps {
    stage: string;
    era?: string;
    period?:string;
    label: string;
    link?: string;
    dinos?: string[];
    dinoNames?: string[];
    infoOrientation?: string;
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
    stage,
    era,
    period,
    label,
    link,
    dinos,
    dinoNames,
    infoOrientation = "right",
}) => {
    const [hovered, setHovered] = useState(false);
    const [showPaper, setShowPaper] = useState(false);
    const { progress } = useProgress();
    const user_progress = progress

    useEffect(() => {
        if (hovered) {
            setShowPaper(true)
        } else {
            setShowPaper(false);
        }
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
                            left: infoOrientation === 'right' ? 0 : undefined,
                            right: infoOrientation === 'right' ? undefined : 4,
                            width: infoOrientation === 'right' ? '10vh' : '10vh',
                            height: '20vh',
                            zIndex: 3
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
                                        {dinoNames.map((dinoName, index) => {
                                            const progress = getCurrentDinosaurProgress(era, user_progress, period, dinoName);
                                            const displayName = progress === 100 ? dinoName : "?";
                                            return (
                                                <div key={index} className="dinosaurName">{displayName}</div>
                                            );
                                        })}
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
