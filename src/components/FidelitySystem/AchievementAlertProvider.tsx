import React, { useEffect, useState } from 'react';
import { useFidelityProgress } from './FidelityProgressProvider.tsx';
import { Alert } from '../Alert/Alert.tsx';
import achievementsConfigData from './data/achievements_data.json';
import { AchievementsConfig, TierType } from './types/fidelity.ts';
import { useAuth } from '../../context/Auth/AuthProvider.tsx';

interface LastAchievementState {
    achievementId: string;
    tier: TierType | null;
}

interface ShownAlert {
    achievementId: string;
    tier: TierType;
}

const achievementsConfig = achievementsConfigData as AchievementsConfig;

const SHOWN_ALERTS_KEY = 'shown_achievement_alerts';

export const AchievementAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { achievements } = useFidelityProgress();
    const { user } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState<{
        achievementId: string;
        tier: TierType;
    } | null>(null);
    const [lastAchievements, setLastAchievements] = useState<Record<string, LastAchievementState>>({});

    // Función para obtener las alertas ya mostradas del localStorage
    const getShownAlerts = (): ShownAlert[] => {
        const userId = user?.id || 'guest';
        const key = `${SHOWN_ALERTS_KEY}_${userId}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    };

    // Función para guardar una alerta como mostrada
    const saveShownAlert = (achievementId: string, tier: TierType) => {
        const userId = user?.id || 'guest';
        const key = `${SHOWN_ALERTS_KEY}_${userId}`;
        const shownAlerts = getShownAlerts();
        shownAlerts.push({ achievementId, tier });
        localStorage.setItem(key, JSON.stringify(shownAlerts));
    };

    // Función para verificar si una alerta ya fue mostrada
    const wasAlertShown = (achievementId: string, tier: TierType): boolean => {
        const shownAlerts = getShownAlerts();
        return shownAlerts.some(alert => 
            alert.achievementId === achievementId && 
            alert.tier === tier
        );
    };

    useEffect(() => {
        Object.entries(achievements).forEach(([achievementId, achievement]) => {
            const lastState = lastAchievements[achievementId];
            const currentTier = achievement.currentTier;

            if (currentTier && 
                (!lastState || lastState.tier !== currentTier) &&
                !wasAlertShown(achievementId, currentTier)) {
                
                const config = achievementsConfig[achievementId];
                if (config) {
                    setAlertInfo({
                        achievementId,
                        tier: currentTier
                    });
                    setShowAlert(true);
                    // Guardar la alerta como mostrada
                    saveShownAlert(achievementId, currentTier);
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
    }, [achievements, user?.id]);

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