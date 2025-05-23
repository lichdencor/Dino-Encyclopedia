import React from 'react'
import styles from "./Profile.module.css";
import { Nav } from '../../../components';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';

export const Profile = () => {
    return (
        <div className={styles.profilePage}>
            <Nav></Nav>
            <div className={styles.profileContainer}>
                <div className={styles.petUserDataContainer}>
                    <div className={styles.petContainer}>
                        <img src="/public/assets/img/pets/t-rex/pet-t-rex-1.png" alt="" className={styles.petImg}/>
                    </div>
                    <div className={styles.userDataContainer}>
                        <div className={styles.nameContainer}><p>Gemdelle Dynosaur</p><button className={styles.editNameBtn}></button></div>
                        <div className={styles.mailContainer}><p>gemdelle.dynosaur@gmail.com</p><button className={styles.editMailBtn}></button></div>
                        <button className={styles.walletAccessBtn}>WALLET</button>
                    </div>
                </div>
                <div className={styles.fidelitySystemContainer}>
                    <div className={styles.fidelitySystemTitleContainer}>
                        <span className={styles.fidelitySystemTitle}>SISTEMA DE FIDELIDAD</span>
                    </div>
                    <div className={styles["progress-bar"]}>
                        <ProgressBar imgSrc='/public/assets/img/achievements/icons/achievement-book-icon.png' ></ProgressBar>
                    </div>
                    <div className={styles.achievementsContainer}>
                        <div className={styles.achievementContainer}>
                            <div className={styles.achievementDescriptionContainer}>
                                <img src="" alt="" className={styles.achievementImg} />
                                <span className={styles.achievementName}>ACHIEVEMENT NAME</span>
                                <p className={styles.achievementTxt}>Achievement description Achievement description Achievement description Achievement description Achievement</p>
                            </div>
                            <div className={styles.achievementBadgesContainer}>
                                {/* BADGES */}
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.achievementContainer}>
                        <div className={styles.achievementDescriptionContainer}>
                                <img src="" alt="" className={styles.achievementImg} />
                                <span className={styles.achievementName}>ACHIEVEMENT NAME</span>
                                <p className={styles.achievementTxt}>Achievement description Achievement description Achievement description Achievement description Achievement</p>
                            </div>
                            <div className={styles.achievementBadgesContainer}>
                                {/* BADGES */}
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.achievementContainer}>
                        <div className={styles.achievementDescriptionContainer}>
                                <img src="" alt="" className={styles.achievementImg} />
                                <span className={styles.achievementName}>ACHIEVEMENT NAME</span>
                                <p className={styles.achievementTxt}>Achievement description Achievement description Achievement description Achievement description Achievement</p>
                            </div>
                            <div className={styles.achievementBadgesContainer}>
                                {/* BADGES */}
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.achievementContainer}>
                        <div className={styles.achievementDescriptionContainer}>
                                <img src="" alt="" className={styles.achievementImg} />
                                <span className={styles.achievementName}>ACHIEVEMENT NAME</span>
                                <p className={styles.achievementTxt}>Achievement description Achievement description Achievement description Achievement description Achievement</p>
                            </div>
                            <div className={styles.achievementBadgesContainer}>
                                {/* BADGES */}
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <img src="" alt="" />
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.fidelitySystemAccessBtn}>VER MÁS</button>
                </div>
            </div>
        </div>
    )
}
