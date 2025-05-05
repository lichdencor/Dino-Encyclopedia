import { Route } from "react-router-dom";
import { RoutesWithNotFound, ErrorBoundary } from "./components";
import {
  Home,
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
  Games,
  Puzzleaurus,
  Store,
  Library,
  AdsPage,
  Wallet,
  Register,
  RecoveryPassword
} from "./pages/";
import { AuthProvider, AdsProvider } from "./context";
import { Profile } from "./pages/public/Profile/Profile";
import { PuzzleProvider } from "./context/Puzzle/PuzzleContext";
const AppRouter = () => {
  return (
    <ErrorBoundary>
      <AdsProvider>
        <RoutesWithNotFound>
          <Route path="/" element={<Home />} />

          <Route path="/games" element={ 
            <PuzzleProvider>
              <Games />
            </PuzzleProvider>
            } />
          <Route path="/album" element={<Album />} />
          <Route path="/map" element={<Map />} />
          <Route path="/store" element={<Store />} />
          <Route path="/library" element={<Library />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/memodyn" element={<MemoDyn />} />
          <Route path="/puzzleaurus" element={<Puzzleaurus />} />

          <Route path="/cretaceous-inferior" element={<CretaceousInferior />} />
          <Route path="/cretaceous-medium" element={<CretaceousMedium />} />
          <Route path="/cretaceous-superior" element={<CretaceousSuperior />} />

          <Route path="/jurassic-inferior" element={<JurassicInferior />} />
          <Route path="/jurassic-medium" element={<JurassicMedium />} />
          <Route path="/jurassic-superior" element={<JurassicSuperior />} />

          <Route path="/triassic-inferior" element={<TriassicInferior />} />
          <Route path="/triassic-medium" element={<TriassicMedium />} />
          <Route path="/triassic-superior" element={<TriassicSuperior />} />

          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />

          <Route
            path="/register"
            element={
              <AuthProvider>
                <Register />
              </AuthProvider>
            }
          />

          <Route
            path="/recovery-password"
            element={
              <AuthProvider>
                <RecoveryPassword />
              </AuthProvider>
            }
          />
          {/* Ruta para el inicio de sesión deprecada
          <Route
            path="/signin"
            element={
              <AuthProvider>
                <SignIn />
              </AuthProvider>
            }
          />*/}

          <Route path="/pet-selection" element={<PetSelection />} />
        </RoutesWithNotFound>
      </AdsProvider>
    </ErrorBoundary>
  );
};

export default AppRouter;
