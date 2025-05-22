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
    book: any; // Puedes reemplazar `any` por el tipo correcto de tu libro si lo tienes
    setCurrentProgress: React.Dispatch<React.SetStateAction<number>>;
  };
  
  export const Book = ({ book, setCurrentProgress }: BookProps) => {
    const [bookPages, setBookPages] = useState(book.pages);
    const pagesContainerRef = useRef<HTMLDivElement>(null);

    console.log(bookPages)

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
                setCurrentProgress(prev => Math.max(prev - 1, 0));
            } else {
                // Página IMPAR -> pasar página
                page.classList.add(styles.flipped);
                const nextPage = pagesArray[pageIndex + 1] as HTMLElement | undefined;
                nextPage?.classList.add(styles.flipped);
                setCurrentProgress(prev => Math.min(prev + 1, bookPages.length));
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
                    <img src={book.image} className={styles.bookImage} />
                    <p className={styles.bookTitle}>{book.title}</p>
                </div>
                {bookPages.map((page, i) => {
                    switch (page.type) {
                        case BookType.templateImageBottomLeftAndTopRight:
                            return (<TemplateImageBottomLeftAndTopRight upperText={page.upperText} foodName={page.foodName} imageBottomLeftSrc={page.imageBottomLeftSrc} imageTopRightSrc={page.imageTopRightSrc} lowerText={page.lowerText} />);
                        case BookType.templateImageLeft:
                            return (<TemplateImageLeft imageLeftSrc={page.imageLeftSrc} title={page.title} subtitle={page.subtitle} text={page.text} />);
                        case BookType.templateImageBottomRight:
                            return (<TemplateImageBottomRight upperText={page.upperText} imageTopRightSrc={page.imageBottomRightSrc} lowerText={page.lowerText} />);
                        case BookType.templateImage:
                            return (<TemplateImage image={page.image} />);
                        default:
                            return (<TemplateText title={page.title} text={page.text} />);
                    }
                })}
                <div className={`${styles.page} ${styles.backPage}`}>
                    <img src={book.image} className={styles.bookImage} />
                </div>
            </div>
        </div>
    );
};

export default Book;
