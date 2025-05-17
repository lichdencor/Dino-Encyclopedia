import React, { useState, useEffect } from "react";

interface PeriodsButtonHoverProps {
    stage: string;
    label: string;
    link?: string;
    dinos?: string[];
    displayNames?: string[];
    infoOrientation?: string;
    onNavigate?: (route: string) => void;
}

export const PeriodsButtonHover: React.FC<PeriodsButtonHoverProps> = ({
    stage,
    label,
    link,
    dinos,
    displayNames,
    infoOrientation = "right",
    onNavigate
}) => {
    const [hovered, setHovered] = useState(false);
    const [showPaper, setShowPaper] = useState(false);

    useEffect(() => {
        if (hovered) {
            setShowPaper(true)
        } else {
            setShowPaper(false);
        }
    }, [hovered]);

    const handleNavigate = () => {
        if (link && onNavigate) {
            onNavigate(link);
        }
    };

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
                                    <button className="visitBtn" onClick={handleNavigate}>
                                        <div className="linkVisitBtn">VISIT</div>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    {dinos && dinos.length > 0 && displayNames && (
                        <div className={`paperContainer ${infoOrientation} ${!showPaper ? "hidden" : ""}`}>
                            <div className="paper">
                                <div className="dinosaurInfo">
                                    <div className="dinosaurNames">
                                        {displayNames.map((displayName, index) => (
                                            <div key={index} className="dinosaurName">{displayName}</div>
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
