import { useParams } from 'react-router-dom';
import { bookCovers } from '../path/to/bookCovers'; // importa tu array
import { Nav } from "../../../components"
import styles from "./Reading.module.css"


export const Reading = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const book = bookCovers.find(b => b.id === bookId);

    if (!book) {
        return <div>Libro no encontrado.</div>;
    }

    return (
        <div className={styles['reading-page']}>
            <Nav />
            <div className={styles['reading-page__content']}>
                <h1>{book.title}</h1>
                <img src={book.image} alt={book.title} />
                <p>{book.summary}</p>
                {/* Aquí podrías montar tu componente <Book /> 
            o lo que muestre las páginas, progreso, etc. */}
            </div>
        </div>
    );
};