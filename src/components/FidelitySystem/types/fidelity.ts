export type TierType = 'BRONZE' | 'SILVER' | 'GOLD';

export interface TierConfig {
    value: number;
}

interface BaseAchievement {
    title: string;
    short_description: string;
    long_description: string;
    referrals: string[];
}

export interface SingleTierAchievement extends BaseAchievement {
    tiers: {
        GOLD: TierConfig;
    };
}

export interface MultiTierAchievement extends BaseAchievement {
    tiers: {
        BRONZE: TierConfig;
        SILVER: TierConfig;
        GOLD: TierConfig;
    };
}

export type AchievementConfig = SingleTierAchievement | MultiTierAchievement;

export interface AchievementProgress {
    currentValue: number;
    currentTier: TierType | null;
    nextTier: TierType | null;
    progress: number; // Percentage to next tier
    isCompleted: boolean;
    completedReferrals: string[];
}

export type AchievementsConfig = Record<string, AchievementConfig>;
export type UserAchievements = Record<string, AchievementProgress>; 