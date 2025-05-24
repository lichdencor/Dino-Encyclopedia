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
                        <img src="/public/assets/img/pets/t-rex/pet-t-rex-1.png" alt="" className={styles.petImg} />
                    </div>
                    <div className={styles.userDataContainer}>
                        <div className={styles.nameContainer}><p>Gemdelle Dynosaur</p><button className={styles.editNameBtn}></button></div>
                        <div className={styles.mailContainer}><p>gemdelle.dynosaur@gmail.com</p><button className={styles.editMailBtn}></button></div>
                        <button className={styles.walletAccessBtn} onClick={accederAWallet}>WALLET</button>
                    </div>
                </div>
                <div className={styles.fidelitySystemContainer}>
                    <div className={styles.fidelitySystemTitleContainer}>
                        <span className={styles.fidelitySystemTitle}>SISTEMA DE FIDELIDAD</span>
                    </div>
                    <div className={styles["progress-bar"]}>
                        <ProgressBar imgSrc='/public/assets/img/achievements/achievement-final.png' customStyles={{ container: styles["container"] }} progress={23} ></ProgressBar>
                    </div>
                    <div className={styles.achievementsContainer}>

                        <ProfileAchievement  ></ProfileAchievement>

                    </div>
                </div>
            </div>
        </div>
    )
}
