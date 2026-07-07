import { Request, Response } from 'express';
import { CropRepository } from '../repositories/crop.repository';

const cropRepo = new CropRepository();

export const getAllCrops = async (req: Request, res: Response): Promise<void> => {
  try {
    const crops = await cropRepo.findAll();
    // Map the database crops to exactly what the Dashboard.jsx UI expects
    const dashboardCrops = crops.map((c, i) => {
      let season = 'Kharif';
      let soilType = 'Loamy';
      if (c.name === 'Wheat') { season = 'Rabi'; soilType = 'Loamy'; }
      if (c.name === 'Soybean') { season = 'Kharif'; soilType = 'Clay'; }
      if (c.name === 'Corn') { season = 'Kharif'; soilType = 'Silt'; }
      if (c.name === 'Cotton') { season = 'Kharif'; soilType = 'Sandy Loam'; }
      if (c.name === 'Rice') { season = 'Kharif'; soilType = 'Clay Loam'; }
      
      return {
        id: c.id,
        cropName: c.name,
        season,
        soilType,
        health: 85 + (i * 3 % 12) // Deterministic mock health score between 85-96
      };
    });
    res.status(200).json({ status: 'success', data: dashboardCrops });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
