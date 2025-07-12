import { IProgressService, ProgressData } from "./types";
import initialProgress from "../../context/data/user_progress.json";

const PROGRESS_STORAGE_KEY = "dino_encyclopedia_progress";

export class LocalStorageProgressService implements IProgressService {
  async getProgress(): Promise<ProgressData> {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!storedProgress) {
        // Initialize with default progress
        const defaultProgress = initialProgress as unknown as ProgressData;
        await this.saveProgress(defaultProgress);
        return defaultProgress;
      }
      return JSON.parse(storedProgress) as ProgressData;
    } catch (error) {
      console.error("Error getting progress from localStorage:", error);
      // Return initial progress as fallback
      return initialProgress as unknown as ProgressData;
    }
  }

  async saveProgress(progress: ProgressData): Promise<void> {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress)); // 83
    } catch (error) {
      console.error("Error saving progress to localStorage:", error);
      throw error;
    }
  }

  async clearProgress(): Promise<void> {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing progress from localStorage:", error);
      throw error;
    }
  }
} 