import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAnalyticsTracking } from "../../context/Analytics/AnalyticsProvider";
import "./Nav.css";

interface NavProps {
  id?: string;
}

export const Nav = ({ id }: NavProps) => {
  const navigate = useNavigate();
  const { isGuest, isAdmin, logout } = useAuth();
  const { trackNavigation } = useAnalyticsTracking();

  const accederAPerfil = () => {
    trackNavigation('/profile', 'nav');
    navigate('/profile');
  };
  const accederATips = () => {
    trackNavigation('/tips', 'nav');
    navigate('/tips');
  };
  const accederAHome = () => {
    trackNavigation('/', 'nav');
    navigate('/');
  };
  const accederAMap = () => {
    trackNavigation('/map', 'nav');
    navigate('/map');
  };
  const accederATienda = () => {
    trackNavigation('/store', 'nav');
    navigate('/store');
  };
  const accederAlAlbum = () => {
    trackNavigation('/album', 'nav');
    navigate('/album');
  };
  const accederAMinijuegos = () => {
    trackNavigation('/games', 'nav');
    navigate('/games');
  };
  const accederABiblioteca = () => {
    trackNavigation('/library', 'nav');
    navigate('/library');
  };
  // const accederACine = () => navigate('/cinema');
  const accederAWallet = () => {
    trackNavigation('/wallet', 'nav');
    navigate('/wallet');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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
          {isAdmin && <div onClick={accederATips} className="nav-item">TIPS</div>}
          <div onClick={accederAHome} className="nav-item">HOME</div>
          <div onClick={accederAMap} className="nav-item">MAP</div>
          <div id="nav-store" onClick={accederATienda} className="nav-item">STORE</div>
        </div>
        <div className="routes-right">
          {!isGuest && <div onClick={accederAlAlbum} className="nav-item">ALBUM</div>}
          <div onClick={accederAMinijuegos} className="nav-item">GAMES</div>
          <div onClick={accederABiblioteca} className="nav-item">LIBRARY</div>
          {/* <div onClick={accederACine} className="nav-item">CINEMA</div> */}
          <div onClick={handleLogout} className="nav-item logout-btn">LOGOUT</div>
        </div>

        <div onClick={accederAWallet} className="token-container">
          <div className="token-img"></div>
          <div className="token-amount">100</div>
        </div>
      </div>
    </nav>
  );
};
