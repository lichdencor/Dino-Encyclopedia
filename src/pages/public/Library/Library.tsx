import { Carousel, Nav } from "../../../components";
import { BookCover } from "../../../components/BookCover/BookCover.tsx";
import styles from "./Library.module.css";
import booksData from '../../../context/data/books_data.json';

export const Library = () => {
    const { books } = booksData;

    return (

        <div className={styles["container-page"]}>
            <Nav />
            <Carousel
                links={books.map(book => `/reading/${book.isbn}`)}
                accessText="Read"
                width={80}
                height={80}
                itemWidth={22}
                itemHeight={70}
                transformMain="translate(-50%, -37%) scale(1)"
                transformLeft="translate(-163%, -36%) scale(0.9)"
                transformRight="translate(68%, -37%) scale(0.9)"
                arrowOffset={6}
                visitBtnBottom={-5}
            >
                {books.map((book) => (
                    <BookCover
                        key={book.isbn}
                        title={book.title}
                        image={book.coverImage}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default Library;
