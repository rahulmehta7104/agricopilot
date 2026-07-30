import { Router } from 'express';
import { getMarketPrediction, getSchemes, getWeather, getCropRecommendation } from '../controllers/ai-services.controller';

const router = Router();

router.get('/market-prediction', getMarketPrediction);
router.get('/schemes', getSchemes);
router.get('/weather', getWeather);
router.get('/crop-recommendation', getCropRecommendation);

export default router;
