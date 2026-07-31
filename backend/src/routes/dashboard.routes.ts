import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: GET /api/dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', requireAuth as any, getDashboardData);

export default router;
