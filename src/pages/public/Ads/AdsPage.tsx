import { useState } from 'react';
import { useAds, Banner } from '../../../context';
import { Nav } from '../../../components';
import { AdDisplay } from '../../../components/AdDisplay/AdDisplay';
import styles from './AdsPage.module.css';

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

        <div className={styles.addBannerSection}>
          <h2>Agregar o Reemplazar Banner</h2>
          <div className={styles.controls}>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value as Banner['position'])}
              className={styles.select}
            >
              <option value="position1">Posición 1 (Home)</option>
              <option value="position2">Posición 2</option>
            </select>

            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className={styles.select}
            >
              {availableAdSources.map(source => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>

            <button onClick={handleAddBanner} className={styles.addButton}>
              {banners.some(b => b.position === selectedPosition) ? 'Reemplazar Banner' : 'Agregar Banner'}
            </button>
          </div>
          <div className={styles.sourceDescription}>
            {selectedSourceId && (
              <p>{availableAdSources.find(source => source.id === selectedSourceId)?.description}</p>
            )}
          </div>
        </div>

        <div className={styles.bannersGrid}>
          <div className={styles.positionSection}>
            <h2>Posición 1 (Home)</h2>
            {banners
              .filter((banner) => banner.position === 'position1')
              .map((banner) => (
                <div key={banner.id} className={styles.bannerCard}>
                  <AdDisplay adCode={banner.adCode} sourceId={banner.sourceId} />
                  <div className={styles.bannerControls}>
                    <div className={styles.bannerInfo}>
                      <label>
                        <input
                          type="checkbox"
                          checked={banner.active}
                          onChange={() => toggleBannerStatus(banner.id)}
                        />
                        Activo
                      </label>
                      <span className={styles.sourceInfo}>
                        Fuente: {availableAdSources.find(source => source.id === banner.sourceId)?.name}
                      </span>
                    </div>
                    <button onClick={() => removeBanner(banner.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
          </div>

          <div className={styles.positionSection}>
            <h2>Posición 2</h2>
            {banners
              .filter((banner) => banner.position === 'position2')
              .map((banner) => (
                <div key={banner.id} className={styles.bannerCard}>
                  <AdDisplay adCode={banner.adCode} sourceId={banner.sourceId} />
                  <div className={styles.bannerControls}>
                    <div className={styles.bannerInfo}>
                      <label>
                        <input
                          type="checkbox"
                          checked={banner.active}
                          onChange={() => toggleBannerStatus(banner.id)}
                        />
                        Activo
                      </label>
                      <span className={styles.sourceInfo}>
                        Fuente: {availableAdSources.find(source => source.id === banner.sourceId)?.name}
                      </span>
                    </div>
                    <button onClick={() => removeBanner(banner.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
export { AdsPage }; 