import {useEffect, useRef, useState} from "react";
import { Nav } from "../../../components";
import styles from "./Book.module.css";
import TemplateImageLeftDownAndTopRight from "./templates/TemplateImageLeftDownAndTopRight/TemplateImageLeftDownAndTopRight.tsx";
import TemplateImageTopRight from "./templates/TemplateImageTopRight/TemplateImageTopRight.tsx";
import TemplateOnlyText from "./templates/TemplateOnlyText/TemplateOnlyText.tsx";
import TemplateImageLeft from "./templates/TemplateImageLeft/TemplateImageLeft.tsx";

enum BookType {
    templateImageLeftDownAndTopRight = "templateImageLeftDownAndTopRight",
    templateImageLeft = "templateImageLeft",
    templateOnlyText = "templateOnlyText",
    templateImageTopRight = "templateImageTopRight",
}

export const Book = ({book}) => {
    const [bookPages, setBookPages] = useState(book.pages);
    const pagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = pagesContainerRef.current;
        if (!container) return;

        const pages = Array.from(container.children) as HTMLElement[];

        pages.forEach((page, index) => {
            if (index % 2 === 0) {
                page.style.zIndex = `${pages.length - index}`;
            }
        });

        const handlePageClick = (e: MouseEvent) => {
            const clickedPage = e.target as HTMLElement;
            const page = clickedPage.closest(`.${styles.page}`) as HTMLElement | null;
            if (!page || !container) return;

            const pagesArray = Array.from(container.children);
            const pageIndex = pagesArray.indexOf(page);

            if (pageIndex === -1) return;

            if ((pageIndex + 1) % 2 === 0) {
                page.classList.remove(styles.flipped);
                const previousPage = pagesArray[pageIndex - 1] as HTMLElement | undefined;
                previousPage?.classList.remove(styles.flipped);
            } else {
                page.classList.add(styles.flipped);
                const nextPage = pagesArray[pageIndex + 1] as HTMLElement | undefined;
                nextPage?.classList.add(styles.flipped);
            }
        };
        container.addEventListener("click", handlePageClick);

        return () => {
            container.removeEventListener("click", handlePageClick);
        };
    }, []);

    return (
        <div className={styles.book}>
            <div id="pages" className={styles.pages} ref={pagesContainerRef}>
                <div className={`${styles.page} ${styles.frontPage}`}>
                    <img src={book.image} className={styles.bookImage}/>
                    <p className={styles.bookTitle}>{book.title}</p>
                </div>
                {bookPages.map((page, i) => {
                    switch(page.type){
                        case BookType.templateImageLeftDownAndTopRight:
                            return (<TemplateImageLeftDownAndTopRight upperText={page.upperText} imageLeftDownSrc={page.imageLeftDownSrc} imageRightUpSrc={page.imageRightUpSrc} lowerText={page.lowerText} />);
                        case BookType.templateImageLeft:
                            return (<TemplateImageLeft imageLeftSrc={page.imageLeftSrc} title={page.title} subtitle={page.subtitle} text={page.text} />);
                        case BookType.templateImageTopRight:
                            return (<TemplateImageTopRight upperText={page.upperText} imageRightUpSrc={page.imageRightUpSrc} lowerText={page.lowerText} />);
                        default:
                            return (<TemplateOnlyText text={page.text}/>);
                    }
                })}
            </div>
        </div>
    );
};

export default Book;
