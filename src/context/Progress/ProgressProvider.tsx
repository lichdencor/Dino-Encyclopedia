import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import initialProgress from "../data/user_progress.json";
import { ProgressServiceFactory } from "../../services/progress/ProgressServiceFactory";
import { ProgressData } from "../../services/progress/types";

type ProgressContextType = {
    progress: ProgressData;
    setProgress: (newProgress: ProgressData) => void;
    getProgress: () => ProgressData;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
    const [progress, updateProgress] = useState<ProgressData>(initialProgress as unknown as ProgressData);
    const progressService = ProgressServiceFactory.getInstance().getService();

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const savedProgress = await progressService.getProgress();
                if (savedProgress) {
                    updateProgress(savedProgress);
                }
            } catch (error) {
                console.error("Error loading progress:", error);
                // Keep using initial progress if loading fails
            }
        };
        loadProgress();
    }, []);

    const setProgress = async (newProgress: ProgressData) => {
        try {
            await progressService.saveProgress(newProgress);
            updateProgress(newProgress);
        } catch (error) {
            console.error("Error saving progress:", error);
            // Still update state even if save fails
            updateProgress(newProgress);
        }
    };

    const getProgress = () => {
        return progress;
    };

    return (
        <ProgressContext.Provider value={{ progress, setProgress, getProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
};
