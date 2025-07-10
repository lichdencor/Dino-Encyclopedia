import { IFidelityRepository } from './IFidelityRepository.ts';

export class LocalStorageFidelityRepository implements IFidelityRepository {
    private getProgressKey(userId: string): string {
        return `fidelity_progress_${userId}`;
    }

    private getReferralsKey(userId: string, achievementId: string): string {
        return `fidelity_referrals_${userId}_${achievementId}`;
    }

    async getProgress(userId: string): Promise<Record<string, { value: number; tier: string | null }>> {
        const stored = localStorage.getItem(this.getProgressKey(userId));
        return stored ? JSON.parse(stored) : {};
    }

    async getReferrals(userId: string, achievementId: string): Promise<string[]> {
        const stored = localStorage.getItem(this.getReferralsKey(userId, achievementId));
        return stored ? JSON.parse(stored) : [];
    }

    async saveProgress(userId: string, achievementId: string, _value: number, tier: string | null, referral: string): Promise<void> {
        // Verificar si este referral ya fue usado
        const referrals = await this.getReferrals(userId, achievementId);
        if (referrals.includes(referral)) {
            return; // Si ya fue usado, no hacemos nada
        }

        // Guardar el nuevo referral
        referrals.push(referral);
        localStorage.setItem(this.getReferralsKey(userId, achievementId), JSON.stringify(referrals));

        // Actualizar el progreso
        const progress = await this.getProgress(userId);
        progress[achievementId] = {
            value: (progress[achievementId]?.value || 0) + 1,
            tier
        };
        localStorage.setItem(this.getProgressKey(userId), JSON.stringify(progress));
    }

    async resetProgress(userId: string): Promise<void> {
        // Obtener todas las keys que empiezan con fidelity_ para este usuario
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key === this.getProgressKey(userId) || key.startsWith(`fidelity_referrals_${userId}`))) {
                keysToRemove.push(key);
            }
        }
        
        // Eliminar todas las keys encontradas
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
} 