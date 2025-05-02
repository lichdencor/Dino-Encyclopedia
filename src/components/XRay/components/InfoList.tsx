import React from 'react';
import styles from '../XrayModal.module.css';
import { InfoListProps } from '../types';
import { INFO_REVEAL_TIMINGS } from '../constants';

export const InfoList: React.FC<InfoListProps> = ({ dinosaurInfo, elapsedTime }) => {
  const isInfoVisible = (index: number) => elapsedTime >= INFO_REVEAL_TIMINGS[index].time;

  return (
    <ul className={styles.infoList}>
      {INFO_REVEAL_TIMINGS.map((timing, index) => (
        <li key={timing.label} className={isInfoVisible(index) ? styles.animate : ''}>
          <span>{timing.label.charAt(0).toUpperCase() + timing.label.slice(1)}:</span>
          {dinosaurInfo[timing.label as keyof typeof dinosaurInfo]}
        </li>
      ))}
    </ul>
  );
}; 