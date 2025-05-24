export interface IFidelityRepository {
    getProgress: (userId: string) => Promise<Record<string, { value: number; tier: string | null }>>;
    saveProgress: (userId: string, achievementId: string, value: number, tier: string | null, referral: string) => Promise<void>;
    resetProgress: (userId: string) => Promise<void>;
    getReferrals: (userId: string, achievementId: string) => Promise<string[]>;
} 