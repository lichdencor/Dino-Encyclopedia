import "./Cretaceous-Inferior.css";

import { Nav } from "../../../components";
import {Link} from "react-router-dom";

export const CretaceousInferior = () => {
  return (
    <div>
      <Nav />
        <div className="triassic-inferior-bg">
            <div className="plant-1"></div>
            <div className="plant-2"></div>
            <div className="plant-3"></div>
            <div className=" bg-era">
                <div className="arrow-previous"><Link to="/map">.</Link></div>

                <div className="name-frame name-frame-1">Pachycephalosaurus</div>
                <div className="name-frame name-frame-2">Microceratus</div>
                <div className="name-frame name-frame-3">Gallimimus</div>

                <div className="genetic-bg-1">
                    <div className="dinosaur-1"></div>
                </div>
                <div className="genetic-bg-2">
                    <div className="dinosaur-2"></div>
                </div>
                <div className="genetic-bg-3">
                    <div className="dinosaur-3"></div>
                </div>

                <div className="arrow-next"><Link to="/triassic-medio">.</Link></div>
            </div>
        </div>
    </div>
  );
};
