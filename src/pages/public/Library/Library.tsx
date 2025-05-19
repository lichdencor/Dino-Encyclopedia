import { useEffect, useRef } from "react";
import { Nav } from "../../../components";
import styles from "./Library.module.css";
import Book from "../Book/Book.tsx";
import { BookProgress } from "../../../components/BookProgress/BookProgress.tsx";

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
                imageLeftSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-birth.png",
                text: "Ankylosaurus embryos formed in sturdy eggshells balancing porosity and strength for gas exchange. Histology shows ossicle formation initiated already before pipping, conferring immediate armor. Nests comprised shallow scrapes in sediment, leveraging ambient warmth to coordinate emergence. Clutch sizes ranged from six to ten eggs, each roughly twenty-five centimeters long, reflecting parental care and fueling early yolk-driven growth.\n\nAnkylosaurus embryos formed in sturdy eggshells balancing porosity and strength for gas exchange. Histology shows ossicle formation initiated already before pipping, conferring immediate armor. Nests comprised shallow scrapes in sediment, leveraging ambient warmth to coordinate emergence. Clutch sizes ranged from six to ten eggs, each roughly twenty-five centimeters long, reflecting parental care and fueling early yolk-driven growth."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Ankylosaurus bore a broad, low muzzle with leaf-shaped teeth for cropping low vegetation. Its reinforced skull housed powerful jaw muscles able to shear tough foliage. A keratinous beak prepped shoots before occlusion, while molariform teeth ground plant matter. A capacious gut with fermentation chambers maximized nutrient extraction. Foraging was slow and deliberate, with sweeping movements of the snout across ground cover. The tail club was likely held aloft during feeding to deter ambush predators. Individuals likely foraged in small family groups along floodplain margins, tracking seasonal growth.",
                foodName: "Food Name",
                imageBottomLeftSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-1.png",
                imageTopRightSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-2.png",
                lowerText: "Ankylosaurus primarily consumed low-growing vegetation such as ferns, horsetails, and cycads, cropping foliage with its broad beak and grinding it between leaf-shaped teeth. Its jaw architecture and gut adaptations processed fibrous plant matter efficiently. Seasonal shifts may have led to selective browsing of angiosperm shoots near floodplains, supplementing its diet with tough stems. Coprolite evidence suggests advanced microbial fermentation of cellulose in its hindgut."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-characteristics.png",
                text: "Ankylosaurus was a heavily armored quadrupedal dinosaur reaching lengths of six to eight meters, its broad body shielded by fused osteoderms that formed a continuous protective armor. The low, triangular skull featured bony plates and reinforced jaws, while stout limbs bore massive weight. Its distinctive tail club served as a powerful defensive weapon. Estimated at six tonnes it inhabited floodplains its profile deterring predators."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Ankylosaurus displayed predominantly solitary behavior foraging slowly along floodplain undergrowth with a low-slung posture to crop low vegetation. When disturbed by predators it adopted a defensive stance, raising its armored osteoderms and swinging its massive tail club in forceful lateral arcs. Trackway evidence indicates limited gregariousness, suggesting that individuals rarely moved in coordinated groups. Osteoderm patterns and club morphology may have served intraspecific display or recognition. Bone histology and tooth microwear imply crepuscular feeding cycles, reducing midday heat stress. Low-frequency bellows likely mediated long-distance communication, while tactile signaling among proximate individuals reinforced social bonds. Periodic movements between habitats remain hypothetical, inferred from isotopic variation in fossils. Resting was sedentary with individuals using thick cover for concealment and energy conservation.",
                imageBottomRightSrc: "/public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-behaviour.png",
                lowerText: "High-resolution CT scans of Ankylosaurus specimens revealed a dense network of blood vessels and nerve channels within its cranial osteoderms, indicating that its iconic armor also functioned in sensory reception and thermoregulation, an exceptional adaptation overall."
            },
            // DINOSAUR 2 - Brachiosaurus
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
            <BookProgress></BookProgress>
        </div>
    );
};

export default Library;
