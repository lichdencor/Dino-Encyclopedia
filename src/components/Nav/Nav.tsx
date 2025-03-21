import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav: React.FC = () => {
  return (
    <nav>
      <div className="profile-container"></div>
      <div className="routes-bg">
        <div className="routes">
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
        <Link to="/encyclopedia">Encyclopedia</Link>
        <Link to="/album">Album</Link>
        {/* <Link to="/login">Login</Link> */}
        </div>
      </div>
    </nav>
  );
};
