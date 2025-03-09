import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components";
import {
  Home,
  Encyclopedia,
  Album,
  Map,
  TriassicInferior,
  TriassicMedio,
} from "./pages";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/album" element={<Album />} />
        <Route path="/map" element={<Map />} />
        <Route path="/triassic-inferior" element={<TriassicInferior />} />
        <Route path="/triassic-medio" element={<TriassicMedio />} />
      </Routes>
    </Router>
  );
}

export default App;
