import { BrowserRouter, Route } from "react-router-dom";
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
  Book,
  Library,
} from "./pages/";
import { AuthProvider } from "./context";
import { Wallet } from "./pages/public/Wallet/wallet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RoutesWithNotFound>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/album" element={<Album />} />
          <Route path="/map" element={<Map />} />
          <Route path="/store" element={<Store />} />
          <Route path="/library" element={<Library />} />
          <Route path="/book" element={<Book />} />
          <Route path="/wallet" element={<Wallet />} />

          <Route path="/memodyn" element={<MemoDyn />} />
          <Route path="/puzzleaurus" element={<Puzzleaurus />} />

          <Route path="/cretaceous-inferior" element={<CretaceousInferior />} />
          <Route path="/cretaceous-medio" element={<CretaceousMedium />} />
          <Route path="/cretaceous-superior" element={<CretaceousSuperior />} />

          <Route path="/jurassic-inferior" element={<JurassicInferior />} />
          <Route path="/jurassic-medio" element={<JurassicMedium />} />
          <Route path="/jurassic-superior" element={<JurassicSuperior />} />

          <Route path="/triassic-inferior" element={<TriassicInferior />} />
          <Route path="/triassic-medio" element={<TriassicMedium />} />
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
            path="/signin"
            element={
              <AuthProvider>
                <SignIn />
              </AuthProvider>
            }
          />
          <Route path="/pet-selection" element={<PetSelection />} />
        </RoutesWithNotFound>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
