import React, { useState } from "react";
import styles from './PeriodsButtonPremium.module.css';

interface PeriodsButtonPremiumProps {
    stage: string;
    label: string;
    link?: string;
    dinos?: string[];
    infoOrientation?: string;
}

export const PeriodsButtonPremium: React.FC<PeriodsButtonPremiumProps> = ({
    stage,
    label,
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
                        style={{
                            position: 'absolute',
                            zIndex: 2
                        }}
                    >
                        <div className="info-frame">
                            <div className="site-description">
                                <span>{label}</span>
                            </div>
                            <div className={styles.galleryInfo}>
                            <div className={styles.alertContainer}>
                                <div className={styles.alertBg}></div>
                                <img src="/public/assets/img/lock/lock.png" alt="lock" className={styles.lock} />
                                </div>
                                <p className={styles.alertText}>¡Canjeá tu acceso premium en la tienda!</p>
                            </div>
                        </div>
                    </div>
                </div>,
                dinos && dinos.length > 0 ?
                    <div className={`paperContainer ${infoOrientation}`}>
                        <div className="paper">
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