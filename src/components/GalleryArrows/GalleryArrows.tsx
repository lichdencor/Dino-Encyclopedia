import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./GalleryArrows.module.css";

type GalleryArrowsProps = {
    page1:string;
    page2:string;
} 

export const GalleryArrows = ({page1, page2}:GalleryArrowsProps) => {
  return (
    <div>
        <Link to={page1} className={styles.arrowPrevious}>.</Link>
        <Link to={page2} className={styles.arrowNext}>.</Link>
    </div>
  )
}
