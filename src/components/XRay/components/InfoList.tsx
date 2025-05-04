import React, { useEffect } from 'react';
import styles from '../XrayModal.module.css';
import { InfoListProps } from '../types';
import { INFO_REVEAL_TIMINGS } from '../constants';

export const InfoList: React.FC<InfoListProps> = ({ 
  dinosaurInfo, 
  elapsedTime, 
  visibleInfo = [], 
  onInfoVisibilityChange 
}) => {
  const isInfoVisible = (label: string) => {
    if (visibleInfo.includes(label)) {
      return true;
    }
    const timing = INFO_REVEAL_TIMINGS.find(t => t.label === label);
    return timing && elapsedTime >= timing.time;
  };

  useEffect(() => {
    const newVisibleInfo = INFO_REVEAL_TIMINGS.reduce((acc, timing) => {
      if (elapsedTime >= timing.time && !visibleInfo.includes(timing.label)) {
        acc.push(timing.label);
      }
      return acc;
    }, [] as string[]);

    if (newVisibleInfo.length > 0) {
      onInfoVisibilityChange([...visibleInfo, ...newVisibleInfo]);
    }
  }, [elapsedTime]);

  return (
    <ul className={styles.infoList}>
      {INFO_REVEAL_TIMINGS.map((timing) => (
        <li key={timing.label} className={isInfoVisible(timing.label) ? styles.animate : ''}>
          <span>{timing.label.charAt(0).toUpperCase() + timing.label.slice(1)}:</span>
          {dinosaurInfo[timing.label as keyof typeof dinosaurInfo]}
        </li>
      ))}
    </ul>
  );
}; 