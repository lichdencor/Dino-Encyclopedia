import { MapModel } from './MapModel';
import { useNavigate } from "react-router-dom";

export class MapController {
  private model: MapModel;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(model: MapModel, navigate: ReturnType<typeof useNavigate>) {
    this.model = model;
    this.navigate = navigate;
  }

  navigateToGallery(route: string): void {
    this.navigate(route);
  }

  handleOpenModal(): void {
    this.model.toggleVirtualAssistant();
  }

  handleCloseModal(): void {
    this.model.toggleVirtualAssistant();
  }

  handleChangeModalPage(pageIndex: number | undefined): void {
    if (pageIndex !== undefined) {
      this.model.setModalPage(pageIndex);
    }
  }

  getModalPages() {
    return this.model.getModalPages();
  }
} 