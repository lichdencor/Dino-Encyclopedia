import { useEffect, useState } from 'react';
import styles from './Tips.module.css';
import { Nav } from '../../../components';
const TIPS_KEY = 'showTipsDialog';

export const Tips = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(TIPS_KEY);
    setEnabled(stored === 'true');
  }, []);

  const handleToggle = () => {
    localStorage.setItem(TIPS_KEY, String(!enabled));
    setEnabled(!enabled);
  };

  return (
    <div className={styles.tipsPage}>
      <Nav />
      <div className={styles.tipsBackofficeContainer}>
        <h2 className={styles.title}>Tips Backoffice</h2>
        <div className={styles.switchRow}>
        <label htmlFor="tips-switch" className={styles.label}>
          Mostrar TipsDialog en Puzzleaurus
        </label>
        <input
          id="tips-switch"
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className={styles.switch}
        />
      </div>
      <div className={styles.status}>
        Estado actual: <b>{enabled ? 'Habilitado' : 'Deshabilitado'}</b>
      </div>
    </div>
    </div>
  );
};