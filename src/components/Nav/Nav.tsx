import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Nav.css";

interface NavProps {
  id?: string;
}

export const Nav = ({ id }: NavProps) => {
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  const accederAPerfil = () => navigate('/profile');
  const accederATips = () => navigate('/tips');
  const accederAHome = () => navigate('/');
  const accederAMap = () => navigate('/map');
  const accederATienda = () => navigate('/store');
  const accederAlAlbum = () => navigate('/album');
  const accederAMinijuegos = () => navigate('/games');
  const accederABiblioteca = () => navigate('/library');
  const accederACine = () => navigate('/cinema');
  const accederAWallet = () => navigate('/wallet');

  return (
    <nav id={id}>
      <div className="profile-container">
        <div className="profile">
          <div onClick={accederAPerfil} className="profilePageLink"></div>
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
          {!isGuest && <div onClick={accederATips} className="nav-item">TIPS</div>}
          <div onClick={accederAHome} className="nav-item">HOME</div>
          <div onClick={accederAMap} className="nav-item">MAP</div>
          <div id="nav-store" onClick={accederATienda} className="nav-item">STORE</div>
        </div>
        <div className="routes-right">
          {!isGuest && <div onClick={accederAlAlbum} className="nav-item">ALBUM</div>}
          <div onClick={accederAMinijuegos} className="nav-item">GAMES</div>
          <div onClick={accederABiblioteca} className="nav-item">LIBRARY</div>
          <div onClick={accederACine} className="nav-item">CINEMA</div>
        </div>

        <div onClick={accederAWallet} className="token-container">
          <div className="token-img"></div>
          <div className="token-amount">100</div>
        </div>
      </div>
    </nav>
  );
};
