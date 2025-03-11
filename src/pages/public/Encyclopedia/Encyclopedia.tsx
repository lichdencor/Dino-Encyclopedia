import "./Encyclopedia.css";
import { Nav } from "../../../components";
import {Link} from "react-router-dom";

export const Encyclopedia = () => {
  return (
    <div>
      <Nav />
      <div class="encyclopedia-container">
        <div class="arrow-previous"><Link to="/map">.</Link></div>
        <div class="title">Triassic Period</div>
        <div class="dino-card-container">
          <div class="dino-card">
            <div class="dinosaur dinosaur-1"></div>
          </div>
          <div class="dino-card dinosaur-2"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
          <div class="dino-card"></div>
        </div>
        <div class="arrow-next"><Link to="/triassic-medio">.</Link></div>
      </div>
    </div>
  );
};
