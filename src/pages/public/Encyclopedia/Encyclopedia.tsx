import "./Encyclopedia.css";
import { Nav } from "../../../components";
import {Link} from "react-router-dom";

export const Encyclopedia = () => {
  return (
    <div>
      <Nav />
      <div className="encyclopedia-container">
        <div className="arrow-previous"><Link to="/map">.</Link></div>
        <div className="title">Triassic Period</div>
        <div className="dino-card-container">
          <div className="dino-card">
            <div className="dinosaur dinosaur-1"></div>
          </div>
          <div className="dino-card dinosaur-2"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
          <div className="dino-card"></div>
        </div>
        <div className="arrow-next"><Link to="/triassic-medio">.</Link></div>
      </div>
    </div>
  );
};
