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

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude (lat) and longitude (lon) are required' });
    }
    
    const weatherData = await weatherService.getWeather(Number(lat), Number(lon));
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
