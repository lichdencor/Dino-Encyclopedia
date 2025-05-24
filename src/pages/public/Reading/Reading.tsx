import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from '../../../components';
import styles from './Reading.module.css';
import booksData from '../../../context/data/books_data.json';
import Book from '../../../components/Book/Book';
import BookProgress from '../../../components/BookProgress/BookProgress';
import { ReadingModel, ReadingState } from './ReadingModel';
import { ReadingController } from './ReadingController';

interface ReadingProps {
  bookId: string;
}

interface ReadingComponentState {
  progress: number;
  pagesCount: number;
  book: any;
  currentPageIndex: number;
}

export class ReadingComponent extends Component<ReadingProps, ReadingComponentState> {
  private model: ReadingModel;
  private controller: ReadingController;
  private unsubscribe: () => void;

  constructor(props: ReadingProps) {
    super(props);

    const { bookId } = props;
    const { books } = booksData;
    const book = books.find((b: any) => b.isbn === bookId);

    this.model = new ReadingModel(bookId);
    this.controller = new ReadingController(this.model);
    this.unsubscribe = this.model.subscribe(this.handleStateChange.bind(this));

    this.state = {
      progress: this.model.getState().progress,
      pagesCount: book ? book.pages.length / 2 : 0,
      book,
      currentPageIndex: 0,
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleStateChange(newState: ReadingState) {
    this.setState({ 
      progress: newState.progress,
      currentPageIndex: newState.currentPageIndex
    });
  }

  handleNextPage = () => {
    this.controller.goToNextPage();
  };

  handlePreviousPage = () => {
    this.controller.goToPreviousPage();
  };

  render() {
    const { book, pagesCount, progress, currentPageIndex } = this.state;
    if (!book) {
      return <div>No book found.</div>;
    }

    return (
      <div className={styles['reading-page']}>
        <Nav />
        <div className={styles['reading-page__content']}>
          <Book 
            book={book} 
            onNextPage={this.handleNextPage} 
            onPreviousPage={this.handlePreviousPage} 
          />
          <BookProgress pages={pagesCount} progress={progress} currentIndex={currentPageIndex} />
        </div>
      </div>
    );
  }
}

const Reading = () => {
  const { bookId = '' } = useParams<{ bookId: string }>();
  return <ReadingComponent bookId={bookId} />;
};

export default Reading;
