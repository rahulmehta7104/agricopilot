import { Router } from 'express';
import { getMarketPrediction, getSchemes, getWeather } from '../controllers/ai-services.controller';

const router = Router();

router.get('/market-prediction', getMarketPrediction);
router.get('/schemes', getSchemes);
router.get('/weather', getWeather);

export default router;
