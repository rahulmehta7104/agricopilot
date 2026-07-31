import { Router } from 'express';
import { getFarmRecommendations, processRecommendationAction } from '../controllers/recommendation.controller';
import { validateRequest } from '../middleware/validateRequest';
import { recommendationActionSchema } from '../validators/recommendation.validator';

const router = Router();

// /api/recommendations/...
/**
 * @swagger
 * /api/recommendations/farm/{farmId}:
 *   get:
 *     summary: GET /api/recommendations/farm/{farmId}
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/farm/:farmId', getFarmRecommendations);
/**
 * @swagger
 * /api/recommendations/{id}/action:
 *   patch:
 *     summary: PATCH /api/recommendations/{id}/action
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:id/action', validateRequest(recommendationActionSchema), processRecommendationAction);

export default router;
