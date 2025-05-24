import React from 'react'
import styles from "./Profile.module.css";
import { Nav } from '../../../components';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileAchievement } from '../../../components/AchievementProfile/ProfileAchievement';

export const Profile = () => {
    const navigate = useNavigate();

    const accederAWallet = () => navigate('/wallet');

    return (
        <div className={styles.profilePage}>
            <Nav></Nav>
            <div className={styles.profileContainer}>
                <div className={styles.petUserDataContainer}>
                    <div className={styles.petContainer}>
                        <button className={styles["personalize-pet-btn"]}>PERSONALIZE</button>

                        <img src="/public/assets/img/pets/t-rex/pet-t-rex-1.png" alt="" className={styles.petImg} />
                    </div>
                    <div className={styles["user-data-container"]}>
                        <button className={styles["settings-btn"]}>SETTINGS</button>

                        <div className={styles.nameContainer}><p>Gemdelle Dynosaur</p></div>
                        <div className={styles.mailContainer}><p>gemdelle.dynosaur@gmail.com</p></div>
                    </div>
                    <button className={styles["wallet-btn"]} onClick={accederAWallet}>WALLET</button>
                </div>
                <div className={styles.fidelitySystemContainer}>
                    <button className={styles["fidelity-system-btn"]}>VIEW MORE</button>
                    <div className={styles.fidelitySystemTitleContainer}>
                        <span className={styles.fidelitySystemTitle}>FIDELITY SYSTEM</span>
                    </div>
                    <div className={styles["progress-bar"]}>
                        <ProgressBar imgSrc='/public/assets/img/achievements/gold/achievement-final-gold.png' customStyles={{ container: styles["container"], imgContainer: styles["achievement-img-container"] }} progress={23}></ProgressBar>
                    </div>
                    <div className={styles.achievementsContainer}>

                        <ProfileAchievement name="Galleries Explorer" tier="bronze" tiers={3} shortDescription="Complete the Galleries tour" description="Complete the Galleries tour Complete the Galleries tour Complete the Galleries tour" value={5}></ProfileAchievement>

                        <ProfileAchievement name="Fragment Hunter" tier="gold" tiers={3} shortDescription="Create an account" description="Create an account to unlock this achievement." value={12}></ProfileAchievement>

                        <ProfileAchievement name="Reader" tier="silver" tiers={3} shortDescription="Create an account" description="Create an account to unlock this achievement." value={15}></ProfileAchievement>

                    </div>
                </div>
            </div>
        </div>
    )
}
