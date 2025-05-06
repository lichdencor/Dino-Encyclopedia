import { useState } from 'react';
import { useAds, Banner } from '../../../context';
import { Nav } from '../../../components';
import styles from './AdsPage.module.css';
import { AddBannerSection } from './AddBannerSection';
import { PositionSection } from './PositionSection';

const AdsPage = () => {
  const { banners, addBanner, removeBanner, toggleBannerStatus, availableAdSources } = useAds();
  const [selectedPosition, setSelectedPosition] = useState<Banner['position']>('position1');
  const [selectedSourceId, setSelectedSourceId] = useState<string>(availableAdSources[0]?.id || '');

  const handleAddBanner = () => {
    if (selectedSourceId) {
      addBanner(selectedSourceId, selectedPosition);
    }
  };

  return (
    <div className="homePage">
      <Nav />
      <div className={styles.container}>
        <h1>Gestión de Banners Publicitarios</h1>

        <AddBannerSection
          selectedPosition={selectedPosition}
          selectedSourceId={selectedSourceId}
          availableAdSources={availableAdSources}
          banners={banners}
          onPositionChange={setSelectedPosition}
          onSourceChange={setSelectedSourceId}
          onAddBanner={handleAddBanner}
        />

        <div className={styles.bannersGrid}>
          <PositionSection
            title="Posición 1 (Home)"
            position="position1"
            banners={banners}
            availableAdSources={availableAdSources}
            onToggleStatus={toggleBannerStatus}
            onRemove={removeBanner}
          />

          <PositionSection
            title="Posición 2"
            position="position2"
            banners={banners}
            availableAdSources={availableAdSources}
            onToggleStatus={toggleBannerStatus}
            onRemove={removeBanner}
          />
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
export { AdsPage }; 