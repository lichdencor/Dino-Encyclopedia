import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from '../../../components';
import styles from './Reading.module.css';
import booksData from '../../../context/data/books_data.json';
import Book from '../../../components/Book/Book';
import BookProgress from '../../../components/BookProgress/BookProgress';

export const Reading = () => {
  const { books } = booksData;
  const { bookId } = useParams<{ bookId: string }>();
  const book = books.find(b => b.isbn === bookId);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  // Initialize pages count when book changes
  useEffect(() => {
    if (book) {
      setPagesCount(book.pages.length/2);
    }
  }, [book]);

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div className={styles['reading-page']}>
      <Nav />
      <div className={styles['reading-page__content']}>
        <Book book={book} setCurrentProgress={setCurrentProgress} />
        <BookProgress pages={pagesCount} progress={currentProgress} />
      </div>
    </div>
  );
};
