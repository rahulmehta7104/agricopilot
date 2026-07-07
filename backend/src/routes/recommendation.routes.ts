import { Router } from 'express';
import { getFarmRecommendations, processRecommendationAction } from '../controllers/recommendation.controller';
import { validateRequest } from '../middleware/validateRequest';
import { recommendationActionSchema } from '../validators/recommendation.validator';

const router = Router();

// /api/recommendations/...
router.get('/farm/:farmId', getFarmRecommendations);
router.patch('/:id/action', validateRequest(recommendationActionSchema), processRecommendationAction);

export default router;
