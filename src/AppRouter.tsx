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
  SignIn,
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
import { AuthProvider, useAuth } from "./context";
import { Profile } from "./pages/public/Profile/Profile";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
import { PublicGuard } from "./guard/PublicGuard";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <RoutesWithNotFound>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery-password" element={<RecuperarContrasenia />} />

        <Route path="/" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <LandingPage />
          </PublicGuard>
        } />

        <Route path="/games" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <PuzzleProvider>
              <Minijuegos />
            </PuzzleProvider>
          </PublicGuard>
        } />

        <Route path="/album" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Album />
          </PublicGuard>
        } />

        <Route path="/map" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Map />
          </PublicGuard>
        } />

        <Route path="/store" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Store />
          </PublicGuard>
        } />

        <Route path="/library" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Library />
          </PublicGuard>
        } />

        <Route path="/wallet" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Wallet />
          </PublicGuard>
        } />

        <Route path="/tips" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Tips />
          </PublicGuard>
        } />

        <Route path="/profile" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Profile />
          </PublicGuard>
        } />

        <Route path="/memodyn" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <MemoDyn />
          </PublicGuard>
        } />

        <Route path="/puzzleaurus" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <Puzzleaurus />
          </PublicGuard>
        } />

        <Route path="/cretaceous-inferior" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <CretaceousInferior />
          </PublicGuard>
        } />

        <Route path="/cretaceous-medium" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <CretaceousMedium />
          </PublicGuard>
        } />

        <Route path="/cretaceous-superior" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <CretaceousSuperior />
          </PublicGuard>
        } />

        <Route path="/jurassic-inferior" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <JurassicInferior />
          </PublicGuard>
        } />

        <Route path="/jurassic-medium" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <JurassicMedium />
          </PublicGuard>
        } />

        <Route path="/jurassic-superior" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <JurassicSuperior />
          </PublicGuard>
        } />

        <Route path="/triassic-medium" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <TriassicMedium />
          </PublicGuard>
        } />

        <Route path="/triassic-superior" element={
          <PublicGuard isAuthenticated={isAuthenticated}>
            <TriassicSuperior />
          </PublicGuard>
        } />

        <Route path="/pet-selection" element={<PetSelection />} />
      </RoutesWithNotFound>
    </ErrorBoundary>
  );
};

export default AppRouter;
