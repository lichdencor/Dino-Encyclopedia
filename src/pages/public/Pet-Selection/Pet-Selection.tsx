import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
//import styles from "./Pet-Selection.module.css";
import './Pet-Selection.css';


const avatars = [
  { id: 1, src: '/src/assets/img/eggs/egg-terrestrial.png', alt: 'Caterpillar', name: 'caterpillar' },
  { id: 2, src: '/src/assets/img/eggs/egg-aquatic.png', alt: 'Axolotl', name: 'axolotl' },
  { id: 3, src: '/src/assets/img/eggs/egg-aerial.png', alt: 'Pterodactyl', name: 'pterodactyl' },
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
                  className={`avatar-item clickable ${selectedAvatar === avatar ? 'selected' : ''}`}
                  onClick={(e) => handleAvatarSelect(e, avatar)}
              >
                <img src={avatar.src} alt={avatar.alt} />
                <div className='avatar-orb-container'><div className={`avatar-orb ${avatar.name === 'axolotl' ? 'aquatic' : avatar.name === 'caterpillar' ? 'terrestrial' : 'aerial'}`}></div></div>
              </div>
          ))}
        </div>
      </div>
  );
};
