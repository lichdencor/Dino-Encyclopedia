import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav: React.FC = () => {
  return (
    <nav>
      <div className="profile-container"></div>
      <div className="routes">
        <Link to="/home">Home</Link>
        <Link to="/map">Map</Link>
        <Link to="/encyclopedia">Encyclopedia</Link>
        <Link to="/album">Album</Link>
      </div>
    </nav>
  );
};
