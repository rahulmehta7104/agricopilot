import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { weatherService } from '../services/weather.service';

export const getMarketPrediction = async (req: Request, res: Response) => {
  try {
    const { crop, location } = req.query;
    if (!crop || !location) {
      return res.status(400).json({ error: 'Crop and location are required query parameters' });
    }
    
    const prediction = await aiService.getMarketPrediction(crop as string, location as string);
    res.json({ prediction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prediction' });
  }
};

export const getSchemes = async (req: Request, res: Response) => {
  try {
    const { profile } = req.query;
    const profileDetails = (profile as string) || 'Small farmer in India growing wheat and rice.';
    
    const schemes = await aiService.getSchemesRecommendation(profileDetails);
    res.json({ schemes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scheme recommendations' });
  }
};

export const getWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const lat = req.query.lat as string;
    const lon = req.query.lon as string;
    if (!lat || !lon) {
      res.status(400).json({ error: 'Lat and Lon are required' });
      return;
    }
    const data = await weatherService.getWeather(parseFloat(lat), parseFloat(lon));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCropRecommendation = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.query.location as string;
    const soilType = req.query.soilType as string;
    const season = req.query.season as string;

    if (!location || !soilType || !season) {
      res.status(400).json({ error: 'Location, soilType, and season are required' });
      return;
    }

    const prediction = await aiService.getCropRecommendation(location, soilType, season);
    res.json({ prediction });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
