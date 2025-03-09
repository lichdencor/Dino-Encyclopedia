import "../Era/Era.css";

import { Nav } from "../../components";

export const TriassicInferior = () => {
  return (
    <div>
      <Nav />
      <div className="triassic-inferior-bg">
        <div className="arrow-previous">
          <a href="map.html">.</a>
        </div>
        <div className="dinosaur-card dino1"></div>
        <div className="dinosaur-card dino2"></div>
        <div className="dinosaur-card dino3"></div>
        <div className="arrow-next">
          <a href="triassic-medium.html">.</a>
        </div>
      </div>
    </div>
  );
};
