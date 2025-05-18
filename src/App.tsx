import "./App.css";
import AppRouter from "./AppRouter";
import { SupabaseProvider } from "./context";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
import React from 'react';
import { NavigationProvider } from './context/NavigationContext';

function App() {
  return (
    <NavigationProvider>
      <SupabaseProvider>
        <PuzzleProvider>
          <AppRouter />
        </PuzzleProvider>
      </SupabaseProvider>
    </NavigationProvider>
  );
}

export default App;
