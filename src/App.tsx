import "./App.css";
import AppRouter from "./AppRouter";
import { SupabaseProvider } from "./context";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
import { NavigationProvider } from './context/NavigationContext';
import { FidelityProgressProvider } from './components/FidelitySystem/FidelityProgressProvider.tsx';
import { AchievementAlertProvider } from './components/FidelitySystem/AchievementAlertProvider.tsx';
import { AnalyticsProvider } from './context/Analytics/AnalyticsProvider';

const AppContent = () => {
  return (
    <AnalyticsProvider>
      <FidelityProgressProvider>
        <AchievementAlertProvider>
          <PuzzleProvider>
            <AppRouter />
          </PuzzleProvider>
        </AchievementAlertProvider>
      </FidelityProgressProvider>
    </AnalyticsProvider>
  );
};

function App() {
  return (
    <NavigationProvider>
      <SupabaseProvider>
        <AppContent />
      </SupabaseProvider>
    </NavigationProvider>
  );
}

export default App;
