import { useEffect, useRef } from "react";
import { Nav } from "../../../components";
import styles from "./Library.module.css";
import Book from "../Book/Book.tsx";

enum BookType {
    templateImageLeft = "templateImageLeft",
    templateImageBottomLeftAndTopRight = "templateImageBottomLeftAndTopRight",
    templateOnlyText = "templateOnlyText",
    templateImageBottomRight = "templateImageBottomRight",
}


const books = [
    {
        title: "Book 1",
        image: "/assets/img/bg/base.png",
        pages: [
            // DINOSAUR 1 - Ankylosaurus
            {
                type: BookType.templateImageLeft,
                title: "Ankylosaurus",
                imageLeftSrc: "/public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-birth.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                foodName: "Food Name",
                imageBottomLeftSrc: "/public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-food-1.png",
                imageTopRightSrc: "/public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-food-2.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "/public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-characteristics.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageBottomRightSrc: "/public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-behaviour.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            }
            // DINOSAUR 2 - Brachiosaurus
            // DINOSAUR 3 - Coelophysis
            // DINOSAUR 4 - Compsognathus
            // DINOSAUR 5 - Microceratus
            // DINOSAUR 6 - Pachycephalosaurus
            // DINOSAUR 7 - Stegosaurus
            // DINOSAUR 8 - Triceratops
            // DINOSAUR 9 - Tyrannosaurus rex
        ]
    }
];

export const Library = () => {
    return (
        <div className={styles.libraryContainer}>
            <Nav />
            <Book book={books[0]} />
        </div>
    );
};

export default Library;
