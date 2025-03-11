import "./Map.css";
import { Nav } from "../../../components/";
import { Link } from "react-router-dom";

export const Map = () => {
  return (
    <div class="map-background">
      <Nav />
      <header>HEADER</header>
      <div class="era-map">
        <div class="period-title-frame period-1">Triassic<br/>Period</div>
        <div class="period-title-frame period-2">Jurassic<br/>Period</div>
        <div class="period-title-frame period-3">Cretaceous<br/>Period</div>

        <div class="user-character"></div>
        <div class="period-btn stage-1">
          <Link to="/triassic-inferior">inferior</Link>
          <div class="period-btn-bg stage-1-bg"></div>
        </div>
        <div class="period-btn stage-2">
          <Link to="/triassic-medio">medium</Link>
          <div class="period-btn-bg stage-1-bg"></div>

        </div>
        <div class="period-btn stage-3">
          <Link to="/triassic-superior">superior</Link>
          <div class="period-btn-bg stage-1-bg"></div>
        </div>
        <div class="period-btn stage-4">
          <Link to="/jurassic-inferior">inferior</Link>
          <div class="period-btn-bg stage-2-bg"></div>
        </div>
        <div class="period-btn stage-5">
          <Link to="/jurassic-medio">medium</Link>
          <div class="period-btn-bg stage-2-bg"></div>
        </div>
        <div class="period-btn stage-6">
          <Link to="/jurassic-superior">superior</Link>
          <div class="period-btn-bg stage-2-bg"></div>
        </div>
        <div class="period-btn stage-7">
          <Link to="/cretaceous-inferior">inferior</Link>
          <div class="period-btn-bg stage-3-bg"></div>
        </div>
        <div class="period-btn stage-8">
          <Link to="/cretaceous-medio">medium</Link>
          <div class="period-btn-bg stage-3-bg"></div>
        </div>
      </div>
    </div>
  );
};
