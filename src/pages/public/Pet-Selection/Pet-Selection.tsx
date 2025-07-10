import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Pet-Selection.css';

interface Avatar {
  id: number;
  src: string;
  alt: string;
  name: string;
}

const avatars: Avatar[] = [
  { id: 1, src: "/assets/img/eggs/egg-rauisuchus.png", alt: 'Rauisuchus', name: 'rauisuchus' },
  { id: 2, src: "/assets/img/eggs/egg-stegosaurus.png", alt: 'Stegosaurus', name: 'stegosaurus' },
  { id: 3, src: "/assets/img/eggs/egg-t-rex.png", alt: 'T-Rex', name: 't-rex' }
];

export const PetSelection = () => {
  const [_, setSelectedAvatar] = useState<Avatar | null>(null);
  const navigate = useNavigate();
  const handleAvatarSelect = async (e: React.MouseEvent<HTMLDivElement>, avatar: Avatar) => {
    e.preventDefault();
    try {
      setSelectedAvatar(avatar);

      setTimeout(() => {
        navigate('/map');
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
      }
    }
  };

  return (
      <div className="avatar-selection-screen">
        <div className='avatar-moving-background'></div>
        <header className="pet-header"><h1>Hatch your egg</h1></header>
        
        <div className="avatar-list">
          {avatars.map((avatar) => (
              <div
                  key={avatar.id}
                  className={`clickable frame-dinosaur ${avatar.name === 'rauisuchus' ? 'frame-rauisuchus' : avatar.name === 'stegosaurus' ? 'frame-stegosaurus' : "frame-t-rex"}`}
                  onClick={(e) => handleAvatarSelect(e, avatar)}
              >
                <img src={avatar.src} alt={avatar.alt} />
              </div>
          ))}
        </div>
      </div>
  );
};
