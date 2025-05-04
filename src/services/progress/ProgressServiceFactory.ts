import { IProgressService } from "./types";
import { LocalStorageProgressService } from "./LocalStorageProgressService";

type ProgressServiceType = "localStorage" | "api";

export class ProgressServiceFactory {
  private static instance: ProgressServiceFactory;
  private currentService: IProgressService;

  private constructor() {
    this.currentService = new LocalStorageProgressService();
  }

  public static getInstance(): ProgressServiceFactory {
    if (!ProgressServiceFactory.instance) {
      ProgressServiceFactory.instance = new ProgressServiceFactory();
    }
    return ProgressServiceFactory.instance;
  }

  public getService(): IProgressService {
    return this.currentService;
  }

  public setServiceType(type: ProgressServiceType): void {
    switch (type) {
      case "localStorage":
        this.currentService = new LocalStorageProgressService();
        break;
      case "api":
        // In the future, replace with API implementation
        // this.currentService = new ApiProgressService();
        throw new Error("API service not implemented yet");
      default:
        throw new Error(`Unknown service type: ${type}`);
    }
  }
} 