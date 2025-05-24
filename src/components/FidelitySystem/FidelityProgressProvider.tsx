import React, { createContext, useContext, useEffect, useState } from 'react';
import achievementsConfigData from './data/achievements_data.json';
import { IFidelityRepository } from './repositories/IFidelityRepository.ts';
import { LocalStorageFidelityRepository } from './repositories/LocalStorageFidelityRepository.ts';
import { useAuth } from '../../context/Auth/AuthProvider.tsx';
import { 
    AchievementProgress, 
    AchievementsConfig,
    TierType,
    UserAchievements,
    SingleTierAchievement,
    MultiTierAchievement,
    AchievementConfig
} from './types/fidelity.ts';

interface FidelityProgressContextType {
    achievements: UserAchievements;
    updateProgress: (achievementId: string, referral: string) => Promise<void>;
    resetProgress: () => Promise<void>;
}

const FidelityProgressContext = createContext<FidelityProgressContextType | undefined>(undefined);

interface FidelityProgressProviderProps {
    children: React.ReactNode;
    repository?: IFidelityRepository;
}

const achievementsConfig = achievementsConfigData as AchievementsConfig;

const isSingleTierAchievement = (achievement: AchievementConfig): achievement is SingleTierAchievement => {
    return Object.keys(achievement.tiers).length === 1 && 'GOLD' in achievement.tiers;
};

const getMaxValue = (config: AchievementConfig): number => {
    return (config as SingleTierAchievement | MultiTierAchievement).tiers.GOLD.value;
};

export const FidelityProgressProvider: React.FC<FidelityProgressProviderProps> = ({ 
    children, 
    repository = new LocalStorageFidelityRepository()
}) => {
    const [achievements, setAchievements] = useState<UserAchievements>({});
    const { user, isAuthenticated } = useAuth();
    const isGuest = !isAuthenticated;

    const calculateTierProgress = (
        achievementId: string,
        currentValue: number
    ): Omit<AchievementProgress, 'completedReferrals'> => {
        const config = achievementsConfig[achievementId] as SingleTierAchievement | MultiTierAchievement;
        if (!config) {
            throw new Error(`Achievement ${achievementId} not found in configuration`);
        }

        const tiers: TierType[] = ['BRONZE', 'SILVER', 'GOLD'];
        let currentTier: TierType | null = null;
        let nextTier: TierType | null = null;
        let progress = 0;
        let isCompleted = false;

        if (isSingleTierAchievement(config)) {
            const goldValue = config.tiers.GOLD.value;
            currentTier = currentValue >= goldValue ? 'GOLD' : null;
            nextTier = currentValue >= goldValue ? null : 'GOLD';
            progress = Math.min((currentValue / goldValue) * 100, 100);
            isCompleted = currentValue >= goldValue;
        } else {
            const multiTierConfig = config as MultiTierAchievement;
            // Para logros con múltiples tiers
            for (let i = tiers.length - 1; i >= 0; i--) {
                const tier = tiers[i] as keyof MultiTierAchievement['tiers'];
                if (currentValue >= multiTierConfig.tiers[tier].value) {
                    currentTier = tier;
                    nextTier = i < tiers.length - 1 ? tiers[i + 1] as TierType : null;
                    break;
                }
            }

            if (!currentTier) {
                nextTier = 'BRONZE';
                progress = (currentValue / multiTierConfig.tiers.BRONZE.value) * 100;
            } else if (nextTier && nextTier in multiTierConfig.tiers) {
                const currentTierValue = multiTierConfig.tiers[currentTier as keyof MultiTierAchievement['tiers']].value;
                const nextTierValue = multiTierConfig.tiers[nextTier as keyof MultiTierAchievement['tiers']].value;
                progress = ((currentValue - currentTierValue) / (nextTierValue - currentTierValue)) * 100;
            }

            isCompleted = currentTier === 'GOLD';
        }

        return {
            currentValue,
            currentTier,
            nextTier,
            progress: Math.min(progress, 100),
            isCompleted
        };
    };

    const loadProgress = async () => {
        // Los usuarios guest siempre tienen progreso vacío
        if (isGuest || !user) {
            const emptyProgress: UserAchievements = {};
            Object.keys(achievementsConfig).forEach(achievementId => {
                emptyProgress[achievementId] = {
                    ...calculateTierProgress(achievementId, 0),
                    completedReferrals: []
                };
            });
            setAchievements(emptyProgress);
            return;
        }

        const progress = await repository.getProgress(user.id);
        const updatedAchievements: UserAchievements = {};

        // Inicializar todos los logros
        for (const achievementId of Object.keys(achievementsConfig)) {
            const currentValue = progress[achievementId]?.value || 0;
            const referrals = await repository.getReferrals(user.id, achievementId);
            updatedAchievements[achievementId] = {
                ...calculateTierProgress(achievementId, currentValue),
                completedReferrals: referrals
            };
        }

        setAchievements(updatedAchievements);
    };

    const updateProgress = async (achievementId: string, referral: string) => {
        // Los usuarios guest no pueden progresar
        if (isGuest || !user) {
            return;
        }

        const config = achievementsConfig[achievementId] as SingleTierAchievement | MultiTierAchievement;
        if (!config) {
            throw new Error(`Achievement ${achievementId} not found in configuration`);
        }

        // Verificar si el referral es válido
        if (!config.referrals.includes(referral)) {
            throw new Error(`Invalid referral "${referral}" for achievement ${achievementId}`);
        }

        // Verificar si ya completamos este referral
        if (achievements[achievementId]?.completedReferrals.includes(referral)) {
            return; // Ya completado, no hacemos nada
        }

        const currentProgress = achievements[achievementId]?.currentValue || 0;
        const maxValue = getMaxValue(config);
        if (currentProgress >= maxValue) {
            return; // Ya alcanzó el máximo, no actualizamos
        }

        // Calcular el nuevo progreso
        const newProgress = calculateTierProgress(achievementId, currentProgress + 1);

        // Guardar el progreso con el tier actual
        await repository.saveProgress(user.id, achievementId, currentProgress + 1, newProgress.currentTier, referral);

        // Actualizar el estado local
        const referrals = [...(achievements[achievementId]?.completedReferrals || []), referral];
        setAchievements(prev => ({
            ...prev,
            [achievementId]: {
                ...newProgress,
                completedReferrals: referrals
            }
        }));
    };

    const resetProgress = async () => {
        // Los usuarios guest no pueden resetear progreso
        if (isGuest || !user) {
            return;
        }

        await repository.resetProgress(user.id);
        await loadProgress();
    };

    useEffect(() => {
        loadProgress();
    }, [user?.id]); // Recargar cuando cambie el ID del usuario

    return (
        <FidelityProgressContext.Provider 
            value={{ 
                achievements,
                updateProgress,
                resetProgress
            }}
        >
            {children}
        </FidelityProgressContext.Provider>
    );
};

export const useFidelityProgress = () => {
    const context = useContext(FidelityProgressContext);
    if (context === undefined) {
        throw new Error('useFidelityProgress must be used within a FidelityProgressProvider');
    }
    return context;
}; 