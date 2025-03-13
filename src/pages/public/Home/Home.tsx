import "./Home.css";
import { Link } from "react-router-dom";
import { Nav } from "../../../components/";

export const Home = () => {
  return (
    <div>
      <Nav />
      <header>HEADER</header>
      <div className="periods-container">
        <div className="period triassic">
          <div className="title">Triassic<br />Period</div>
          <div className="description">
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
          <div className="preiod-title"></div>
        </div>
        <div className="period jurassic">
          <div className="title">Jurassic<br />Period</div>
          <div className="description">
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
        <div className="period cretaceous">
          <div className="title">Cretaceous<br />Period</div>
          <div className="description">
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
      {/* <div className="plant-1"></div>
      <div className="plant-2"></div> */}

      <div className="paw-1"></div>
      <div className="paw-2"></div>
      <div className="paw-3"></div>
      <div className="paw-4"></div>
      <div className="paw-5"></div>
      <div className="paw-6"></div>
      <div className="paw-7"></div>
    </div>
  );
};