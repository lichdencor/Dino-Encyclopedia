import { Banner } from '../../../context';
import styles from './AdsPage.module.css';

interface AddBannerSectionProps {
  selectedPosition: Banner['position'];
  selectedSourceId: string;
  availableAdSources: any[];
  banners: Banner[];
  onPositionChange: (position: Banner['position']) => void;
  onSourceChange: (sourceId: string) => void;
  onAddBanner: () => void;
}

export const AddBannerSection = ({
  selectedPosition,
  selectedSourceId,
  availableAdSources,
  banners,
  onPositionChange,
  onSourceChange,
  onAddBanner
}: AddBannerSectionProps) => {
  return (
    <div className={styles.addBannerSection}>
      <h2>Agregar o Reemplazar Banner</h2>
      <div className={styles.controls}>
        <select
          value={selectedPosition}
          onChange={(e) => onPositionChange(e.target.value as Banner['position'])}
          className={styles.select}
        >
          <option value="position1">Posición 1 (Home)</option>
          <option value="position2">Posición 2</option>
        </select>

        <select
          value={selectedSourceId}
          onChange={(e) => onSourceChange(e.target.value)}
          className={styles.select}
        >
          {availableAdSources.map(source => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>

        <button onClick={onAddBanner} className={styles.addButton}>
          {banners.some(b => b.position === selectedPosition) ? 'Reemplazar Banner' : 'Agregar Banner'}
        </button>
      </div>
      <div className={styles.sourceDescription}>
        {selectedSourceId && (
          <p>{availableAdSources.find(source => source.id === selectedSourceId)?.description}</p>
        )}
      </div>
    </div>
  );
}; 