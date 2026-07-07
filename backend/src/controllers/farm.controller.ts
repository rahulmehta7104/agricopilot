import { Request, Response } from 'express';
import { FarmService } from '../services/farm.service';

const farmService = new FarmService();

export const registerFarm = async (req: Request, res: Response): Promise<void> => {
  try {
    const farm = await farmService.registerFarm(req.body);
    res.status(201).json({ status: 'success', data: farm });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getFarmerFarms = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileId = req.params.profileId as string;
    const farms = await farmService.getFarmerFarms(profileId);
    res.status(200).json({ status: 'success', data: farms });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const addCropToFarm = async (req: Request, res: Response): Promise<void> => {
  try {
    const crop = await farmService.addCropToFarm(req.body);
    res.status(201).json({ status: 'success', data: crop });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
