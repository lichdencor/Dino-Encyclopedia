import { Banner } from '../../../context';
import { BannerCard } from './BannerCard';
import styles from './AdsPage.module.css';

interface PositionSectionProps {
  title: string;
  position: Banner['position'];
  banners: Banner[];
  availableAdSources: any[];
  onToggleStatus: (id: string) => void;
  onRemove: (id: string) => void;
}

export const PositionSection = ({
  title,
  position,
  banners,
  availableAdSources,
  onToggleStatus,
  onRemove
}: PositionSectionProps) => {
  const positionBanners = banners.filter((banner) => banner.position === position);

  return (
    <div className={styles.positionSection}>
      <h2>{title}</h2>
      {positionBanners.map((banner) => (
        <BannerCard
          key={banner.id}
          banner={banner}
          availableAdSources={availableAdSources}
          onToggleStatus={onToggleStatus}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}; 