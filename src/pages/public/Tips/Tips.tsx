import { useEffect, useState } from 'react';
import styles from './Tips.module.css';
import { Nav } from '../../../components';

const PUZZLEAURUS_TIPS_KEY = 'showPuzzleaurusTipsDialog';
const MEMODYN_TIPS_KEY = 'showMemoDynTipsDialog';

export const Tips = () => {
  const [puzzleaurusEnabled, setPuzzleaurusEnabled] = useState<boolean>(false);
  const [memoDynEnabled, setMemoDynEnabled] = useState<boolean>(false);

  useEffect(() => {
    const puzzleaurusStored = localStorage.getItem(PUZZLEAURUS_TIPS_KEY);
    const memoDynStored = localStorage.getItem(MEMODYN_TIPS_KEY);
    setPuzzleaurusEnabled(puzzleaurusStored === 'true');
    setMemoDynEnabled(memoDynStored === 'true');
  }, []);

  const handlePuzzleaurusToggle = () => {
    localStorage.setItem(PUZZLEAURUS_TIPS_KEY, String(!puzzleaurusEnabled));
    setPuzzleaurusEnabled(!puzzleaurusEnabled);
  };

  const handleMemoDynToggle = () => {
    localStorage.setItem(MEMODYN_TIPS_KEY, String(!memoDynEnabled));
    setMemoDynEnabled(!memoDynEnabled);
  };

  function mostrarTips() {
    return <div className={styles.tipsBackofficeContainer}>
      <h2 className={styles.title}>Tips</h2>
      <div className={styles.switchRow}>
        <label htmlFor="puzzleaurus-tips-switch" className={styles.label}>
          Mostrar Tips en Puzzleaurus
        </label>
        <input
            id="puzzleaurus-tips-switch"
            type="checkbox"
            checked={puzzleaurusEnabled}
            onChange={handlePuzzleaurusToggle}
            className={styles.switch}
        />
      </div>
      <div className={styles.status}>
        Estado actual Puzzleaurus: <b>{puzzleaurusEnabled ? 'Habilitado' : 'Deshabilitado'}</b>
      </div>
      <div className={styles.switchRow}>
        <label htmlFor="memoDyn-tips-switch" className={styles.label}>
          Mostrar Tips en MemoDyn
        </label>
        <input
            id="memoDyn-tips-switch"
            type="checkbox"
            checked={memoDynEnabled}
            onChange={handleMemoDynToggle}
            className={styles.switch}
        />
      </div>
      <div className={styles.status}>
        Estado actual MemoDyn: <b>{memoDynEnabled ? 'Habilitado' : 'Deshabilitado'}</b>
      </div>
    </div>;
  }

  return (
    <div className={styles.tipsPage}>
      <Nav/>
      {mostrarTips()}
    </div>
  );
};