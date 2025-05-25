import { ReadingModel } from './ReadingModel';

export class ReadingController {
  private model: ReadingModel;

  constructor(model: ReadingModel) {
    this.model = model;
  }

  async goToNextPage() {
    await this.model.goToNextPage();
  }

  async goToPreviousPage() {
    await this.model.goToPreviousPage();
  }
  async isFinished() {
    return this.model.isFinished();
  }
} 