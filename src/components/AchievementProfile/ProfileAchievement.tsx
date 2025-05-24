import styles from "./ProfileAchievement.module.css"

interface ProfileAchievementProps {
  name: string,
  description: string,
  sublevels: number
};

export const ProfileAchievement = ({ name, description, sublevels }: ProfileAchievementProps) => {
  return (

    <div className={styles["profile-achievement-container"]}>
      <div className={styles.achievementDescriptionContainer}>
        <img src="" alt="" className={styles.achievementImg} />
        <span className={styles.achievementName}>{name}</span>
        <p className={styles.achievementTxt}>{description}</p>
      </div>

      sublevels.map(para la cantidad de sublevels que haya, y que cada uno tenga una imagen que sea name-bronze, name-silver, name-gold)
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
  )
}