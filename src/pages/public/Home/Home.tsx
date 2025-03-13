import "./Home.css";
import { Link } from "react-router-dom";
import { Nav } from "../../../components/";

export const Home = () => {
  return (
    <div>
      <Nav />
      <header>HEADER</header>
      <div className="periods-container">
        <div class="period triassic">
          <div className="title">Triassic<br />Period</div>
          <div class="description">
            <i
            >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum."<br /><br />"Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat."</i
            >
          </div>
          <div class="preiod-title"></div>
        </div>
        <div class="period jurassic">
          <div class="title">Jurassic<br />Period</div>
          <div class="description">
            <i
            >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum."<br /><br />"Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat."</i
            >
          </div>
        </div>
        <div class="period cretaceous">
          <div class="title">Cretaceous<br />Period</div>
          <div class="description">
            <i
            >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum."<br /><br />"Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat."</i
            >
          </div>
        </div>
      </div>
      <div className="map-btn">
        <Link to="/map">Go to Map</Link>
      </div>
      {/* <div class="plant-1"></div>
      <div class="plant-2"></div> */}

      <div class="paw-1"></div>
      <div class="paw-2"></div>
      <div class="paw-3"></div>
      <div class="paw-4"></div>
      <div class="paw-5"></div>
      <div class="paw-6"></div>
      <div class="paw-7"></div>
    </div>
  );
};
