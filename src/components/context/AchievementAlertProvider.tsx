import React, { useEffect, useState } from 'react';
import { useFidelityProgress } from './FidelityProgressProvider';
import { Alert } from '../Alert/Alert';
import achievementsConfigData from './data/achievements_config.json';
import { AchievementsConfig, TierType } from './types/fidelity';

interface LastAchievementState {
    achievementId: string;
    tier: TierType | null;
}

const achievementsConfig = achievementsConfigData as AchievementsConfig;

export const AchievementAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { achievements } = useFidelityProgress();
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState<{
        achievementId: string;
        tier: TierType;
    } | null>(null);
    const [lastAchievements, setLastAchievements] = useState<Record<string, LastAchievementState>>({});

    useEffect(() => {
        Object.entries(achievements).forEach(([achievementId, achievement]) => {
            const lastState = lastAchievements[achievementId];
            const currentTier = achievement.currentTier;

            if (currentTier && 
                (!lastState || lastState.tier !== currentTier)) {
                
                const config = achievementsConfig[achievementId];
                if (config) {
                    setAlertInfo({
                        achievementId,
                        tier: currentTier
                    });
                    setShowAlert(true);
                }
            }

            setLastAchievements(prev => ({
                ...prev,
                [achievementId]: {
                    achievementId,
                    tier: currentTier
                }
            }));
        });
    }, [achievements]);

    const handleAlertClose = () => {
        setShowAlert(false);
        setAlertInfo(null);
    };

    const getImagePath = (achievementId: string, tier: TierType) => {
        const formattedId = achievementId.replace(/_/g, '-');
        return `/assets/img/achievements/${tier.toLowerCase()}/achievement-${formattedId}-${tier.toLowerCase()}.png`;
    };

    return (
        <>
            {children}
            {showAlert && alertInfo && (
                <Alert
                    onClose={handleAlertClose}
                    imageSrc={getImagePath(alertInfo.achievementId, alertInfo.tier)}
                    messageText={`¡Congratulations! You've unlocked a new level in ${achievementsConfig[alertInfo.achievementId].title}`}
                    spanText={`You've reached level ${alertInfo.tier} in this achievement`}
                />
            )}
        </>
    );
}; 