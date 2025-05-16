import { useState } from 'react';
import './Carousel.css';
import { useNavigate } from 'react-router-dom';

const TOTAL_CARDS = 6;

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();

  const getClass = (index: number) => {
    if (index === currentIndex) return "carousel-item carousel-item--main";
    if (index === (currentIndex - 1 + TOTAL_CARDS) % TOTAL_CARDS) return "carousel-item carousel-item--left";
    if (index === (currentIndex + 1) % TOTAL_CARDS) return "carousel-item carousel-item--right";
    return "carousel-item carousel-hidden";
  };

  const handleLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  };

  const handleRight = () => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
  };

  const navigatePage = (route: string) => {
    navigate(route);
  };

  function mostrarCarousel() {
    return <div className="carousel">
      <div className={`${getClass(0)} period triassic-1`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/triassic-inferior")}>VISIT</button>
      </div>
      <div className={`${getClass(1)} period jurassic-1`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/jurassic-inferior")}>VISIT</button>
      </div>
      <div className={`${getClass(2)} period cretaceous-1`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/cretaceous-inferior")}>VISIT</button>
      </div>
      <div className={`${getClass(3)} period triassic-2`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/triassic-medium")}>VISIT</button>
      </div>
      <div className={`${getClass(4)} period jurassic-2`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/jurassic-medium")}>VISIT</button>
      </div>
      <div className={`${getClass(5)} period cretaceous-2`}>
        <span className="gallery-name">INFERIOR GALLERY</span>
        <button className='visit-gallery-btn' onClick={() => navigatePage("/cretaceous-medium")}>VISIT</button>
      </div>
    </div>;
  }

  return (
    <div id="carousel-container" className="carousel-container">
      <div className="carousel-container--left">
        <button className="carousel-btn left-arrow" onClick={handleLeft}>
        </button>
      </div>

      {mostrarCarousel()}

      <div className="carousel-carousel--right">
        <button className="carousel-btn right-arrow" onClick={handleRight}>
        </button>
      </div>
    </div>
  );
}
