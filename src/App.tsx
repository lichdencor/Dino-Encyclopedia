import "./App.css";
import AppRouter from "./AppRouter";
import { SupabaseProvider } from "./context";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
import React, { useContext } from 'react';
import { NavigationProvider } from './context/NavigationContext';
import { FidelityProgressProvider } from './components/context/FidelityProgressProvider';
import { AuthContext } from './context/Auth/AuthContext';

const AppContent = () => {
  const auth = useContext(AuthContext);

  return (
    <FidelityProgressProvider userId={auth?.user?.uid || 'guest'}>
      <PuzzleProvider>
        <AppRouter />
      </PuzzleProvider>
    </FidelityProgressProvider>
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
