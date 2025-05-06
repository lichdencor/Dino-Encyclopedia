import { useAds } from '../../context';
import { AdDisplay } from '../AdDisplay/AdDisplay';
import styles from './BannerAd.module.css';

interface BannerAdProps {
  position: 'position1' | 'position2';
}

export const BannerAd = ({ position }: BannerAdProps) => {
  const { banners } = useAds();
  
  const activeBanner = banners.find(
    (banner) => banner.position === position && banner.active
  );

  if (!activeBanner) {
    return null;
  }

  return (
    <div className={styles.bannerContainer} data-position={position}>
      <AdDisplay 
        adCode={activeBanner.adCode}
      />
    </div>
  );
}; 