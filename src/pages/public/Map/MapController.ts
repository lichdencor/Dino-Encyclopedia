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

} 