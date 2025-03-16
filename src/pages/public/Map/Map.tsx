import "./Map.css";
import { Nav, PeriodsButtonHover } from "../../../components/";
import { Link } from "react-router-dom";

export const Map = () => {
  return (
    <div className="map-background">
      <Nav />
      <header>HEADER</header>
      <div className="era-map">
        <div className="period-title-frame period-1">
          Triassic
          <br />
          Period
        </div>
        <div className="period-title-frame period-2">
          Jurassic
          <br />
          Period
        </div>
        <div className="period-title-frame period-3">
          Cretaceous
          <br />
          Period
        </div>

        <div className="user-character"></div>
        <PeriodsButtonHover
          stage="stage-1"
          label="inferior"
          link="/triassic-inferior"
          description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
          dinos={[
            "info-triassic-dino-1",
            "info-triassic-dino-2",
            "info-triassic-dino-3",
          ]}
        />
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
