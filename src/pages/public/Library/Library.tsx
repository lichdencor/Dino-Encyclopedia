import { useEffect, useRef } from "react";
import { Nav } from "../../../components";
import styles from "./Library.module.css";
import Book from "../Book/Book.tsx";

enum BookType {
    templateImageLeft = "templateImageLeft",
    templateImageBottomLeftAndTopRight = "templateImageBottomLeftAndTopRight",
    templateOnlyText = "templateOnlyText",
    templateImageRightTop = "templateImageRightTop",
}


const books = [
    {
        title: "Book 1",
        image: "/assets/img/bg/base.png",
        pages: [
            {
                type: BookType.templateImageLeft,
                title: "Ankylosaurus",
                subtitle: "Hatching",
                imageLeftSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-birth.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                subtitle: "Feeding",
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageBottomLeftSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-1.png",
                imageTopRightSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-2.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            },
            {
                type: BookType.templateOnlyText,
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
            },
            {
                type: BookType.templateImageRightTop,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageRightUpSrc: "/assets/img/cards/3.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            }
        ]
    }
];

export const Library = () => {
    return (
        <div className={styles.libraryContainer}>
            <Nav />
            <Book book={books[0]}/>
        </div>
    );
};

export default Library;
