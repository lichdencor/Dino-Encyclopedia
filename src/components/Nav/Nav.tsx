import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return (
    <nav>
      <div className="profile-container">
        <div className="profile">
          <div className="pet-profile-img"></div>
        </div>
        <div className="pawn-1 complete"></div>
        <div className="pawn-2 complete"></div>
        <div className="pawn-3 complete"></div>
        <div className="pawn-4 incomplete"></div>
        <div className="pawn-5 incomplete"></div>
        <div className="pawn-6 incomplete"></div>
        <div className="pawn-7 incomplete"></div>
        <div className="pawn-8 incomplete"></div>
        <div className="pawn-9 incomplete"></div>
        <div className="pawn-10 incomplete"></div>
        <div className="pawn-11 incomplete"></div>
        <div className="pawn-12 incomplete"></div>
      </div>

      <div className="routes">
        <div className="routes-left">
          <Link to="/ads">ADS</Link>
          <Link to="/">HOME</Link>
          <Link to="/map">MAP</Link>
          <Link to="/store">STORE</Link>
          <Link to="/profile">PROFILE</Link>
        </div>
        <div className="routes-right">
          <Link to="/album">ALBUM</Link>
          <Link to="/games">GAMES</Link>
          <Link to="/library">LIBRARY</Link>
          <Link to="/cinema">CINEMA</Link>
        </div>

        <Link to="/wallet" className="token-container">
          <div className="token-img"></div>
          <div className="token-amount">100</div>
        </Link>


        {/* <div className="token-container">
          <div className="token-img"></div>
          <div className="token-amount">100</div>
        </div> */}
      </div>

    </nav>
  );
};
