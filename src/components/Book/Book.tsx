import { useEffect, useRef, useState } from "react";
import styles from "./Book.module.css";

import TemplateImage from "./templates/TemplateImage/TemplateImage.tsx";
import TemplateText from "./templates/TemplateText/TemplateText.tsx";
import TemplateImageLeft from "./templates/TemplateImageLeft/TemplateImageLeft.tsx";
import TemplateImageBottomLeftAndTopRight from "./templates/TemplateImageBottomLeftAndTopRight/TemplateImageBottomLeftAndTopRight.tsx";
import TemplateImageBottomRight from "./templates/TemplateImageTopRight/TemplateImageTopRight.tsx";

enum BookType {
    templateImage = "templateImage",
    templateText = "templateText",
    templateImageBottomLeftAndTopRight = "templateImageBottomLeftAndTopRight",
    templateImageLeft = "templateImageLeft",
    templateImageBottomRight = "templateImageBottomRight"
}

type BookProps = {
    book: any;
    onNextPage: () => void;
    onPreviousPage: () => void;
  };
  
  export const Book = ({ book, onNextPage, onPreviousPage }: BookProps) => {
    const [bookPages, setBookPages] = useState(book.pages);
    const pagesContainerRef = useRef<HTMLDivElement>(null);

    // const returnStyle:any(bookName:any) => {
    //     if(bookName){
    //         return 
    //     }
    //     return
    // }

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

            // Página PAR -> deshacer vuelta
            if ((pageIndex + 1) % 2 === 0) {
                page.classList.remove(styles.flipped);
                const previousPage = pagesArray[pageIndex - 1] as HTMLElement | undefined;
                previousPage?.classList.remove(styles.flipped);
                onPreviousPage();
            } else {
                // Página IMPAR -> pasar página
                page.classList.add(styles.flipped);
                const nextPage = pagesArray[pageIndex + 1] as HTMLElement | undefined;
                nextPage?.classList.add(styles.flipped);
                onNextPage();
            }
        };

        container.addEventListener("click", handlePageClick);

        return () => {
            container.removeEventListener("click", handlePageClick);
        };
    }, [onNextPage, onPreviousPage]);

    return (
        <div className={styles.book}>
            <div id="pages" className={styles.pages} ref={pagesContainerRef}>
                <div className={`${styles.frontPage} ${styles.page}`}>
                    <img src={book.frontImage} className={styles.bookImage} />
                </div>
                {bookPages.map((page: any, i: number) => {
                    switch (page.type) {
                        case BookType.templateImageBottomLeftAndTopRight:
                            return (<TemplateImageBottomLeftAndTopRight className={book.styles} upperText={page.upperText} foodName={page.foodName} imageBottomLeftSrc={page.imageBottomLeftSrc} imageTopRightSrc={page.imageTopRightSrc} lowerText={page.lowerText} />);
                        case BookType.templateImageLeft:
                            return (<TemplateImageLeft className={book.styles} imageLeftSrc={page.imageLeftSrc} title={page.title} subtitle={page.subtitle} text={page.text} />);
                        case BookType.templateImageBottomRight:
                            return (<TemplateImageBottomRight className={book.styles} upperText={page.upperText} imageTopRightSrc={page.imageBottomRightSrc} lowerText={page.lowerText} />);
                        case BookType.templateImage:
                            return (<TemplateImage className={book.styles} image={page.image} index={i} />);
                        default:
                            return (<TemplateText className={book.styles} title={page.title} text={page.text} index={i} />);
                    }
                })}
                <div className={`${styles.backPage} ${styles.page}`}>
                    <img src={book.backImage} className={styles.bookImage} />
                </div>
            </div>
        </div>
    );
};

export default Book;
