import { IProgressService, ProgressData } from "./types";

const PROGRESS_STORAGE_KEY = "dino_encyclopedia_progress";

export class LocalStorageProgressService implements IProgressService {
  async getProgress(): Promise<ProgressData> {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!storedProgress) {
        throw new Error("No progress found");
      }
      return JSON.parse(storedProgress) as ProgressData;
    } catch (error) {
      console.error("Error getting progress from localStorage:", error);
      throw error;
    }
  }

  async saveProgress(progress: ProgressData): Promise<void> {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
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