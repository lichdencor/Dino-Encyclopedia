import { BookModel } from './BookModel';

export interface ReadingState {
  progress: number;
  currentPageIndex: number;
}

export class ReadingModel {
  private listeners: ((state: ReadingState) => void)[] = [];
  private bookModel: BookModel;
  private currentPageIndex: number = 0;

  constructor(bookId: string) {
    this.bookModel = new BookModel(bookId);
    this.bookModel.loadProgress().then(() => this.notifyListeners());
  }

  getState(): ReadingState {
    return { 
      progress: this.bookModel.getState().progress,
      currentPageIndex: this.currentPageIndex
    };
  }

  subscribe(listener: (state: ReadingState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  async setProgress(newProgress: number) {
    await this.bookModel.setProgress(newProgress);
    this.notifyListeners();
  }

  async goToNextPage() {
    const currentProgress = this.bookModel.getState().progress;
    if (this.currentPageIndex < this.bookModel.getState().pages) {
      this.currentPageIndex++;
      if (this.currentPageIndex > currentProgress) {
        await this.setProgress(this.currentPageIndex);
      }
      this.notifyListeners();
    }
  }

  async goToPreviousPage() {
    const currentProgress = this.bookModel.getState().progress;
    const newProgress = currentProgress - 1;
    if (newProgress >= 0) {
      if (this.currentPageIndex > 0) {
        this.currentPageIndex--;
      }
      this.notifyListeners();
    }
  }
} 