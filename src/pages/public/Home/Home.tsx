import "./Home.css";
import { Link } from "react-router-dom";
import { Nav } from "../../../components/";

export const Home = () => {
  return (
    <div>
      <Nav />
      <header>
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <div className="text">
          <div className="header-title">ACADEMIA DEL DINO CULTO</div>
          <div className="header-subtitle">MUSEO INTERACTIVO DE PALEONTOLOGIA</div>
        </div>
      </header>
      <div className="periods-container">
        <div className="period triassic">

        </div>
        <div className="period jurassic">

        </div>
        <div className="period cretaceous">

        </div>
        
        {/* <div className="map-btn">
          <Link to="/map">Go to Map</Link>
        </div> */}
      </div>
    </div>
  );
};

