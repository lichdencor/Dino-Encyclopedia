import "./App.css";
import AppRouter from "./AppRouter";
import { SupabaseProvider } from "./context";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";

function App() {
  return (
    <SupabaseProvider>
      <PuzzleProvider>
        <AppRouter />
      </PuzzleProvider>
    </SupabaseProvider>
  );
}

export default App;
