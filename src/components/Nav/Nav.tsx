import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav= () => {
  return (
    <nav>
      <div className="profile-container">
          <div className="profile"></div>
          <div className="pawn-1 completed"></div>
          <div className="pawn-2 completed"></div>
          <div className="pawn-3 completed"></div>
          <div className="pawn-4"></div>
          <div className="pawn-5"></div>
          <div className="pawn-6"></div>
          <div className="pawn-7"></div>
          <div className="pawn-8"></div>
      </div>
      <div className="routes-bg">
        <div className="routes">
          <Link to="/">HOME</Link>
          <Link to="/map">MAP</Link>
          <Link to="/store">STORE</Link>
          <Link to="/profile">PROFILE</Link>
          <Link to="/album">ALBUM</Link>
          <Link to="/games">GAMES</Link>
          <Link to="/library">LIBRARY</Link>
          <Link to="/cinema">CINEMA</Link>
        </div>
      </div>
    </nav>
  );
};
