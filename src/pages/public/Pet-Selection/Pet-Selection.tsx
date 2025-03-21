import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
//import styles from "./Pet-Selection.module.css";
import './Pet-Selection.css';


const avatars = [
  { id: 1, src: '/public/assets/img/eggs/egg-rauisuchus.png', alt: 'Rauisuchus', name: 'rauisuchus' },
  { id: 2, src: '/public/assets/img/eggs/egg-stegosaurus.png', alt: 'Stegosaurus', name: 'stegosaurus' },
  { id: 3, src: '/public/assets/img/eggs/egg-t-rex.png', alt: 'T-Rex', name: 't-rex' }
];

export const PetSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();
  const handleAvatarSelect = async (e, avatar) => {
    e.preventDefault();
    try {
      setSelectedAvatar(avatar);

      //localStorage.setItem('userProfile', JSON.stringify(response.data));

      setTimeout(() => {
        navigate('/map');
      }, 500);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
      <div className="avatar-selection-screen">
        <div className='avatar-moving-background'></div>
        <h1>Hatch your egg</h1>
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
