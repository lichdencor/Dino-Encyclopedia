import "./Map.css";
import { Nav } from "../../../components/";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Map = () => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
      <div className="map-background">
        <Nav />
        <header>HEADER</header>
        <div className="era-map">
          <div className="period-title-frame period-1">Triassic<br />Period</div>
          <div className="period-title-frame period-2">Jurassic<br />Period</div>
          <div className="period-title-frame period-3">Cretaceous<br />Period</div>

          <div className="user-character"></div>
          <div
              className={`period-btn stage-1 ${hoveredStage === "stage-1" ? "scaled" : ""}`}
              onMouseEnter={() => setHoveredStage("stage-1")}
              onMouseLeave={() => setHoveredStage(null)}
          >
            <div>inferior</div>
            <div className="period-btn-bg stage-1-bg"></div>
            {hoveredStage === "stage-1" && (
                <div className="info-container fade-in"
                     onMouseEnter={() => setHoveredStage("stage-1")}
                >
                  <div className="info-frame">
                    <div className="site-description">
                    <span>Sala 1</span>
                    <p>Hacé click para conocer a los dinosaurios: Dino, Dino, Dino</p>
                    </div>
        
                    
                    <button><Link to="/triassic-inferior">inferior</Link></button>
                  </div>
                  <div className="paper">
                  <div className="info-triassic-dinos-container">
                      <div className="info-triassic-dino-1 dinosaur-silhouette"></div>
                      <div className="info-triassic-dino-2 dinosaur-silhouette"></div>
                      <div className="info-triassic-dino-3 dinosaur-silhouette"></div>
                    </div>
                  </div>
                </div>

                
            )}
          </div>
          <div className="period-btn stage-2">
            <Link to="/triassic-medio">medium</Link>
            <div className="period-btn-bg stage-1-bg"></div>
          </div>
          <div className="period-btn stage-3">
            <Link to="/triassic-superior">superior</Link>
            <div className="period-btn-bg stage-1-bg"></div>
          </div>
          <div className="period-btn stage-4">
            <Link to="/jurassic-inferior">inferior</Link>
            <div className="period-btn-bg stage-2-bg"></div>
          </div>
          <div className="period-btn stage-5">
            <Link to="/jurassic-medio">medium</Link>
            <div className="period-btn-bg stage-2-bg"></div>
          </div>
          <div className="period-btn stage-6">
            <Link to="/jurassic-superior">superior</Link>
            <div className="period-btn-bg stage-2-bg"></div>
          </div>
          <div className="period-btn stage-7">
            <Link to="/cretaceous-inferior">inferior</Link>
            <div className="period-btn-bg stage-3-bg"></div>
          </div>
          <div className="period-btn stage-8">
            <Link to="/cretaceous-medio">medium</Link>
            <div className="period-btn-bg stage-3-bg"></div>
          </div>
        </div>
      </div>
  );
};
