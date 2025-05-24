import { ProgressServiceFactory } from '../../../services/progress/ProgressServiceFactory';
import booksData from '../../../context/data/books_data.json';

export interface BookModelState {
  pages: number;
  progress: number;
  isComplete: boolean;
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
      pages,
      progress: 0,
      isComplete: false,
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