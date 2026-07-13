import { Router } from 'express';
import userRoutes from './user.routes';
import farmRoutes from './farm.routes';
import recommendationRoutes from './recommendation.routes';
import aiChatRoutes from './ai-chat.routes';
import cropRoutes from './crop.routes';
import dashboardRoutes from './dashboard.routes';
import authRoutes from './auth.routes';

const router = Router();

// Mount all modular routers onto their respective base paths
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/chat', aiChatRoutes);
router.use('/crops', cropRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
