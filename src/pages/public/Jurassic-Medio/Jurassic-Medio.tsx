import "./Jurassic-Medio.css";

import { Nav } from "../../../components";
import {Link} from "react-router-dom";

export const JurassicMedio = () => {
  return (
    <div>
      <Nav />
        <div class="triassic-inferior-bg">
            <div class="plant-1"></div>
            <div class="plant-2"></div>
            <div class="plant-3"></div>
            <div class=" bg-era">
                <div class="arrow-previous"><Link to="/map">.</Link></div>

                <div class="name-frame name-frame-1">Allosaurus</div>
                <div class="name-frame name-frame-2">Apatosaurus</div>
                <div class="name-frame name-frame-3">Camarasaurus</div>

                <div class="genetic-bg-1">
                    <div class="dinosaur-1"></div>
                </div>
                <div class="genetic-bg-2">
                    <div class="dinosaur-2"></div>
                </div>
                <div class="genetic-bg-3">
                    <div class="dinosaur-3"></div>
                </div>

                <div class="arrow-next"><Link to="/triassic-medio">.</Link></div>
            </div>
        </div>
    </div>
  );
};
