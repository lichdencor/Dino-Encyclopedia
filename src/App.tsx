import "./App.css";
import AppRouter from "./AppRouter";
import { SupabaseProvider } from "./context";

function App() {
  return (
    <SupabaseProvider>
      <AppRouter />
    </SupabaseProvider>
  );
}

export default App;
