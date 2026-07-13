import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', requireAuth as any, getDashboardData);

export default router;
