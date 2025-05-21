import styles from "./GalleryFrame.module.css"

interface GalleryFrameProps {
    image: string;
    title: string;
}

export const GalleryFrame = ({ image, title }: GalleryFrameProps) => {
    return (
        <div className={styles["gallery__frame"]}>            
            <span className={styles["gallery__item-title"]}>{title}</span>
            <img className={styles["gallery__item-image"]} src={image} alt="gallery" />
        </div>
    )
}
