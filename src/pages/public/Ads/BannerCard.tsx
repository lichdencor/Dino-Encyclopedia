import { AdDisplay } from '../../../components/AdDisplay/AdDisplay';
import { Banner, AdSource } from '../../../context';
import styles from './AdsPage.module.css';

interface BannerCardProps {
  banner: Banner;
  availableAdSources: AdSource[];
  onToggleStatus: (id: string) => void;
  onRemove: (id: string) => void;
}

export const BannerCard = ({ banner, availableAdSources, onToggleStatus, onRemove }: BannerCardProps) => {
  return (
    <div className={styles.bannerCard}>
      <AdDisplay adCode={banner.adCode} />
      <div className={styles.bannerControls}>
        <div className={styles.bannerInfo}>
          <label>
            <input
              type="checkbox"
              checked={banner.active}
              onChange={() => onToggleStatus(banner.id)}
            />
            Activo
          </label>
          <span className={styles.sourceInfo}>
            Fuente: {availableAdSources.find(source => source.id === banner.sourceId)?.name}
          </span>
        </div>
        <button onClick={() => onRemove(banner.id)}>Eliminar</button>
      </div>
    </div>
  );
}; 