import { Route } from "react-router-dom";
import { RoutesWithNotFound, ErrorBoundary } from "./components";
import {
  LandingPage,
  Album,
  Map,
  TriassicInferior,
  TriassicMedium,
  TriassicSuperior,
  CretaceousInferior,
  CretaceousMedium,
  CretaceousSuperior,
  JurassicInferior,
  JurassicMedium,
  JurassicSuperior,
  Login,
  PetSelection,
  MemoDyn,
  Minijuegos,
  Puzzleaurus,
  Store,
  Library,
  Tips,
  Wallet,
  Register,
  RecuperarContrasenia
} from "./pages/";
import { useAuth } from "./context";
import { Profile } from "./pages/public/Profile/Profile";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
import { PublicGuard } from "./guard/PublicGuard";
import { PrivateGuard } from "./guard/PrivateGuard";
import Reading from "./pages/public/Reading/Reading.tsx";
import { usePageTracking } from "./hooks/usePageTracking";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  usePageTracking();

  return (
    <ErrorBoundary>
      <RoutesWithNotFound>
        <Route path="/login" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Login />
          </PublicGuard>
        } />
        <Route path="/register" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Register />
          </PublicGuard>
        } />
        <Route path="/recovery-password" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <RecuperarContrasenia />
          </PublicGuard>
        } />

        <Route path="/" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <LandingPage />
          </PrivateGuard>
        } />

        <Route path="/games" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <PuzzleProvider>
              <Minijuegos />
            </PuzzleProvider>
          </PrivateGuard>
        } />

        <Route path="/album" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Album />
          </PrivateGuard>
        } />

        <Route path="/map" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Map />
          </PrivateGuard>
        } />

        <Route path="/store" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Store />
          </PrivateGuard>
        } />

        <Route path="/library" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Library />
          </PrivateGuard>
        } />

        <Route
          path="/reading/:bookId"
          element={
            <PrivateGuard isAuthenticated={isAuthenticated}>
              <Reading />
            </PrivateGuard>
          }
        />

        <Route path="/wallet" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Wallet />
          </PrivateGuard>
        } />

        <Route path="/tips" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Tips />
          </PrivateGuard>
        } />

        <Route path="/profile" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Profile />
          </PrivateGuard>
        } />

        <Route path="/memodyn" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <MemoDyn />
          </PrivateGuard>
        } />

        <Route path="/puzzleaurus" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <Puzzleaurus />
          </PrivateGuard>
        } />

        <Route path="/cretaceous-inferior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <CretaceousInferior />
          </PrivateGuard>
        } />

        <Route path="/cretaceous-medium" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <CretaceousMedium />
          </PrivateGuard>
        } />

        <Route path="/cretaceous-superior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <CretaceousSuperior />
          </PrivateGuard>
        } />

        <Route path="/jurassic-inferior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <JurassicInferior />
          </PrivateGuard>
        } />

        <Route path="/jurassic-medium" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <JurassicMedium />
          </PrivateGuard>
        } />

        <Route path="/jurassic-superior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <JurassicSuperior />
          </PrivateGuard>
        } />

        <Route path="/triassic-inferior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <TriassicInferior />
          </PrivateGuard>
        } />

        <Route path="/triassic-medium" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <TriassicMedium />
          </PrivateGuard>
        } />

        <Route path="/triassic-superior" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <TriassicSuperior />
          </PrivateGuard>
        } />

        <Route path="/pet-selection" element={
          <PrivateGuard isAuthenticated={isAuthenticated}>
            <PetSelection />
          </PrivateGuard>
        } />
      </RoutesWithNotFound>
    </ErrorBoundary>
  );
};

export default AppRouter;
