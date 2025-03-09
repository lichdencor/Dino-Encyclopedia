import "./Map.css";
import { Nav } from "../../components/";
import { Link } from "react-router-dom";

export const Map = () => {
  return (
    <div className="map-background">
      <Nav />
      <header>HEADER</header>
      <div className="era-map">
        <div className="moving-sky"></div>
        <div className="user-character"></div>
        <div className="period-btn stage-1">
          <Link to="/triassic-inferior">triassic-inferior</Link>
          <div className="period-btn-bg stage-1-bg"></div>
        </div>
        <div className="period-btn stage-2">
          <Link to="/triassic-inferior">triassic-medium</Link>
          <div className="period-btn-bg stage-1-bg"></div>
        </div>
        <div className="period-btn stage-3">
          <Link to="/triassic-inferior">triassic-superior</Link>
          <div className="period-btn-bg stage-1-bg"></div>
        </div>
        <div className="period-btn stage-4">
          <Link to="/triassic-inferior">jurassic-inferior</Link>
          <div className="period-btn-bg stage-2-bg"></div>
        </div>
        <div className="period-btn stage-5">
          <Link to="/triassic-inferior">jurassic-medium</Link>
          <div className="period-btn-bg stage-2-bg"></div>
        </div>
        <div className="period-btn stage-6">
          <Link to="/triassic-inferior">jurassic-superior</Link>
          <div className="period-btn-bg stage-2-bg"></div>
        </div>
        <div className="period-btn stage-7">
          <Link to="/triassic-inferior">cretaceous-inferior</Link>
          <div className="period-btn-bg stage-3-bg"></div>
        </div>
        <div className="period-btn stage-8">
          <Link to="/triassic-inferior">cretaceous-medium</Link>
          <div className="period-btn-bg stage-3-bg"></div>
        </div>
      </div>
    </div>
  );
};
