import { Request, Response } from 'express';
import { RecommendationService } from '../services/recommendation.service';

const recommendationService = new RecommendationService();

export const getFarmRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const farmId = req.params.farmId as string;
    const recommendations = await recommendationService.getFarmRecommendations(farmId);
    res.status(200).json({ status: 'success', data: recommendations });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const processRecommendationAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { action } = req.body;
    const result = await recommendationService.processRecommendationAction(id, action);
    res.status(200).json({ status: 'success', data: result });
  } catch (error: any) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
