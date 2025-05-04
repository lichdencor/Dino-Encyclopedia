import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./GalleryArrows.module.css";

type GalleryArrowsProps = {
    previousPage:string;
    nextPage:string;
} 

export const GalleryArrows = ({previousPage, nextPage}:GalleryArrowsProps) => {
  return (
    <div>
        <Link to={`/${previousPage}`} className={styles.arrowPrevious}>.</Link>
        <Link to={`/${nextPage}`} className={styles.arrowNext}>.</Link>
    </div>
  )
}
