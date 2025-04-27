import { createContext, useContext, useState, ReactNode } from "react";
import initialProgress from "../data/user_progress.json";

type ProgressType = typeof initialProgress;

interface ProgressContextType {
    progress: ProgressType;
    setProgress: (newProgress: ProgressType) => void;
    getProgress: () => ProgressType;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
    const [progress, updateProgress] = useState<ProgressType>(initialProgress);

    const setProgress = (newProgress: ProgressType) => {
        updateProgress(newProgress);
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
        throw new Error("No hay context.");
    }
    return context;
};
