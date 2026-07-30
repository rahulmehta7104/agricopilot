import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface CropPriceData {
  State_Name: string;
  District_Name: string;
  Crop_Year: string;
  Season: string;
  Crop: string;
  Area: string;
  Production: string;
  [key: string]: any;
}

export interface SchemeData {
  [key: string]: any;
}

export class DatasetLoader {
  private static instance: DatasetLoader;
  private cropData: any[] = [];
  private schemeData: any[] = [];

  private constructor() {
    this.loadData();
  }

  public static getInstance(): DatasetLoader {
    if (!DatasetLoader.instance) {
      DatasetLoader.instance = new DatasetLoader();
    }
    return DatasetLoader.instance;
  }

  private loadData() {
    try {
      // process.cwd() should be c:\Main\AgriCopilot\backend if run from there
      const rootDatasetsDir = path.resolve(process.cwd(), '../datasets'); 
      
      const cropPricesPath = path.join(rootDatasetsDir, 'crop_price_dataset.csv');
      const mspPath = path.join(rootDatasetsDir, 'india-msp-2026-27.csv');

      if (fs.existsSync(cropPricesPath)) {
        const fileContent = fs.readFileSync(cropPricesPath, 'utf8');
        this.cropData = parse(fileContent, { columns: true, skip_empty_lines: true });
        console.log(`Loaded ${this.cropData.length} rows from crop_price_dataset.csv`);
      } else {
        console.warn('Dataset not found:', cropPricesPath);
      }

      if (fs.existsSync(mspPath)) {
        const fileContent = fs.readFileSync(mspPath, 'utf8');
        this.schemeData = parse(fileContent, { columns: true, skip_empty_lines: true });
        console.log(`Loaded ${this.schemeData.length} rows from india-msp-2026-27.csv`);
      }
    } catch (error) {
      console.error('Error loading datasets:', error);
    }
  }

  public getCropData(crop: string, state?: string): any[] {
    return this.cropData.filter((row: any) => {
      const matchesCrop = row.Crop && row.Crop.toLowerCase().includes(crop.toLowerCase());
      const matchesState = state ? row.State_Name && row.State_Name.toLowerCase().includes(state.toLowerCase()) : true;
      return matchesCrop && matchesState;
    });
  }

  public getSchemes(): any[] {
    return this.schemeData;
  }
}

export const datasetLoader = DatasetLoader.getInstance();
