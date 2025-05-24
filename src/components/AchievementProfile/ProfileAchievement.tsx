import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./ProfileAchievement.module.css";

interface ProfileAchievementProps {
  name: string;
  tier: string;
  tiers: number;              // number of badge tiers to show (1–3)
  shortDescription: string;
  description: string;
  value: number;
}

const TIER_NAMES = ["bronze", "silver", "gold"];

export const ProfileAchievement = ({
  name,
  tier,
  shortDescription,
  description,
  tiers,
  value
}: ProfileAchievementProps) => {
  const keyName = name.trim().toLowerCase().replace(/\s+/g, "-");

  // Determine which badge tiers to display
  let badgeTiers: string[];
  if (tiers === 1) {
    badgeTiers = ["gold"];
  } else if (tiers === 2) {
    badgeTiers = ["bronze", "gold"];
  } else {
    badgeTiers = ["bronze", "silver", "gold"];
  }

  return (
    <div className={styles["achievement-container"]}>
      <div className={styles["achievement-description-container"]}>

        <div className={styles["achievement-img-bg"]}>
          <img
            src={`/assets/img/achievements/${tier}/achievement-${keyName}-${tier}.png`}
            alt={`${name} ${tier}`}
            className={styles["achievement-img"]}
          />
        </div>

        <div className={styles["achievement-description"]}>
          <span className={styles["achievement-name"]}>{name}</span>
          <p className={styles["achievement-short-description"]}>
            {shortDescription}
          </p>
          <p className={styles["achievement-long-description"]}>{description}</p>
        </div>

      </div>

      <div className={styles["achievement-progress-badges-container"]}>
        <div className={styles["progress-bar-container"]}>
           <ProgressBar progress={67} customStyles={{imgContainer:styles["achievement-img-container"]}}></ProgressBar>
        </div>
        <div className={styles["badges-container"]}>
          {badgeTiers.map((badgeTier) => (
            <div key={badgeTier} className={styles["badge-container"]}>
              <img src="/public/assets/img/alert/alertBorder.png" alt="badge border" className={styles["badge-border"]}/>
              <img
                src={`/assets/img/achievements/${badgeTier}/achievement-${keyName}-${badgeTier}.png`}
                alt={`${name} ${badgeTier}`}
                className={styles["badge-img"]}
              />
              <div className={styles["goal-number"]}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
