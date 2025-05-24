import { ProgressServiceFactory } from '../../../services/progress/ProgressServiceFactory';
import booksData from '../../../context/data/books_data.json';

export interface BookModelState {
  pages: number;
  progress: number;
  isComplete: boolean;
  isbn: string;
  title: string;
  styles: string;
  summary: string;
  coverBackImage: string;
  coverImage: string;
  frontImage: string;
  backImage: string;
}

export class BookModel {
  private state: BookModelState;
  private progressService = ProgressServiceFactory.getInstance().getService();
  private bookId: string;

  constructor(bookId: string) {
    this.bookId = bookId;
    const book = booksData.books.find((b: any) => b.isbn === bookId);
    const pages = book ? book.pages.length : 0;
    this.state = {
      pages: pages / 2,
      progress: 1,
      isComplete: false,
      isbn: book?.isbn || '',
      title: book?.title || '',
      styles: book?.styles || '',
      summary: book?.summary || '',
      coverBackImage: book?.coverBackImage || '',
      coverImage: book?.coverImage || '',
      frontImage: book?.frontImage || '',
      backImage: book?.backImage || '',
    };
    this.loadProgress();
  }

  async loadProgress() {
    const progressData = await this.progressService.getProgress();
    if (!(progressData as any).books) (progressData as any).books = {};
    const bookProgress = (progressData as any).books?.[this.bookId]?.progress || 0;
    if (bookProgress === 0 && this.state.pages > 0) {
      (progressData as any).books[this.bookId] = { progress: 0 };
      await this.progressService.saveProgress(progressData);
    }
    this.setProgress(bookProgress);
  }

  getState(): BookModelState {
    return { ...this.state };
  }

  async setProgress(newProgress: number) {
    this.state.progress = newProgress;
    this.state.isComplete = newProgress >= this.state.pages;
    const progressData = await this.progressService.getProgress();
    if (!(progressData as any).books) (progressData as any).books = {};
    (progressData as any).books[this.bookId] = { progress: newProgress };
    await this.progressService.saveProgress(progressData);
  }

  getProgressService() {
    return this.progressService;
  }

  getBookId() {
    return this.bookId;
  }
} 