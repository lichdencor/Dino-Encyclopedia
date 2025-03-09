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
        <Route path="/triassic-inferior" element={<TriassicInferior />} />
        <Route path="/triassic-medio" element={<TriassicMedio />} />
        <Route path="/login" element={<Login />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
