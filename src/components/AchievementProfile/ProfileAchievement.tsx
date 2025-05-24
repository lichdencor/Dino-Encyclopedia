import styles from "./ProfileAchievement.module.css";

interface ProfileAchievementProps {
  name: string;
  description: string;
  sublevels: number;
}

const TIER_NAMES = ["bronze", "silver", "gold"];

export const ProfileAchievement = ({
  name,
  description,
  sublevels,
}: ProfileAchievementProps) => {
  return (
    <div className={styles["achievement-container"]}>
      <div className={styles["achievement-description-container"]}>
        <img
          src={`/assets/achievements/${name}-icon.png`}
          alt={name}
          className={styles["achievement-img"]}
        />
        <span className={styles["achievement-name"]}>{name}</span>
        <p className={styles["achievement-txt"]}>{description}</p>
      </div>

      <div className={styles["achievement-badges-container"]}>
        {Array.from({ length: sublevels }).map((_, idx) => {
          const tier =
            idx < TIER_NAMES.length
              ? TIER_NAMES[idx]
              : TIER_NAMES[TIER_NAMES.length - 1];

          return (
            <div key={idx} className={styles["badge-container"]}>
              <img
                src={`/assets/achievements/${name.toLowerCase()}-${tier}.png`}
                alt={`${name} ${tier}`}
              />
              <span>{idx + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
