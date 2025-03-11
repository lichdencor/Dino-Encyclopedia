import { BrowserRouter, Route } from "react-router-dom";
import { Nav } from "./components/";
import { RoutesWithNotFound } from "./components/";
import {
  Home,
  Encyclopedia,
  Album,
  Map,
  TriassicInferior,
  TriassicMedio,
  TriassicSuperior,
  CretaceousInferior,
  CretaceousMedio,
  CretaceousSuperior,
  JurassicInferior,
  JurassicMedio,
  JurassicSuperior,
  Login,
} from "./pages/";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Nav />
      <RoutesWithNotFound>
        <Route path="/" element={<Home />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/album" element={<Album />} />
        <Route path="/map" element={<Map />} />

        <Route path="/cretaceous-inferior" element={<CretaceousInferior />} />
        <Route path="/cretaceous-medio" element={<CretaceousMedio />} />
        <Route path="/cretaceous-superior" element={<CretaceousSuperior />} />

        <Route path="/jurassic-inferior" element={<JurassicInferior />} />
        <Route path="/jurassic-medio" element={<JurassicMedio/>} />
        <Route path="/jurassic-superior" element={<JurassicSuperior />} />

        <Route path="/triassic-inferior" element={<TriassicInferior />} />
        <Route path="/triassic-medio" element={<TriassicMedio />} />
        <Route path="/triassic-superior" element={<TriassicSuperior />} />

        <Route path="/login" element={<Login />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
