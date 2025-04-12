import { BrowserRouter, Route } from "react-router-dom";
import { RoutesWithNotFound, ErrorBoundary } from "./components";
import {
  Home,
  Encyclopedia,
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
} from "./pages/";
import { AuthProvider } from "./context";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RoutesWithNotFound>
          <Route path="/" element={<Home />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/album" element={<Album />} />
          <Route path="/map" element={<Map />} />

          <Route path="/memodyn" element={<MemoDyn />} />

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
