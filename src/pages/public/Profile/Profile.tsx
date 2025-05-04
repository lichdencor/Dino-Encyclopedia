import React from 'react'
import styles from "./Profile.module.css";
import { Nav } from '../../../components';

export const Profile = () => {
    return (
        <div className={styles.profilePage}>
            <Nav></Nav>
            <div className={styles.profileContainer}>
                <div className={styles.petUserDataContainer}>
                    <div className={styles.petContainer}></div>
                    <div className={styles.userDataContainer}></div>
                </div>
                <div className={styles.fidelitySystemContainer}>
                    <div className={styles.fidelitySystemTitleContainer}>
                        <span className={styles.fidelitySystemTitle}>SISTEMA DE FIDELIDAD</span>
                    </div>
                    <div className={styles.progressBarContainer}>PROGRESS BAR</div>
                    <div className={styles.achievementsContainer}>
                        <div className={styles.achievementContainer}>
                            <div className={styles.achievementDescriptionContainer}>
                                <img src="" alt="" className={styles.achievementImg} />
                                <span className={styles.achievementName}>ACHIEVEMENT NAME</span>
                                <p className={styles.achievementTxt}>Achievement description</p>
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
                                <p className={styles.achievementTxt}>Achievement description</p>
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
                                <p className={styles.achievementTxt}>Achievement description</p>
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
                                <p className={styles.achievementTxt}>Achievement description</p>
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
