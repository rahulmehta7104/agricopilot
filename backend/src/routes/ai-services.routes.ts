import { Router } from 'express';
import { getMarketPrediction, getSchemes, getWeather, getCropRecommendation } from '../controllers/ai-services.controller';

const router = Router();

/**
 * @swagger
 * /api/services/market-prediction:
 *   get:
 *     summary: GET /api/services/market-prediction
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/market-prediction', getMarketPrediction);
/**
 * @swagger
 * /api/services/schemes:
 *   get:
 *     summary: GET /api/services/schemes
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/schemes', getSchemes);
/**
 * @swagger
 * /api/services/weather:
 *   get:
 *     summary: GET /api/services/weather
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/weather', getWeather);
/**
 * @swagger
 * /api/services/crop-recommendation:
 *   get:
 *     summary: GET /api/services/crop-recommendation
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/crop-recommendation', getCropRecommendation);

export default router;
